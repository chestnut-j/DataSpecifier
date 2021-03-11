'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  devServer: {
    proxy: {
      '/': {//业务类的接口请求地址，这里的api可以是后端的工程名
        changeOrigin: true,
        target: '"http://127.0.0.1:5000/"'
      },
      '/': { //websoket请求接口地址
        ws: true,
        target: '"http://127.0.0.1:5000/"'
      }
    }
  }
})
