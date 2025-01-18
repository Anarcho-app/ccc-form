import { openDB } from 'idb'
import * as Automerge from '@automerge/automerge'
import { ipfsStorage } from '../ipfsStorage'

export class MeshStorage {
  constructor() {
    this.db = null
    this.doc = null
  }

  async init() {
    // Initialize IndexedDB
    this.db = await openDB('census-mesh', 1, {
      upgrade(db) {
        db.createObjectStore('census')
        db.createObjectStore('sync')
      }
    })

    // Initialize or load Automerge doc
    const stored = await this.db.get('census', 'current')
    this.doc = stored ? Automerge.load(stored) : Automerge.init()
  }

  async addEntry(entry) {
    // Add to Automerge
    this.doc = Automerge.change(this.doc, doc => {
      if (!doc.entries) doc.entries = []
      doc.entries.push(entry)
    })

    // Store locally
    await this.db.put('census', Automerge.save(this.doc), 'current')

    // Store to IPFS when online
    if (navigator.onLine) {
      const cid = await ipfsStorage.storeData(entry)
      await this.db.put('sync', { cid, synced: true }, entry.id)
    } else {
      await this.db.put('sync', { synced: false }, entry.id)
    }
  }

  async sync() {
    // Sync unsynced entries when online
    const unsynced = await this.db.getAllFromIndex('sync', 'synced', false)
    for (const entry of unsynced) {
      const cid = await ipfsStorage.storeData(entry)
      await this.db.put('sync', { cid, synced: true }, entry.id)
    }
  }
}
