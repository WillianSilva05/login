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
/*A opção "extended" diz para o express qual biblioteca ele deve utilizar para fazer o parsing do conteúdo das requisições que ele recebe.
Quando extended : true vai utilizar a biblioteca qs e quando for false ele vai utilizar a biblioteca querystring.

A diferença entre elas é que a biblioteca qs permite o aninhamento de objetos (nested objects), que é praticamente como o JSON trabalha:

// {"animal":{"tipo":"cachorro","raca":"vira-lata","idade":3}}
*/

app.get('/', (req, res) => {
    // send - envia para a resposta HTTP algo que você desejar
    res.sendFile(path.join(__dirname + '/../../index.html'));
});

app.post('/form', (req, res) => {
    if(!req.body.user || !req.body.pass) {
        return res.send("Os campos user/pass não devem estar vazios");
    }

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
    res.send("<script>if (!window.alert('Usuario cadastrado com sucesso!')) {window.location.href='/'}</script>")
    
    users.push({ "name" : req.body.user, "pass" : req.body.pass });
    let usuarios = JSON.stringify(users);
    fs.writeFile(path.join(__dirname + '/../json/users.json'), usuarios, (err) => {
        if (err) {
            throw err;
        }
    });
});

app.get('/changePass', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../html/changePass.html'))
});

app.post('/confirm', (req, res) => {
    if(!req.body.user || !req.body.pass1 || !req.body.pass2) {
        return res.send("Os campos user/pass não devem estar vazios");
    };

    for (let index = 0; index < users.length; index++) {
        if(req.body.pass1 == req.body.pass2) {
            if(req.body.user == users[index].name) {
                users[index].pass = req.body.pass1
                let usuarios = JSON.stringify(users);
                fs.writeFile(path.join(__dirname + '/../json/users.json'), usuarios, (err) => {
                    if (err) {
                        throw err;
                    }
                });
                return res.send("<script>if (!window.alert('Senha alterada com sucesso!')) {window.location.href='/'}</script>")
            }
        } else {
            return res.send("<script>if (!window.alert('As senhas não conferem!')) {window.location.href='/changePass'}</script>")
        }
        return res.send("Usuário não encontrado!")
    };
});

app.get('/home', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../html/home.html'))
});

app.get('/getCred', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../scripts/getCred.js'))
});

app.get('/setCred', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../scripts/setCred.js'))
});


app.get('/style/root', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../css/style.css'))
});

app.get('/style/home', (req, res) => {
    return res.sendFile(path.join(__dirname + '/../css/home_style.css'))
});

app.get('/scriptjs', (req, res) => {
    res.sendFile(path.join(__dirname + '/app.js'))
});

app.listen(process.env.PORT || 3000, function(err){
    if (err) console.log(err);
    return console.log("Server listening on PORT", 3000);
});
