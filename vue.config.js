module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/apps/conavid19/pacientes/' : '/',
    devServer: {
        host: 'localhost'
    }
}