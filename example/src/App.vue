<template>
	<div>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur corrupti adipisci aliquam totam quas aliquid, non molestiae magni odit impedit in voluptatem dolore eligendi quo dignissimos nulla, omnis recusandae consequatur ipsum vitae dicta? Neque maxime vero distinctio praesentium laboriosam voluptatem, tempore aperiam illo labore excepturi officiis beatae, aliquid cumque, aliquam impedit mollitia nemo. Corrupti numquam dolor porro aspernatur, facere quis voluptatem odio recusandae maiores eius harum animi autem expedita suscipit perferendis earum natus. Natus neque beatae, at enim maiores quis itaque nesciunt repellat possimus blanditiis ad mollitia illo et asperiores cum veniam facere odit impedit officia nihil. Dolores, amet sequi?
		<button type="button" @click="addOption">클릭하면 options 추가</button>
		<smart-select
			:options="options"
			placeholder="국가 선택"
			@afterChange="updateSelect"
		/>
	</div>
</template>

<script setup>
import { reactive } from 'vue';

const options = reactive([
	{ key: 'ko', value: '한국' },
	{ key: 'cn', value: '중국' },
	{ key: 'en', value: '미국' },
	{ key: 'th', value: '태국' },
	{ key: 'ja', value: '일본', disabled: true }
]);

const addOption = () => {
	options.push(
		{ key:'test', value: '테스트' }
	);
};

const updateSelect = result => {
	console.log(result);
};
</script>

<style lang="scss">
*	{margin:0;padding:0;}
html	{-webkit-text-size-adjust:none;}
body	{line-height:1.3;font-family:Arial, Helvetica, sans-serif;font-size:16px;color:#000;}
</style>

<style lang="scss" scoped>
// .myClass	{
	// --select-font-color: #d33;
// }
</style>