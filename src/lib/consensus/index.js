import { gunDB } from '../db/gunDB';

class ConsensusManager {
  constructor() {
    this.validators = new Set();
    this.threshold = 0.66;
    this.pendingValidations = new Map();
  }

  async submitEntry(entry) {
    try {
      const timestamp = Date.now();
      const entryData = {
        ...entry,
        validations: 0,
        status: 'pending',
        timestamp
      };

      await gunDB.put(entryData);
      this.pendingValidations.set(entry.id, entryData);
      
      return {
        success: true,
        entryId: entry.id
      };
    } catch (error) {
      console.error('Consensus submission failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // ... rest of the class remains the same ...
}

export const consensus = new ConsensusManager();
