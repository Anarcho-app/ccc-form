<script>
  import { COLORS } from '../constants/formData'
  import { createEventDispatcher } from 'svelte'
  
  export let phenotype
  const dispatch = createEventDispatcher()

  function handleChange(event) {
    dispatch('change', event.target.value)
  }
</script>

<div class="grid grid-cols-6 gap-0.5 mb-8 max-w-full">
  {#each COLORS as color (color)}
    <label class="flex flex-col items-center gap-2 cursor-pointer" title={color}>
      <div 
        class="w-[50px] h-[25px] border border-gray-300 hover:opacity-90 transition-opacity"
        style:background-color={color}>
      </div>
      <span 
        class="text-xs font-bold relative -top-[7px]" 
        style:color={color}
        style:text-shadow="0.5px 0.5px #888"
      >
        {color}
      </span>
      <input
        type="radio"
        name="phenotype"
        value={color}
        checked={phenotype === color}
        on:change={handleChange}
        class="phenotype-radio"
        style:--color={color}
      />
    </label>
  {/each}
</div>

<style>
  .phenotype-radio {
    -webkit-appearance: none;
    appearance: none;
    transform: scale(2);
    outline: 1px solid var(--color, #888);
    width: 6px;
    height: 10px;
    position: relative;
    top: -7px;
    margin: 0;
    cursor: pointer;
  }

  .phenotype-radio::before {
    content: "";
    position: absolute;
    inset: 0;
    display: none;
  }

  .phenotype-radio:checked::before {
    display: block;
    content: "✓";
    background: var(--color, #888);
    color: white;
    font-size: 9px;
    line-height: 10px;
    text-align: center;
  }

  .phenotype-radio:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--color) 50%, transparent);
    outline-offset: 2px;
  }
</style>
