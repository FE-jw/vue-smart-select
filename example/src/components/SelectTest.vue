<template>
	<smart-select
		:options="options"
		placeholder="테스트"
	/>
</template>

<script setup>
import { reactive } from 'vue';

const options = reactive([
	{ value: 1, text: 'test-1'},
	{ value: 2, text: 'test-2'},
	{ value: 3, text: 'test-3'},
	{ value: 4, text: 'test-4'},
	{ value: 5, text: 'test-5'}
]);
</script>

<style lang="scss" scoped>

</style>