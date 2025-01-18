import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'

export class IdentityManager {
  constructor() {
    this.did = null
  }

  async init() {
    // Create or load existing DID
    const seed = await this.getSeed()
    const provider = new Ed25519Provider(seed)
    this.did = new DID({ provider, resolver: getResolver() })
    await this.did.authenticate()
    return this.did
  }

  async getSeed() {
    // Get or generate seed from secure storage
    let seed = localStorage.getItem('did-seed')
    if (!seed) {
      seed = crypto.getRandomValues(new Uint8Array(32))
      localStorage.setItem('did-seed', Buffer.from(seed).toString('hex'))
    } else {
      seed = fromString(seed, 'hex')
    }
    return seed
  }

  async createProof(data) {
    return await this.did.createJWS(data)
  }

  async verifyProof(jws) {
    return await this.did.verifyJWS(jws)
  }
}
