import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controlers/register.js';
import handleProfileId from './controlers/profileId.js';
import {handleImage, handleApiCall} from './controlers/image.js';
import handleSignin from './controlers/signin.js';

const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'postgres',
	  database : 'smartbrain'
	}
});



const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('success');
});

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { handleProfileId(req, res, db) });

app.put('/image', (req, res) => { handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(3000, () => {
	console.log('app is running on port 3000.')
});