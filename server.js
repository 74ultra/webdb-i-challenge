const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


// Get all accounts
server.get('/accounts', async (req, res, next) => {
    try {
        res.status(200).json(await db.select('*').from('accounts'))
    } catch(err){
        next(err)
    }
})

// Get accounts by id
server.get('/accounts/:id', async (req, res, next) => {
    try {
        res.status(200).json(await db.select('*').from('accounts').where('id', req.params.id).first())
    } catch(err){
        next(err)
    }
})

// Post a new account
server.post('/accounts', async (req, res, next) => {
    try {
        const newAccount = {
            name: req.body.name,
            budget: req.body.budget
        }
        
        const [ id ] = await db('accounts').insert(newAccount)
        
        res.status(201).json(id)
    } catch(err){
        next(err)
    }
})

server.put('/accounts/:id', async (req, res, next) => {
    try {
        const updatedAccount = {
            name: req.body.name,
            budget: req.body.budget
        } 
        
        res.status(200).json(await db('accounts').where('id', req.params.id).update(updatedAccount))
        
    } catch(err){
        next(err)
    }
})

server.delete('/accounts/:id', async (req, res, next) => {
    try {
        res.status(204).json(await db('accounts').where('id', req.params.id).delete())
    } catch(err){
        next(err)
    }
})


server.use('/', (req, res) => {
    res.send("Welcome to an ill-defined project").end();
})
module.exports = server;