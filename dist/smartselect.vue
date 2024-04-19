<template>
	<div class="smartselect-wrap" :class="{ isOpen }">
		<button type="button" class="select-button" @click="isOpenToggle">{{ currentValue }}</button>
		<ul class="select-list">
			<li
				v-for="options in props.options"
				:key="options.key"
				:class="{ disabled: options.disabled }"
				@click="updateValue(options)"
			>
				{{ options.value }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	options: {
		type: Array
	},
	placeholder: {
		type: String
	}
});

const isOpen = ref(false);
const currentValue = ref(props.placeholder);
const emit = defineEmits(['afterChange']);

const updateValue = result => {
	emit('afterChange', result);
	currentValue.value = result.value;
};
const isOpenToggle = () => {
	isOpen.value = !isOpen.value;
};
</script>

<style scoped>
/* Default */
.smartselect-wrap	{width:300px;height:50px;position:relative;}
.smartselect-wrap .select-button	{display:block;width:100%;height:100%;border:1px solid #ccc;border-radius:0;font-size:16px;color:#000;background:none;cursor:pointer;}
.smartselect-wrap .select-list	{overflow-y:auto;display:none;width:100%;max-height:12.5em;position:absolute;left:0;top:calc(100% + 6px);border:1px solid #ccc;font-size:16px;color:#000;}
.smartselect-wrap .select-list li	{display:flex;justify-content:center;align-items:center;min-height:1.5em;padding:0.5em 1.0rem;text-align:center;cursor:pointer;}
.smartselect-wrap .select-list li ~ li	{border-top:1px solid #ccc;}
.smartselect-wrap .select-list li.disabled	{color:#999;background-color:#eee;cursor:auto;pointer-events:none;}

/* Open Select */
.smartselect-wrap.isOpen .select-list	{display:block;}
</style>