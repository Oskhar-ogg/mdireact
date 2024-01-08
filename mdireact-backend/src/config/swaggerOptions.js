
const swaggerOptions = {
    definition : {
        info: {
            title: "RUTAS API MDIAPP DISPONIBLES"
    }
    },
    apis: ['./src/routes/**/*.js']
}

module.exports = { swaggerOptions }