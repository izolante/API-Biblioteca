module.exports = app => {
const livros = require("../controladores/livro.controlador.js");
var router = require("express").Router();
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(bodyParser.json());



//cria um novo livro
router.post("/", verificaToken, livros.create);

//recupera todos os livros
router.get("/", verificaToken, livros.findAll);

//recupera todos os livros emprestados
router.get("/emprestado", verificaToken, livros.findAllEmprestado);

//recupera um livro com ID
router.get("/:id", verificaToken, livros.findOne);

//atualiza um livro com a ID
router.put("/:id", verificaToken, livros.update);

//deleta um livro com a ID
router.delete("/:id", verificaToken, livros.delete);

//deleta todos os livros
router.delete("/", verificaToken, livros.deleteAll);

//testa a API de teste => 
router.get("/teste", livros.testaAPI);

app.use('/api/livros', router);

function verificaToken(req, res, next){

  const token = req.headers['token'];
  if(!token){
    console.log("erro token");
    return res.status(401).json({ auth: false, message: 'nao encontrou o token no header' });
  }
  if(token != 'tokenGateway'){
    console.log("token incorreto");
    return res.status(400).json({auth: false, message: 'token provido está incorreto'});
  }
  console.log("token:"+token);
  next();
}

};