import mongoose from 'mongoose';
import 'dotenv/config';


const DB_URL = process.env.MONGGO_CONNECTION

//CONNECT TO DB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { // if all is ok we will be here
        // return server.start();
        console.log(`> database connected`);
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err);
        process.exit(1);
    });