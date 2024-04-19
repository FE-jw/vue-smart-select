import smartslect from './smartslect.vue';

export default {
	install(app){
		console.log('install');
		app.component('smartslect', smartslect);
	}
};