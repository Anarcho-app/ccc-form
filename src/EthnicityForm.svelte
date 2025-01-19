<script>
  import { onMount } from 'svelte/internal';
  import { initialFormData, initialOtherValues, sectionTitles, ETHNICITY_DATA, DELINEATION_OPTIONS } from './constants/formData';
  import ColorPicker from './components/ColorPicker.svelte';
  import EthnicitySection from './components/EthnicitySection.svelte';
  import { gunDB } from './lib/db/gunDB';

  export let onClose = () => {};

  // Get stored userId or create new one
  const storedUserId = localStorage.getItem('censusUserId');
  let userId = storedUserId || crypto.randomUUID();
  if (!storedUserId) {
    localStorage.setItem('censusUserId', userId);
  }

  let formData = { ...initialFormData };
  let otherValues = { ...initialOtherValues };
  let otherChecked = Object.fromEntries(Object.keys(initialFormData).map(key => [key, false]));
  let phenotype = '#888';
  let saveStatus = '';
  let statusLogs = [];
  let maxLogs = 8;

  $: isValid = phenotype !== '#888';
  $: debugData = {
    userId,
    formData,
    otherValues,
    otherChecked,
    phenotype
  };

  const sections = [
    ...Object.entries(ETHNICITY_DATA).map(([key, options]) => ({
      key,
      title: sectionTitles[key],
      options,
      isArray: true
    })),
    {
      key: 'other',
      title: sectionTitles.other,
      options: [],
      isArray: false
    },
    {
      key: 'delineation',
      title: sectionTitles.delineation,
      options: DELINEATION_OPTIONS,
      isArray: true
    }
  ];

  function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    statusLogs = [...statusLogs, { message, type, timestamp }].slice(-maxLogs);
  }

  onMount(async () => {
    try {
      addLog('🔄 Loading previous census data...', 'info');
      addLog(`🔍 Checking for User ID: ${userId.slice(0, 8)}...`, 'info');
      
      const savedData = await gunDB.get(userId);
      if (savedData) {
        addLog(`📥 Retrieved data for user: ${userId.slice(0, 8)}`, 'success');
        formData = savedData.formData || { ...initialFormData };
        otherValues = savedData.otherValues || { ...initialOtherValues };
        otherChecked = savedData.otherChecked || {};
        phenotype = savedData.phenotype || '#888';
      } else {
        addLog('No previous data found for this user', 'info');
      }
    } catch (error) {
      addLog('❌ Error loading saved data', 'error');
      console.error('Error loading saved data:', error);
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      saveStatus = 'Please select a phenotype/skin color';
      addLog('⚠️ Please select a phenotype/skin color', 'error');
      return;
    }
    
    const formEntry = {
      formData,
      otherValues,
      phenotype,
      otherChecked,
      timestamp: Date.now(),
      userId
    };

    try {
      addLog('🚀 Submitting census data...', 'info');
      const result = await gunDB.put(userId, formEntry);
      
      if (result.success) {
        addLog('✅ Data successfully stored', 'success');
        addLog(`💾 Saved data for user: ${userId.slice(0, 8)}`, 'success');
        addLog(`📊 Phenotype: ${phenotype}`, 'info');
        
        // Verify the save by trying to read it back
        const savedData = await gunDB.get(userId);
        if (savedData) {
          addLog(`✓ Verified save for user: ${userId.slice(0, 8)}`, 'success');
        }
      }
      
      saveStatus = 'Data saved successfully!';
      setTimeout(() => {
        saveStatus = '';
        onClose();
      }, 1500);
    } catch (error) {
      addLog('❌ Error saving data', 'error');
      console.error('Error saving data:', error);
      saveStatus = 'Failed to save data. Please try again.';
      setTimeout(() => saveStatus = '', 3000);
    }
  }

  function handlePhenotypeChange(event) {
    phenotype = event.detail;
  }

  function handleSectionChange(event) {
    const { key, values } = event.detail;
    formData[key] = values;
  }

  function handleOtherChange(event) {
    const { key, checked } = event.detail;
    otherChecked[key] = checked;
  }

  function handleOtherValueChange(event) {
    const { key, value } = event.detail;
    otherValues[key] = value;
  }
</script>

<form on:submit={handleSubmit} class="space-y-6">
  <div class="mb-6">
    <span class="block text-sm font-medium text-gray-700 mb-2">Phenotype/Skin Color:</span>
    <ColorPicker {phenotype} on:change={handlePhenotypeChange} />
  </div>

  <div class="space-y-4">
    {#each sections as { key, title, options, isArray }}
      <EthnicitySection
        {title}
        {options}
        {key}
        {phenotype}
        {isArray}
        selectedValues={formData[key]}
        otherChecked={otherChecked[key]}
        otherValue={otherValues[key]}
        on:change={handleSectionChange}
        on:otherChange={handleOtherChange}
        on:otherValueChange={handleOtherValueChange}
      />
    {/each}
  </div>

  {#if saveStatus}
    <div class="mt-4 p-2 rounded text-center {saveStatus.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
      {saveStatus}
    </div>
  {/if}

  <div class="flex gap-4 mt-6">
    <button
      type="submit"
      class="flex-1 p-3 rounded text-white transition-opacity hover:opacity-90 shadow disabled:opacity-50"
      style:background={phenotype}
      style:text-shadow="1px 1px #000"
      disabled={!isValid}
    >
      Submit
    </button>
    
    <button
      type="button"
      class="flex-1 p-3 rounded text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
      on:click={onClose}
    >
      Cancel
    </button>
  </div>

  <!-- Status Logs Section -->
  <div class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
    <h3 class="text-sm font-medium text-gray-700 mb-2">Status Logs</h3>
    <div class="space-y-1 max-h-40 overflow-y-auto">
      {#each statusLogs as log}
        <div class="text-sm {log.type === 'error' ? 'text-red-600' : log.type === 'success' ? 'text-green-600' : 'text-gray-600'}">
          <span class="text-xs text-gray-500">{log.timestamp}</span> {log.message}
        </div>
      {/each}
    </div>
  </div>

  {#if import.meta.env.DEV}
    <div class="mt-4 p-2 bg-gray-100 rounded">
      <details>
        <summary class="cursor-pointer text-sm text-gray-600 hover:text-gray-800">Debug Data</summary>
        <pre class="text-xs overflow-auto mt-2">
          {JSON.stringify(debugData, null, 2)}
        </pre>
      </details>
    </div>
  {/if}
</form>

<style>
  pre {
    max-height: 300px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  details summary::-webkit-details-marker {
    color: #666;
  }

  details[open] summary {
    margin-bottom: 8px;
  }
</style>
