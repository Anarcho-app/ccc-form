<script>
  export let checked = false;
  export let color = '#888';
  export let value = undefined;
  export let label = '';
  export let onChange = () => {};
  export let type = 'checkbox';
</script>

<label class="flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
  <input
    {type}
    class="shared-input"
    {checked}
    {value}
    on:change={onChange}
    style="--color: {color}"
  />
  <span class="text-sm ml-2">{label}</span>
</label>

<style>
  .shared-input {
    -webkit-appearance: none;
    appearance: none;
    transform: scale(1.5);
    outline: 1px solid var(--color);
    width: 16px;
    height: 16px;
    position: relative;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 3px;
  }

  .shared-input[type="checkbox"]::before {
    content: "";
    position: absolute;
    inset: 0;
    display: none;
    background: var(--color);
    border-radius: 2px;
  }

  .shared-input[type="checkbox"]:checked::before {
    display: block;
    content: "✓";
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
  }

  .shared-input:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--color) 50%, transparent);
    outline-offset: 2px;
  }
</style>
