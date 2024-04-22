<template>
	<smart-select
		:options="options"
		placeholder="테스트"
		@afterChange="updateSelect"
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

const updateSelect = result => {
	console.log(result);
};
</script>

<style lang="scss" scoped>

</style>