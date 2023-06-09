require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const express = require('express')
const app = express()
app.use(express.json())

const routes = require('./routes')

app.use(routes)

migrationsRun()

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.log(error)

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})

const PORT = 3000

app.listen(PORT, () => console.log(`This server is running on Port ${PORT}`))