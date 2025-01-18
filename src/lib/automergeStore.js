import * as Automerge from '@automerge/automerge'
import { writable } from 'svelte/store'

export class AutomergeStore {
  constructor() {
    this.doc = Automerge.init()
    this.syncStates = new Map()
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

  receiveSyncMessage(peerId, message) {
    const [newDoc, newSyncState] = Automerge.receiveSyncMessage(
      this.doc,
      this.syncStates.get(peerId) || Automerge.initSyncState(),
      message
    )
    this.doc = newDoc
    this.syncStates.set(peerId, newSyncState)
    this.store.set(this.doc)
  }

  generateSyncMessage(peerId) {
    const [newSyncState, message] = Automerge.generateSyncMessage(
      this.doc,
      this.syncStates.get(peerId) || Automerge.initSyncState()
    )
    this.syncStates.set(peerId, newSyncState)
    return message
  }
}

// Create instance
export const automergeStore = new AutomergeStore()
