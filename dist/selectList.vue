<template>
	<ul role="listbox" :id="'smartselect-' + selectId" :data-expanded="isOpen">
		<li
			v-for="(options, index) in options"
			tabindex="0"
			role="option"
			:key="options.value"
			:class="{ selected: currentValue === options.value }"
			@click="emit('onUpdate', { options, index })"
			@keypress.enter="emit('onUpdate', { options, index })"
		>
			{{ options.text }}
		</li>
	</ul>
</template>

<script setup>
import { inject } from 'vue';
const emit = defineEmits(['onUpdate']);
const selectId = inject('selectId');
const options = inject('options');
const currentValue = inject('currentValue');
const { isOpen } = inject('isOpen');
</script>

<style scoped>
ul	{overflow-y:auto;display:none;width:100%;max-height:150px;position:absolute;left:0;top:100%;border:var(--select-border-width) solid var(--option-border-color);border-top:none;border-radius:var(--select-radius);line-height:inherit;font-size:inherit;color:var(--option-font-color);background-color:var(--select-bg-color);box-sizing:border-box;}
ul[data-expanded='true']	{display:block;}

li	{display:flex;justify-content:center;align-items:center;min-height:1.5em;padding:0.2em 0.5em;text-align:center;cursor:pointer;}
li ~ li	{border-top:var(--option-border-width) solid var(--option-border-color);}
li:hover,
li.selected	{color:var(--selected-font-color);background-color:var(--selected-bg-color);}
</style>