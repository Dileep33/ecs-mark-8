webpackJsonp([1],{"6fN7":function(o,n){o.exports=function(o,n){if((n=n||window.Vue)&&n.config){var t=n.config.errorHandler;n.config.errorHandler=function(n,e,i){var r={};"[object Object]"===Object.prototype.toString.call(e)&&(r.componentName=function(o){if(o.$root===o)return"root instance";var n=o._isVue?o.$options.name||o.$options._componentTag:o.name;return(n?"component <"+n+">":"anonymous component")+(o._isVue&&o.$options.__file?" at "+o.$options.__file:"")}(e),r.propsData=e.$options.propsData),void 0!==i&&(r.lifecycleHook=i),o.captureException(n,{extra:r}),"function"==typeof t&&t.call(this,n,e,i)}}}}});
//# sourceMappingURL=1.08b2a8ab45e15049073e.js.map