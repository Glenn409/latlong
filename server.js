const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./routes/api')(app)

app.listen(port, function(){
    console.log(`istening on port: ${port}`)
})
