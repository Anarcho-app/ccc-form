import { EventEmitter } from 'events'
import { createLibp2p } from 'libp2p'
import { WebRTCStar } from 'libp2p-webrtc-star'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { bootstrap } from '@libp2p/bootstrap'
import { kadDHT } from '@libp2p/kad-dht'
import { AutomergeStore } from './automergeStore.js'

class P2PNetwork extends EventEmitter {
  constructor() {
    super()
    this.node = null
    this.peers = new Map()
    this.automergeStore = new AutomergeStore()
    this.webrtcStar = new WebRTCStar()
  }

  async init() {
    try {
      this.node = await createLibp2p({
        transports: [this.webrtcStar.transport],
        peerDiscovery: [
          this.webrtcStar.discovery,
          bootstrap({
            list: [
              '/dns4/bootstrap.libp2p.io/tcp/443/wss/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
              '/dns4/bootstrap.libp2p.io/tcp/443/wss/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa'
            ]
          })
        ],
        connectionEncryption: [noise()],
        streamMuxers: [mplex()],
        dht: kadDHT(),
        connectionManager: {
          minConnections: 3,
          maxConnections: 10
        }
      })

      this.node.connectionManager.on('peer:connect', this.handlePeerConnect.bind(this))
      this.node.connectionManager.on('peer:disconnect', this.handlePeerDisconnect.bind(this))
      this.node.on('peer:discovery', this.handlePeerDiscovery.bind(this))

      await this.node.start()
      console.log('Libp2p node started with ID:', this.node.peerId.toString())
    } catch (error) {
      console.error('Failed to initialize P2P network:', error)
      throw error
    }
  }

  async handlePeerConnect(connection) {
    const peerId = connection.remotePeer.toString()
    console.log('Connected to peer:', peerId)
    this.peers.set(peerId, connection)
    
    try {
      const { stream } = await connection.newStream('/census-data/1.0.0')
      
      const reader = stream.sink.getReader()
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        
        const message = JSON.parse(new TextDecoder().decode(value))
        if (message.type === 'data') {
          this.emit('data', message.data)
        }
      }
    } catch (error) {
      console.error('Error handling peer connection:', error)
    }
  }

  handlePeerDisconnect(connection) {
    const peerId = connection.remotePeer.toString()
    console.log('Disconnected from peer:', peerId)
    this.peers.delete(peerId)
  }

  handlePeerDiscovery(peerId) {
    console.log('Discovered peer:', peerId.toString())
  }

  async broadcastData(data) {
    const message = JSON.stringify({ type: 'data', data })
    const encoder = new TextEncoder()
    
    for (const [peerId, connection] of this.peers) {
      try {
        const { stream } = await connection.newStream('/census-data/1.0.0')
        await stream.sink.write(encoder.encode(message))
      } catch (error) {
        console.error('Error broadcasting to peer:', peerId, error)
      }
    }
  }
}

export const p2pNetwork = new P2PNetwork()
