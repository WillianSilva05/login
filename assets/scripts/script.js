const express = require('express');
const users = require('../json/users.json');
const fs = require('fs');
const app = express();
// var PORT = 3000; // porta onde estamos rodando o servidor

const path = require('path'); // utilizado na renderização de uma página/file

// req e res sao as abreviações de request e response
// req - é a interface de requisição HTTP, você pode pegar o cabeçalho enviado pelo cliente/navegador, por exemplo pode pegar um upload
// res - é a interface de resposta HTTP, você pode enviar cabeçalhos e o corpo para o navegador

app.use(express.urlencoded({ extended: true })); // usado para passarmos os resultados que recebemos do post

app.get('/', (req, res) => {
    // send - envia para a resposta HTTP algo que você desejar
    res.sendFile('/../../index.html');
});

app.get('/form', (req, res) => {
    if(!req.body.user || !req.body.pass) {
        return res.send("Os campos user/pass não devem estar vazios");
    };

    for (let index = 0; index < users.length; index++) {
        if(req.body.user == users[index].name && req.body.pass == users[index].pass) {
            return res.redirect('/home')
        } else if (req.body.user == users[index].name && req.body.pass != users[index].pass) {
            return res.send("User/pass incorretos")
        }
    };

    return res.send("<body><script>if (window.confirm('Usuário não encontrado deseja se cadastrar ?')) {window.location.href='/register'} else {window.location.href='/'}</script></body>");
});

app.get('/register', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../html/register.html'));
});

app.post('/create', (req, res) => {
    if(!req.body.user || !req.body.pass) {
        return res.send("Os campos user/pass não devem estar vazios");
    };

    for (let index = 0; index < users.length; index++) {
        if(req.body.user == users[index].name) {
            return res.send('Usuário já existe')
        }
    };

    res.redirect('/home')

    users.push({ "name" : req.body.user, "pass" : req.body.pass });
    let usuarios = JSON.stringify(users);
    fs.writeFile(path.join(__dirname + '/../json/users.json'), usuarios, function (err){
        if (err) {
            throw err;
        }
    });
});

app.get('/home', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../html/home.html'))
});

app.listen(process.env.PORT || 3000, function(err){
    if (err) console.log(err);
    return console.log("Server listening on PORT", 3000);
});