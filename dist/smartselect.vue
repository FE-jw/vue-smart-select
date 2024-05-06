<template>
	<div
		ref="smartselect"
		class="smartselect-wrap"
		:data-smartselect="selectId"
		:class="{
			isOpen,
			isDisabled: props.isDisabled
		}"
	>
		<button 
			type="button"
			:aria-expanded="isOpen"
			:aria-controls="'smartselect-' + selectId"
			aria-haspopup="listbox"
			@click="selectToggle"
			>{{ currentText }}
			<svg v-if="props.arrow" xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 64 64" fill="none"><path d="m24 28 8 8 8-8"/></svg>
		</button>
		<ul role="listbox" :id="'smartselect-' + selectId" :data-expanded="isOpen">
			<li
				v-for="(options, index) in props.options"
				tabindex="0"
				role="option"
				:key="options.value"
				:class="{ selected: currentValue === options.value }"
				@click="updateValue(options, index)"
				@keypress.enter="updateValue(options, index)"
			>
				{{ options.text }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const smartselect = ref(null);
const selectId = Math.random().toString(36).substring(2);	// 10진수를 36진수로 변환 후 '0.' 제거
const props = defineProps({
	options: {
		type: Array,
		required: true
	},
	placeholder: {
		type: String,
		required: true
	},
	arrow: {
		type: Boolean,
		default: true
	},
	isDisabled: {
		type: Boolean,
		default: false
	}
});
const isOpen = ref(false);
const currentText = ref(props.placeholder);
const currentValue = ref(null);
const emit = defineEmits(['afterChange']);

// 옵션 클릭 시 업데이트
const updateValue = (options, index) => {
	if(!props.isDisabled){
		const result = {
			selectId,
			index,
			...options
		};
	
		emit('afterChange', result);
		currentText.value = result.text;
		currentValue.value = result.value;
	}

	selectClose();
};

// 열고 닫기
const selectClose = () => {
	isOpen.value = false;
};
const selectToggle = () => {
	if(!props.isDisabled){
		isOpen.value = !isOpen.value;
	}
};

// select 이외 영역 클릭 시 닫기
let clickOutsideHandler;
onMounted(() => {
	clickOutsideHandler = event => {
		if(!event.target.closest('[data-smartselect="' + selectId + '"]')){
			selectClose();
		}
	};

	document.addEventListener('click', clickOutsideHandler);
});

onUnmounted(() => {
	document.removeEventListener('click', clickOutsideHandler);
});
</script>

<style>
/* select custom */
.smartselect-wrap	{
	/* select button style */
	--select-font-size: 16px;
	--select-font-color: #000;
	--select-bg-color: #fff;
	--select-border-width: 1px;
	--select-border-color: #ccc;
	--select-radius: 4px;
	--select-arrow-color: #ccc;
	--selected-font-color: #000;
	--selected-bg-color: #eee;

	/* select options style */
	--option-font-color: #000;
	--option-border-width: 1px;
	--option-border-color: #ccc;
}
</style>

<style scoped>
/* Default Select */
.smartselect-wrap	{position:relative;line-height:1.3;font-size:var(--select-font-size);}
.smartselect-wrap button	{display:block;width:100%;height:100%;padding:0 2.0em;position:relative;border:var(--select-border-width) solid var(--select-border-color);border-radius:var(--select-radius);line-height:inherit;font-size:inherit;color:var(--select-font-color);background:var(--select-bg-color);cursor:pointer;}
.smartselect-wrap button svg	{display:block;width:auto;height:100%;position:absolute;right:0;top:0;stroke:var(--select-arrow-color);}

.smartselect-wrap ul	{overflow-y:auto;display:none;width:100%;max-height:150px;position:absolute;left:0;top:100%;border:var(--select-border-width) solid var(--option-border-color);border-top:none;border-radius:var(--select-radius);line-height:inherit;font-size:inherit;color:var(--option-font-color);background-color:var(--select-bg-color);box-sizing:border-box;}
.smartselect-wrap ul li	{display:flex;justify-content:center;align-items:center;min-height:1.5em;padding:0.2em 0.5em;text-align:center;cursor:pointer;}
.smartselect-wrap ul li ~ li	{border-top:var(--option-border-width) solid var(--option-border-color);}
.smartselect-wrap ul li:hover,
.smartselect-wrap ul li.selected	{color:var(--selected-font-color);background-color:var(--selected-bg-color);}

/* isOpen Select */
.smartselect-wrap ul[data-expanded='true']	{display:block;}

/* isDisabled Select */
.smartselect-wrap.isDisabled	{opacity:0.5;pointer-events:none;}
</style>