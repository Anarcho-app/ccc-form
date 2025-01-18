import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { CID } from 'multiformats/cid'

class IPFSStorage {
  constructor() {
    this.helia = null
    this.fs = null
    this.cache = new Map()
  }

  async init() {
    try {
      this.helia = await createHelia()
      this.fs = unixfs(this.helia)
      console.log('Helia IPFS node started with ID:', this.helia.libp2p.peerId.toString())
    } catch (error) {
      console.error('Failed to initialize IPFS:', error)
      throw error
    }
  }

  async storeData(data) {
    try {
      const cid = await this.fs.addBytes(new TextEncoder().encode(JSON.stringify(data)))
      this.cache.set(cid.toString(), data)
      return cid.toString()
    } catch (error) {
      console.error('Error storing data on IPFS:', error)
      throw error
    }
  }

  async retrieveData(cid) {
    if (this.cache.has(cid)) return this.cache.get(cid)
    
    try {
      const decoder = new TextDecoder()
      let data = ''
      for await (const chunk of this.fs.cat(CID.parse(cid))) {
        data += decoder.decode(chunk, { stream: true })
      }
      const parsed = JSON.parse(data)
      this.cache.set(cid, parsed)
      return parsed
    } catch (error) {
      console.error('Error retrieving data from IPFS:', error)
      throw error
    }
  }
}

// Create and export the instance
const ipfsStorage = new IPFSStorage()
export { ipfsStorage }
