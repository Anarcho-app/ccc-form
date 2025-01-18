import Gun from 'gun/gun';
import 'gun/sea';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';

// Initialize GunDB
const gun = Gun({
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    'https://gun-us.herokuapp.com/gun'
  ],
  localStorage: true
});

// Create user instance
export const user = gun.user().recall({ sessionStorage: true });

// Create database namespace for form data
export const formDB = gun.get('formData');

// Helper functions for offline storage
const STORAGE_KEY = 'ethnicityFormData';

export const saveFormDataOffline = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getFormDataOffline = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Helper functions for online storage
export const saveFormData = async (userId, data) => {
  try {
    await new Promise((resolve, reject) => {
      formDB.get(userId).put(data, ack => {
        if (ack.err) reject(ack.err);
        else resolve();
      });
    });
    // Always save offline as backup
    saveFormDataOffline(data);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    // Try offline storage as fallback
    return saveFormDataOffline(data);
  }
};

export const getFormData = async (userId) => {
  try {
    const data = await new Promise(resolve => {
      formDB.get(userId).once(data => {
        resolve(data);
      });
    });
    return data || getFormDataOffline();
  } catch (error) {
    console.error('Error getting data:', error);
    return getFormDataOffline();
  }
};

// Generate or retrieve user ID
export const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Gun.text.random(16);
    localStorage.setItem('userId', userId);
  }
  return userId;
};
