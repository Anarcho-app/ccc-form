<script>
  import EthnicityForm from './EthnicityForm.svelte';
  let isDialogOpen = false;

  function handleClose() {
    isDialogOpen = false;
  }
</script>

<main class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <button
    class="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
    on:click={() => isDialogOpen = true}
  >
    Open Census Form
  </button>

  {#if isDialogOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          on:click={handleClose}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Census Form</h2>
          <EthnicityForm onClose={handleClose} />
        </div>
      </div>
    </div>
  {/if}
</main>
