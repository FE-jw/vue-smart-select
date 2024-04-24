<template>
	<div>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur corrupti adipisci aliquam totam quas aliquid, non molestiae magni odit impedit in voluptatem dolore eligendi quo dignissimos nulla, omnis recusandae consequatur ipsum vitae dicta? Neque maxime vero distinctio praesentium laboriosam voluptatem, tempore aperiam illo labore excepturi officiis beatae, aliquid cumque, aliquam impedit mollitia nemo. Corrupti numquam dolor porro aspernatur, facere quis voluptatem odio recusandae maiores eius harum animi autem expedita suscipit perferendis earum natus. Natus neque beatae, at enim maiores quis itaque nesciunt repellat possimus blanditiis ad mollitia illo et asperiores cum veniam facere odit impedit officia nihil. Dolores, amet sequi?
		<button type="button" @click="() => options.push({ value: 'test', text: '테스트' })">클릭하면 국가선택 test options 추가</button>
		<div style="margin:20px;">셀렉트 1: {{ selectValue[1] }} // 셀렉트 2: {{ selectValue[2] }}</div>
		<div class="select-items">
			<smart-select
				:options="options"
				placeholder="국가 선택"
				@afterChange="updateSelect1"
			/>
			<SelectTest
				class="custom-select"
				@afterChange="updateSelect2"
			/>
		</div>
	</div>
</template>

<script setup>
import SelectTest from '@/components/SelectTest.vue';
import { reactive } from 'vue';

const options = reactive([
	{ value: 'ko', text: '한국' },
	{ value: 'cn', text: '중국' },
	{ value: 'en', text: '미국' },
	{ value: 'th', text: '태국' },
	{ value: 'ja', text: '일본', disabled: true }
]);
const selectValue = reactive({
	1: '',
	2: ''
});

const updateSelect1 = result => {
	selectValue[1] = result.value;
};
const updateSelect2 = result => {
	selectValue[2] = result.value;
};
</script>

<style lang="scss">
*	{margin:0;padding:0;}
html	{-webkit-text-size-adjust:none;}
body	{line-height:1.3;font-family:Arial, Helvetica, sans-serif;font-size:16px;color:#000;}
</style>

<style lang="scss" scoped>
.select-items	{display:flex;gap:10px;}
.custom-select	{
	--select-font-color: forestgreen;
	--select-bg-color: lightyellow;
	--select-radius: 10px;
	--border-color: royalblue;
	--arrow-color: royalblue;
}
</style>