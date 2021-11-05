var express = require('express');
var routes = express.Router();

app.get('/gamesTypes', (req, res) => {
    fs.readFile('../Frontend/games.json', 'utf8', function(err, data) {
        if (err) {
            const response = { status: 'falha', resultado: err }
            res.json(response)
        } else {
            const obj = JSON.parse(data)
            const response = {obj }
            res.json(response)
        }
    })
})

const betsList = function(){
    const content = fs.readFileSync('../Frontend/games.json', 'utf8')
    return JSON.parse(content) 
}

app.get('/betsList',(req, res) => {
    const content = betsList()
    res.send(content)
})

app.post('/betsList', (req, res) => {
    const {type, price, range,color, created_at  } = req.body
    const currentBets = betsList()
    currentBets.push({ 
        id: Math.random().toString(32).substr(2,9),
        type, 
        price, 
        range,
        color,
        created_at 
    })
    res.send(currentBets)
})

app.delete('/betsList/:id', (req, res) => {
    const {id} = req.params
    const currentBets = betsList()
    const selectedItem = currentBets.findIndex((item)=>item.id === id)
    currentBets.splice(selectedItem,1)
    res.send(currentBets);    
})

module.exports = routes;