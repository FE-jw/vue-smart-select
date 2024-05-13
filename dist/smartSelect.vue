<template>
	<div
		ref="smartselect"
		:data-smartselect="selectID"
		:class="{
			isOpen,
			isDisabled: props.isDisabled
		}"
	>
		<select-btn />
		<select-list @onUpdate="updateValue" />
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue';
import selectBtn from './selectBtn.vue';
import selectList from './selectList.vue';
const smartselect = ref(null);
const selectID = Math.random().toString(36).substring(2);	// 10진수를 36진수로 변환 후 '0.' 제거
const emit = defineEmits(['afterChange']);
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

// 옵션 클릭 시 업데이트
const updateValue = value => {
	if(!props.isDisabled){
		const { options, index } = value;
		const result = {
			selectID,
			index,
			...options
		};
	
		currentText.value = result.text;
		currentValue.value = result.value;
		emit('afterChange', result);
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

// Provide
provide('isOpen', { isOpen, selectToggle });
provide('isDisabled', props.isDisabled);
provide('selectID', selectID);
provide('options', props.options);
provide('currentText', currentText);
provide('currentValue', currentValue);
provide('arrow', props.arrow);

// select 이외 영역 클릭 시 닫기
let clickOutsideHandler;
onMounted(() => {
	clickOutsideHandler = event => {
		if(!event.target.closest('[data-smartselect="' + selectID + '"]')){
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
[data-smartselect]	{
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

	position:relative;line-height:1.3;font-size:var(--select-font-size);
}
[data-smartselect].isDisabled	{opacity:0.5;pointer-events:none;}
</style>