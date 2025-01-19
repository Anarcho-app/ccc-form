class EncryptionManager {
  constructor() {
    this.available = typeof window !== 'undefined' && 
                    window.crypto && 
                    window.crypto.subtle;
  }

  async encryptData(data) {
    if (!this.available) return { data };

    try {
      // Use a simpler encryption approach
      const key = await window.crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: 256
        },
        true,
        ['encrypt', 'decrypt']
      );

      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encodedData = new TextEncoder().encode(JSON.stringify(data));

      const encryptedContent = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv
        },
        key,
        encodedData
      );

      const exportedKey = await window.crypto.subtle.exportKey('raw', key);

      return {
        data, // Keep original data as fallback
        encrypted: Array.from(new Uint8Array(encryptedContent)),
        iv: Array.from(iv),
        key: Array.from(new Uint8Array(exportedKey))
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      return { data }; // Return unencrypted data on failure
    }
  }

  async decryptData(encryptedData) {
    if (!this.available || !encryptedData.encrypted) {
      return encryptedData.data || encryptedData;
    }

    try {
      const key = await window.crypto.subtle.importKey(
        'raw',
        new Uint8Array(encryptedData.key),
        'AES-GCM',
        true,
        ['decrypt']
      );

      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: new Uint8Array(encryptedData.iv)
        },
        key,
        new Uint8Array(encryptedData.encrypted)
      );

      return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData.data || encryptedData;
    }
  }
}

const encryption = new EncryptionManager();
export { encryption };
