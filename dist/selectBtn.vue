<template>
	<button
		type="button"
		:aria-expanded="isOpen"
		:aria-controls="'smartselect-' + selectID"
		aria-haspopup="listbox"
		@click="selectToggle"
	>
		{{ currentText }}
		<svg v-if="arrow" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 64 64" fill="none"><path d="m22 28 10 10 10-10"/></svg>
	</button>
</template>

<script setup>
import { inject } from 'vue';

const selectID = inject('selectID');
const currentText = inject('currentText');
const arrow = inject('arrow');
const { isOpen, selectToggle } = inject('isOpen');
</script>

<style scoped>
button	{display:block;width:100%;height:100%;padding:0 2.0em;position:relative;border:var(--select-border-width) solid var(--select-border-color);border-radius:var(--select-radius);line-height:inherit;font-size:inherit;color:var(--select-font-color);background:var(--select-bg-color);cursor:pointer;}
svg	{display:block;width:auto;height:100%;position:absolute;right:0;top:0;stroke:var(--select-arrow-color);}
</style>