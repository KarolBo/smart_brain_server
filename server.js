const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true
  }
});

// db.select('*').from('users').then(data=>console.log(data));

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello there!');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfilGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})
	

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})