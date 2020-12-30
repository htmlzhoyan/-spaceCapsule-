'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://192.168.0.231:8080/wisdom-classrome"',
  // API_ROOT:'"http://xlzk.xlxy.edu.cn:8080/wisdom-classrome"',
  CLOUD_API:'"http://www.ejkj.top/sys/"'
})
