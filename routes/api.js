const apiTools = require('./apiFunctions')

module.exports = app => {
    app.get('/api/:lat/:long', (req,res) =>{
        apiTools.findNearestStore(req.params.lat, req.params.long, function(data){
            if(data.err){
                res.status(400).send(data.error)
            }
            res.status(200).send(data)
        })
    })
}