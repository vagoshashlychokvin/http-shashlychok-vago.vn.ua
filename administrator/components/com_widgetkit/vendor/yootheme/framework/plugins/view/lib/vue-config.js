(function (window) {

    var Vue = window.Vue;

    if (!Vue.mixin) {
        Vue.mixin = {};
    }

    Vue.mixin.config = {

        created: function () {

            var config = window.$config;

            Vue.url.root = config.url;
            Vue.http.headers.common['X-XSRF-TOKEN'] = config.csrf;
            Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            Vue.http.options.urlRoot = config.route;
            Vue.http.options.emulateHTTP = true;
            Vue.http.options.beforeSend = function (request, options) {
                options.params.p = options.url;
                options.url = '';
            };

        }

    };

})(this);
