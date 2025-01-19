import Hypercore from 'hypercore'
import ram from 'random-access-memory'

class HypercoreManager {
  constructor() {
    this.core = new Hypercore(ram, {
      valueEncoding: 'json',
      sparse: true
    })
    this.ready = this.init()
  }

  async init() {
    await this.core.ready()
    console.log('Hypercore public key:', this.core.key.toString('hex'))
    return true
  }

  async append(data) {
    await this.ready
    return this.core.append(data)
  }

  async get(index) {
    await this.ready
    return this.core.get(index)
  }

  async verify(index, data) {
    await this.ready
    return this.core.verify(index, data)
  }
}

export const hypercore = new HypercoreManager()
