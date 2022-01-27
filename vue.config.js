module.exports = {
    configureWebpack: {
      // other webpack options to merge in ...
    },
    // devServer Options don't belong into `configureWebpack`
    devServer: {
        host: 'localhost',
        hot: true,
        disableHostCheck: true,
    },
};  