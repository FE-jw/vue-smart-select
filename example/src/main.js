import { createApp } from 'vue';
import App from './App.vue';
import smartselect from 'vue-smart-select';

createApp(App)
	.use(smartselect)
	.mount('#app');