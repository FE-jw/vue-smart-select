import { createApp } from 'vue';
import App from './App.vue';
import smartselect from 'vue-smartselect';

createApp(App)
	.use(smartselect)
	.mount('#app');