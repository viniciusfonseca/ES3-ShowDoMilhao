(function() {

    function serialize(obj) {
        return Object.entries(obj).map(
            function([key, val]) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val)
            }
        ).join('&')
    }

    function toForm(obj) {
        const formData = new FormData()
        Object.entries(obj).forEach(function([ key, value ]) { formData.append(key, value) })
        return formData
    }

    angular.module('myApp.user', [])
    
    .service('User', function($q, api) {
        return {
            login( credentials ) {
                return $q(function(resolve, reject) {
                    fetch( api + '/user/token/get', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    }).then(r => r.json())
                        .then(resolve)
                        .catch(reject)
                })
            }
        }
    })
})()
