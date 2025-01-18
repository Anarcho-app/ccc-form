import './app.css'
import App from './EthnicityForm.svelte'

// Initialize app first
const app = new App({
  target: document.getElementById('app'),
})

// Initialize P2P and IPFS in the background
const initBackgroundServices = async () => {
  try {
    const { p2pNetwork, ipfsStorage } = await import('./lib')
    await Promise.all([
      p2pNetwork.init().catch(console.error),
      ipfsStorage.init().catch(console.error)
    ])
    console.log('Background services initialized')
  } catch (error) {
    console.error('Failed to initialize background services:', error)
  }
}

// Start background services after app is mounted
setTimeout(initBackgroundServices, 100)

export default app
