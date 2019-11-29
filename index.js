import express from 'express'
import bodyParse from 'body-parser'
import uniqid from 'uniqid'
import 'dotenv/config';

const PORT = process.env.PORT

const app = express()
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({
    extended: false
}))

let users = [
    { 'id': uniqid(), 'name': 'andra manday', 'email': 'andramanday@gmail.com', 'age': 25 },
    { 'id': uniqid(), 'name': 'anrikonando', 'email': 'arikuncor@gmail.com', 'age': 29 }
]

app.get('/', (req, res) => {
    res.send('hallo world')
})

/**
Route
 */

// GET DATA USERS
app.get('/users', (req, res) => {
    res.send(users)
})

// GET DATA BY ID
app.get('/users/:idUser', (req, res) => {
    const { idUser } = req.params
    const user = users.filter(x => x.id === idUser) 
    res.send(user)
})

// INSERT NEW DATA
app.post('/users', (req, res) => {
    const { name, email, age } = req.body
    const user = users.push({ 'id': uniqid(), name, email, age })
    res.status(200).send({
        msg: 'New data Insert',
        user: req.body
    })
})

// UPDATE DATA
app.put('/users/:idUser', (req, res) => {
    const { idUser } = req.params
    const { name, email, age } = req.body
    //first step get index object
    const index = users.findIndex(x => x.id === idUser)

    if (index > -1){
        //delete data
        users.splice(index, 1)
        //push data with id before
        users.push({ 'id': idUser, name, email, age })
        res.status(200).send({
            msg: 'update succesful',
            user: req.body
        })
    }else{
        res.status(400).send({
            msg: 'User ID not found'
        }) 
    }
})

// DELETE DATA
app.delete('/users/:idUser', (req, res) => {
    const { idUser } = req.params
    //first step get index object
    const index = users.findIndex(x => x.id === idUser)

    if (index > -1){
        //delete data
        users.splice(index, 1)
        res.status(200).send({
            msg: 'delete succesful'
        })
    }else{
        res.status(400).send({
            msg: 'User ID not found'
        }) 
    }
})

app.listen(PORT, () => {
    console.log(`server running at localhost:${PORT}`)
})