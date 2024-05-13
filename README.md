![vue-smart-select](logo.svg)

# **vue-smart-select(beta)**
smart-select Vue.js module

## **Features**
* Vue 3 Support
* Web Aaccessibility Support

## **Install**
```
npm install vue-smart-select
```

## **Setup**
```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import smartselect from 'vue-smart-select';	// Be sure to import 'vue-smart-select'

createApp(App)
	.use(smartselect)	// Use 'smartselect' in your app
	.mount('#app');
```

## **Usage**
```vue
<template>
	<smart-select
		:isDisabled="false"
		:arrow="true"
		:options="options"
		:placeholder="placeholder"
		@afterChange="updateSelect"
	/>
</template>

<script setup>
const placeholder = 'nation';
const options = [
	{ value: 'ko', text: 'korea' },
	{ value: 'cn', text: 'china' },
	{ value: 'en', text: 'america' },
	{ value: 'th', text: 'thailand' },
	{ value: 'ja', text: 'japan' },
	{ value: 'test1', text: 'test1' },
	{ value: 'test2', text: 'test2' }
];
</script>
```
* Default Values
	* `:isDisabled: false`
	* `:arrow: true`

## **Events**
* `afterChange`: This event occurs after selecting an option. You can check the result object.
	```vue
	<template>
		<smart-select @afterChange="updateSelect" />
	</template>

	<script setup>
		const updateSelect = result => {
			console.log(result);
		};
	</script>
	```

## **How To Custom**
1) Add Your ClassName
	```vue
	<smart-select class="your-class" />
	```

2) Set CSS Variables
	```css
	/* These are Default Values */
	.your-class	{
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
	.your-class.isOpen	{/* after open select style */}
	.your-class.isDisabled	{/* disabled state select style */}
	```

## **Change Log**
* 0.1.0 (2024-05-13)
	* Release Beta Version