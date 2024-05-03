<template>
	<div
		ref="smartselect"
		class="smartselect-wrap"
		:class="{
			isOpen,
			isDisabled: props.isDisabled
		}"
	>
		<button 
			type="button"
			class="select-button"
			:aria-expanded="isOpen"
			:aria-controls="selectId"
			aria-haspopup="listbox"
			@click="selectToggle"
		>
			{{ currentText }}
		</button>
		<ul role="listbox" :id="selectId">
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
const selectId = 'smartselect-' + Math.random().toString(36).substring(2, 9); // 10진수를 36진수로 변환 후 앞 7자리만 사용
const smartselect = ref(null);

const props = defineProps({
	options: {
		type: Array
	},
	placeholder: {
		type: String
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

const updateValue = (options, index) => {
	if(!props.isDisabled){
		const result = {
			index,
			...options
		};
	
		emit('afterChange', result);
		currentText.value = result.text;
		currentValue.value = result.value;
	}

	selectClose();
};
// const selectOpen = () => {
	// isOpen.value = true;
// };
const selectClose = () => {
	isOpen.value = false;
};
const selectToggle = () => {
	if(!props.isDisabled){
		isOpen.value = !isOpen.value;
	}
};

// smartselect-wrap 요소 이외 영역 클릭 시 닫기
let clickOutsideHandler;
onMounted(() => {
	const id = selectId.replace('smartselect-', '');
	smartselect.value.dataset.smartSelect = id;

	clickOutsideHandler = event => {
		if(!event.target.closest('[data-smart-select="' + id + '"]')){
			selectClose();
		}
	};

	document.addEventListener('click', clickOutsideHandler);
});

onBeforeUnmount(() => {
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
/* Default Select */
.smartselect-wrap	{width:300px;height:50px;position:relative;}
.smartselect-wrap .select-button	{display:block;width:100%;height:100%;padding:0 2.0em;position:relative;border:1px solid var(--border-color);border-radius:var(--select-radius);line-height:1.3;font-size:16px;color:var(--select-font-color);background:var(--select-bg-color);cursor:pointer;}
.smartselect-wrap .select-button:after	{content:'';width:0;height:0;position:absolute;right:10px;top:50%;border-style:solid;border-right:8px solid transparent;border-left:8px solid transparent;border-top:10px solid var(--arrow-color);border-bottom:0;transform:translateY(-50%);}
.smartselect-wrap ul	{overflow-y:auto;display:none;width:100%;max-height:calc(180 / 16 * 1em);position:absolute;left:0;top:calc(100% + 2px);border:1px solid var(--border-color);border-radius:var(--select-radius);line-height:1.3;font-size:16px;color:var(--select-font-color);background-color:var(--select-bg-color);box-sizing:border-box;}
.smartselect-wrap ul li	{display:flex;justify-content:center;align-items:center;min-height:1.5em;padding:0.5em 1.0rem;text-align:center;cursor:pointer;}
.smartselect-wrap ul li ~ li	{border-top:1px solid var(--border-color);}

/* isOpen Select */
.smartselect-wrap.isOpen .select-button:after	{transform:translateY(-50%) rotate(180deg);}
.smartselect-wrap.isOpen ul	{display:block;}

/* isDisabled Select */
.smartselect-wrap.isDisabled	{opacity:0.5;pointer-events:none;}
</style>