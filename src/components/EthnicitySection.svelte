<script>
  import SharedCheckbox from './SharedCheckbox.svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let title = '';
  export let options = [];
  export let phenotype = '#888';
  export let isArray = true;
  export let key = '';
  export let selectedValues = [];
  export let otherChecked = false;
  export let otherValue = '';

  let isOpen = false;
  const dispatch = createEventDispatcher();
  const sectionId = `section-${key}`;

  function handleCheckboxChange(value) {
    if (!isArray) return;
    
    let newValues;
    if (selectedValues.includes(value)) {
      newValues = selectedValues.filter(v => v !== value);
    } else {
      newValues = [...selectedValues, value];
    }
    
    dispatch('change', { key, values: newValues });
  }

  function handleOtherChange(checked) {
    dispatch('otherChange', { key, checked });
  }

  function handleOtherValueChange(event) {
    dispatch('otherValueChange', { key, value: event.target.value });
  }
</script>

<div class="border border-gray-200 rounded-lg shadow-sm">
  <button
    type="button"
    on:click={() => isOpen = !isOpen}
    class="w-full text-left p-4 flex justify-between items-center text-white transition-colors rounded-t-lg"
    style="background: {phenotype}"
    aria-expanded={isOpen}
    aria-controls={sectionId}
  >
    <span class="font-medium text-shadow">{title}</span>
    <svg
      class="w-5 h-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </button>
  
  {#if isOpen}
    <div class="p-4 space-y-2" id={sectionId}>
      {#each options as option (option.value)}
        <SharedCheckbox
          checked={selectedValues.includes(option.value)}
          color={phenotype}
          value={option.value}
          label={option.label}
          onChange={() => handleCheckboxChange(option.value)}
        />
      {/each}
      
      <SharedCheckbox
        checked={otherChecked}
        color={phenotype}
        label={`Some other ${key} ethnicity`}
        onChange={() => handleOtherChange(!otherChecked)}
      />
      
      {#if otherChecked}
        <input
          type="text"
          value={otherValue}
          on:input={handleOtherValueChange}
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 transition-shadow"
          style="--phenotype: {phenotype}; focus-ring-color: {phenotype}"
          placeholder={`Specify other ${key} ethnicity`}
        />
      {/if}
    </div>
  {/if}
</div>

<style>
  .text-shadow {
    text-shadow: 1px 1px #000;
  }

  input:focus {
    outline: none;
    border-color: var(--phenotype);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--phenotype) 30%, transparent);
  }
</style>
