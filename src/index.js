import './customs.scss';

import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import bvOptions from './bvOptions.json';

import JB from './plugins/jb';
import Application from './components/Application';

Vue.use(BootstrapVue, bvOptions);
Vue.use(BootstrapVueIcons);
Vue.use(JB);

const application = new Vue({
	render(h) {
		return h(Application);
	}
});

window.addEventListener('load', async function bootstrap() {
	application.$mount('#app');
});
