import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
// import expressValidator from 'express-validator';
import cors from 'cors';
import 'dotenv/config';
import modelStudent from './models/modelStudents';

//VARIABLE ON .ENV FILE
const PORT = process.env.PORT

const app = express()

// DATABASE CONNECTION
import './db/'; 

app.use(cors());
app.use(logger('dev'));
// app.use(expressValidator())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send('welcome mongodb')
})

app.get('/students', async  (req, res) => {
    try {
        const student = await modelStudent.find()            
        res.status(201).send(student)
    } catch (err) {
        res.status(400).send(err)
    }

})

app.post('/student', async  (req, res) => {
    try {
        const student = new modelStudent(req.body)
        await student.save()
        res.status(201).send(student)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.get('/student/:idUser', async  (req, res) => {
    const { idUser } = req.params
    try {
        const student = await modelStudent.findById(idUser)            
        res.status(201).send(student)
    } catch (err) {
        res.status(400).send({success:false, err})
    }
})

app.put('/student/:idUser', async  (req, res) => {
    const { idUser } = req.params
    try {
        // const student = await modelStudent.findByIdAndUpdate(idUser, req.body, {new:true})            
        // res.status(201).send(student)
        await modelStudent.findByIdAndUpdate(idUser, req.body, {new:true})
        .then((docs)=>{
            res.status(201).send({success:true,data:docs})
        })
    } catch (err) {
        res.status(400).send({success:false,err})
    }
})

app.delete('/student/:idUser', async  (req, res) => {
    const { idUser } = req.params
    try {
        // const student = await modelStudent.findByIdAndUpdate(idUser, req.body, {new:true})            
        // res.status(201).send(student)
        await modelStudent.remove({ _id : idUser })
        .then((docs)=>{
            res.status(201).send({success:true,data:docs})
        })
    } catch (err) {
        res.status(400).send({success:false,err})
    }
})

app.listen(PORT, () => {
    console.debug(`Server running on port ${PORT}`)
})


