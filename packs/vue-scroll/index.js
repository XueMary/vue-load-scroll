import component from './index.vue';

component.install = function (Vue) {
  Vue.component(component.name, component)
}

// To allow use as module (npm/webpack/etc.) export component
export default component;