module.exports = [
  {
    path: /\/api/,
    method: 'get',
    data: {
      'list|1-10': [
        {
          'id|+1': 1,
        },
      ],
    },
  },
  {
    path: '/luban',
    proxy: 'http://api.luban.com',
  },
]
