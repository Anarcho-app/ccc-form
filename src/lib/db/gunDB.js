import Gun from 'gun/gun'
import 'gun/sea'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'

class GunDBManager {
  constructor() {
    this.gun = Gun({
      peers: [
        'https://gun-manhattan.herokuapp.com/gun',
        'https://gun-us.herokuapp.com/gun'
      ],
      localStorage: true,
      radisk: true
    })
    this.censusData = this.gun.get('census')
  }

  _prepareForGun(data) {
    if (!data || typeof data !== 'object') return data;
    
    const prepared = {};
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        prepared[key] = value.reduce((obj, item, index) => {
          obj[index.toString()] = item;
          return obj;
        }, {});
      } else if (typeof value === 'object') {
        prepared[key] = this._prepareForGun(value);
      } else {
        prepared[key] = value;
      }
    }
    return prepared;
  }

  async put(userId, data) {
    console.log('Attempting to save data for user:', userId);
    const prepared = this._prepareForGun(data);
    
    return new Promise((resolve, reject) => {
      this.censusData.get(userId).put(prepared, ack => {
        if (ack.err) {
          console.error('Failed to store data:', ack.err);
          reject(new Error(ack.err));
        } else {
          console.log('✅ Data stored successfully for user:', userId);
          // Verify the save by immediately reading back
          this.censusData.get(userId).once(savedData => {
            if (savedData) {
              console.log('✓ Verified save - Data retrieved:', userId);
              resolve({ success: true, userId });
            } else {
              reject(new Error('Save verification failed'));
            }
          });
        }
      });
    });
  }

  async get(userId) {
    console.log('Attempting to retrieve data for user:', userId);
    return new Promise(resolve => {
      this.censusData.get(userId).once(data => {
        if (data) {
          console.log('✅ Retrieved data for user:', userId);
        } else {
          console.log('No data found for user:', userId);
        }
        resolve(data);
      });
    });
  }
}

export const gunDB = new GunDBManager();
