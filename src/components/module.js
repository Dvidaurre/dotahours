module.exports = {
    dev: {

        proxyTable: {
            // Crea un proxy para todas las peticiones que comiencen por /api
            '/api': {
                target: 'https://api.steampowered.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    }
}