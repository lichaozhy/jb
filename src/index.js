import './customs.scss';

import Vue from 'vue';
import {
	ListGroupPlugin,
	TablePlugin,
	CardPlugin,
	ButtonPlugin,
	NavbarPlugin,
	LayoutPlugin,
	ButtonToolbarPlugin,
	BootstrapVueIcons
} from 'bootstrap-vue';

import JB from './plugins/jb';
import Application from './components/Application';

Vue.use(ListGroupPlugin);
Vue.use(TablePlugin);
Vue.use(CardPlugin);
Vue.use(ButtonPlugin);
Vue.use(ButtonToolbarPlugin);
Vue.use(NavbarPlugin);
Vue.use(LayoutPlugin);
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
