const isDebug = process.env.NODE_ENV !== 'production'

module.exports = {
    publicPath: './',
    filenameHashing: isDebug,
    productionSourceMap: isDebug,
    css: {
        loaderOptions: {
            // 给 less-loader 传递选项，解决iview自定义样式使用less报错
            less: {
                javascriptEnabled: true
            }
        }
    },
    configureWebpack: {
        externals: {
            'echarts/lib/echarts': 'echarts'
        }
    },
    chainWebpack: config => {
        // 未知文件配置loader选项，cur文件 Loader
        config.module
            .rule('cur')
            .test(/\.cur$/)
            .use('file-loader')
            .loader('file-loader')
            .end()
    },
    // iview 需要进行babel转换
    transpileDependencies: [/iview/, /vue-echarts/, /resize-detector/],
    // 多html
    /*
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        map: {
            entry: 'src/subpages/map.js',
            template: 'public/map.html',
            filename: 'map.html'
        }
    }
    */
    // 修改启动端口和默认的请求代理
    devServer: {
        port: 9000,
        index: 'cas-front.html',
        proxy: {
            '/': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/ws': {
                target: 'ws://localhost:8000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/ws': ''
                }
            }
        }
    }
}
