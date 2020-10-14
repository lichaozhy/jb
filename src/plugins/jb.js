import dateformat from 'dateformat';
import axios from 'axios';
import options from '../../config.json';

export function localDatetime(value) {
	return dateformat(value, 'yyyy-mm-dd HH:MM:ss');
}

export function localDate(value) {
	return dateformat(value, 'yyyy-mm-dd');
}

export function localTime(value) {
	return dateformat(value, 'HH:MM:ss');
}

const backend = {
	Client: {
		query() {
			return axios.get('/clients').then(res => res.data.clients);
		}
	},
	Data: function IData(ip) {
		return {
			get() {
				return axios.get(`/data/${ip}`).then(res => res.data.data);
			}
		};
	}
};

export default {
	/**
	 * @param {typeof import('vue').default} Vue
	 */
	install(Vue) {
		Vue.prototype.$jb = { backend, options };

		Vue.filter('localDatetime', localDatetime);
		Vue.filter('localDate', localDate);
		Vue.filter('localTime', localTime);
	},
};
