import Vue from 'vue'

import { Notice, Modal, Spin, Input, Button, Rate, Page, Icon } from 'iview'

Vue.prototype.$Notice = Notice
Vue.prototype.$Modal = Modal

Vue.component('Spin', Spin)
Vue.component('Rate', Rate)
Vue.component('Page', Page)
Vue.component('Icon', Icon)
Vue.component('Input', Input)
Vue.component('Button', Button)
