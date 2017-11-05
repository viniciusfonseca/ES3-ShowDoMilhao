(function() {

    function serialize(obj) {
        return Object.entries(obj).map(
            function(key, val) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val)
            }
        ).join('&')
    }

    angular.module('myApp.user', [])
    
    .service('User', function($q, api) {
        return {
            login( credentials ) {
                return $q(function(resolve) {
                return $q(function(resolve, reject) {
                    fetch( api + '/login', {
                        method: 'POST',
                        body: serialize( credentials )
                    }).then(resolve).catch(reject)
                })
            }
        }
    })
})()
