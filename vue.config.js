module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        port:'8080',
        proxy: {
            '/apis': {
                target: 'https://pub.alimama.com/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            },
        },
    },

    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    baseUrl: './',
    outputDir: 'm',

}