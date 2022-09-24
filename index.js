import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js';
import passwordRoute from './routes/passwords.js';

config( { path: '.env' } );
const server = express();

server.use(cors());
server.use(express.json());
server.use('/pst/auth', authRoute);
server.use('/pst/passwords', passwordRoute);

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${ process.env.LOGIN }:${ process.env.PASSWORD }@${ process.env.CLUSTER }.pjyudkv.mongodb.net/${ process.env.DATABASE_NAME }?retryWrites=true&w=majority`);

        server.listen(process.env.PORT, () => console.log(`Server started on ${ process.env.PORT } PORT`));
    } catch (error) {
        console.log(error);
    }
};

connect();