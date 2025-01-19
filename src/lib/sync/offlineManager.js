// Simple localStorage-based offline storage for now
class OfflineManager {
  constructor() {
    this.STORAGE_KEY = 'census-offline-entries';
    this.QUEUE_KEY = 'census-offline-queue';
    this.syncQueue = this.loadQueue();
    this.init();
  }

  async init() {
    window.addEventListener('online', () => this.processSyncQueue());
    window.addEventListener('offline', () => this.enableOfflineMode());
  }

  loadQueue() {
    try {
      return JSON.parse(localStorage.getItem(this.QUEUE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  saveQueue() {
    localStorage.setItem(this.QUEUE_KEY, JSON.stringify(this.syncQueue));
  }

  async saveEntry(entry) {
    const id = `entry-${Date.now()}`;
    const entries = this.getEntries();
    entries[id] = entry;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));

    if (navigator.onLine) {
      await this.syncEntry(entry);
    } else {
      this.syncQueue.push({ id, entry });
      this.saveQueue();
    }
  }

  getEntries() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  async syncEntry(entry) {
    try {
      // Simulated sync for now since we removed Hypercore
      await new Promise(resolve => setTimeout(resolve, 100));
      return true;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    }
  }

  async processSyncQueue() {
    const successfulSyncs = [];
    
    for (const item of this.syncQueue) {
      if (await this.syncEntry(item.entry)) {
        successfulSyncs.push(item.id);
      }
    }

    this.syncQueue = this.syncQueue.filter(item => !successfulSyncs.includes(item.id));
    this.saveQueue();
  }

  enableOfflineMode() {
    console.log('Offline mode enabled - storing data locally');
  }
}

export const offlineManager = new OfflineManager();
