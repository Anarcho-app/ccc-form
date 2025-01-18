import Gun from 'gun'
import { Hypercore } from 'hypercore'
import { IdentityManager } from '../identity/did'

export class VouchSystem {
  constructor() {
    this.gun = Gun()
    this.core = new Hypercore('./data/vouch-log')
    this.identity = new IdentityManager()
  }

  async vouch(forDid, attestation) {
    const proof = await this.identity.createProof({
      type: 'vouch',
      for: forDid,
      attestation,
      timestamp: Date.now()
    })

    // Store in GunDB
    this.gun.get('vouches').get(forDid).set({
      proof,
      timestamp: Date.now()
    })

    // Append to Hypercore
    await this.core.append(JSON.stringify({
      type: 'vouch',
      proof,
      timestamp: Date.now()
    }))
  }

  async getVouches(did) {
    return new Promise((resolve) => {
      this.gun.get('vouches').get(did).once((data) => {
        resolve(data)
      })
    })
  }

  async verifyVouch(vouch) {
    return await this.identity.verifyProof(vouch.proof)
  }
}
