const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Funcao express ela cria um servidor
// express que permite a gente trabalhar com rotas parametros e respostas para nossos clientes
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);        // socket.io que permite a gente fazer comunicação em tempo real

// Conecxão com o banco de dados MongoDB
mongoose.connect('mongodb+srv://dbOmnistack:regis@123@cluster0-2ntv1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use( (req, res, next) => {
    req.io = io;

    next();
})

// cors para permitir que react web e react native acesse nossas informações do backend
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
