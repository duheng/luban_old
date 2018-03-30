module.exports = [{
    path: /\/apis/,
    method: 'get',
    data: function(options) {
        return [{
            id: 1,
            first: '@FIRST',
        }, {
            id: 2,
            first: '@FIRST',
        }, {
            id: 3,
            first: '@FIRST',
        }]
    }
}, {
    path: /\/api/,
    method: 'get',
    data: {
        'list|1-10': [{
            'id|+1': 1
        }]
    }
} , {
    path: '/luban',
    proxy: 'http://api.luban.com',
}]
