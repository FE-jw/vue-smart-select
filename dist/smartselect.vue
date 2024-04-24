<template>
	<div class="smartselect-wrap" :class="{ isOpen }">
		<button type="button" class="select-button" @click="selectToggle">{{ currentText }}</button>
		<ul class="select-list">
			<li
				v-for="(options, index) in props.options"
				:key="options.value"
				:class="{ disabled: options.disabled }"
				@click="updateValue(options, index, options.disabled)"
			>
				{{ options.text }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
	options: {
		type: Array
	},
	placeholder: {
		type: String
	}
});

const isOpen = ref(false);
const currentText = ref(props.placeholder);
const emit = defineEmits(['afterChange']);

const updateValue = (options, index, isDisabled) => {
	if(!isDisabled){
		const result = {
			index,
			...options
		};
	
		emit('afterChange', result);
		currentText.value = result.text;
	}

	selectClose();
};
const selectOpen = () => {
	isOpen.value = true;
};
const selectClose = () => {
	isOpen.value = false;
};
const selectToggle = () => {
	isOpen.value = !isOpen.value;	
};

// smartselect-wrap 요소 이외 영역 클릭 시 닫기
let clickOutsideHandler;
onMounted(() => {
	clickOutsideHandler = event => {
		if(!event.target.closest('.smartselect-wrap')){
			selectClose();
		}
	};

	document.addEventListener('click', clickOutsideHandler);
});

onBeforeUnmount(() => {
	console.log('onBeforeUnmount');
	document.removeEventListener('click', clickOutsideHandler);
});
</script>

<style>
.smartselect-wrap	{
	--select-font-color: #000;
	--select-bg-color: #fff;
	--select-radius: 4px;
	--border-color: #ccc;
	--arrow-color: #ccc;
}
</style>

<style scoped>
/* Default */
.smartselect-wrap	{width:300px;height:50px;position:relative;}
.smartselect-wrap .select-button	{display:block;width:100%;height:100%;padding:0 2.0em;position:relative;border:1px solid var(--border-color);border-radius:var(--select-radius);line-height:1.3;font-size:16px;color:var(--select-font-color);background:var(--select-bg-color);cursor:pointer;}
.smartselect-wrap .select-button:after	{content:'';width:0;height:0;position:absolute;right:10px;top:50%;border-style:solid;border-right:8px solid transparent;border-left:8px solid transparent;border-top:10px solid var(--arrow-color);border-bottom:0;transform:translateY(-50%);}
.smartselect-wrap .select-list	{overflow-y:auto;display:none;width:100%;max-height:calc(180 / 16 * 1em);position:absolute;left:0;top:calc(100% + 2px);border:1px solid var(--border-color);border-radius:var(--select-radius);line-height:1.3;font-size:16px;color:var(--select-font-color);background-color:var(--select-bg-color);box-sizing:border-box;}
.smartselect-wrap .select-list li	{display:flex;justify-content:center;align-items:center;min-height:1.5em;padding:0.5em 1.0rem;text-align:center;cursor:pointer;}
.smartselect-wrap .select-list li ~ li	{border-top:1px solid var(--border-color);}
.smartselect-wrap .select-list li.disabled	{color:#999;background-color:#eee;}

/* Open Select */
.smartselect-wrap.isOpen .select-button:after	{transform:translateY(-50%) rotate(180deg);}
.smartselect-wrap.isOpen .select-list	{display:block;}
</style>