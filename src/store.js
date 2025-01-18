// store.js - Data management with Automerge
import * as Automerge from '@automerge/automerge'
import { writable } from 'svelte/store'

export class CensusStore {
  constructor() {
    this.doc = Automerge.init()
    this.syncState = new Map()
    this.store = writable(this.doc)
  }

  addEntry(entry) {
    this.doc = Automerge.change(this.doc, doc => {
      if (!doc.entries) doc.entries = []
      doc.entries.push({
        ...entry,
        timestamp: Date.now(),
        verified: false,
        vouches: []
      })
    })
    this.store.set(this.doc)
  }

  receiveSyncMessage(peer, message) {
    const [newDoc, newSyncState] = Automerge.receiveSyncMessage(
      this.doc,
      this.syncState.get(peer) || [],
      message
    )
    this.doc = newDoc
    this.syncState.set(peer, newSyncState)
    this.store.set(this.doc)
  }
}

// network.js - P2P networking with libp2p
import { createLibp2p } from 'libp2p'
import { webRTC } from '@libp2p/webrtc'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'

export class P2PNetwork {
  async init() {
    this.node = await createLibp2p({
      transports: [webRTC()],
      connectionEncryption: [noise()],
      streamMuxers: [mplex()],
      connectionManager: {
        minConnections: 3,
        maxConnections: 10
      }
    })

    this.node.connectionManager.on('peer:connect', this.handlePeerConnect)
    this.node.connectionManager.on('peer:disconnect', this.handlePeerDisconnect)
    
    await this.node.start()
  }

  async handlePeerConnect(connection) {
    // Set up Automerge sync with new peer
    const syncProtocol = new SyncProtocol(connection, this.censusStore)
    await syncProtocol.start()
  }
}

// identity.js - Identity management with UCAN
import { build, validate } from '@ipld/dag-ucan'

export class IdentityManager {
  async createIdentity() {
    const keypair = await crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-256'
      },
      true,
      ['sign', 'verify']
    )
    
    return {
      did: `did:key:${await this.publicKeyToDid(keypair.publicKey)}`,
      keypair
    }
  }

  async vouch(fromDid, forDid, attestation) {
    const ucan = await build({
      issuer: fromDid,
      audience: forDid,
      capabilities: [{
        with: forDid,
        can: 'census/vouch',
        attestation
      }]
    })
    
    return ucan
  }
}

// App.svelte - Main application component
<script>
  import { onMount } from 'svelte'
  import { CensusStore } from './store'
  import { P2PNetwork } from './network'
  import { IdentityManager } from './identity'

  const store = new CensusStore()
  const network = new P2PNetwork(store)
  const identity = new IdentityManager()

  onMount(async () => {
    await network.init()
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('/sw.js')
    }
  })
</script>

<main>
  <!-- Census form and data display components -->
</main>
