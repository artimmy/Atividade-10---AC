// importa o módulo express e coloca na variável express
const express = require("express");
// importa o módulo body-parser
const bodyParser = require('body-parser'); 
// importa o módulo CORS
var cors = require('cors');
// cria a aplicação chamando a função express()
const app = express();
// indica que usaremos o body-parser para ele entender quando enviarmos parâmetros no formato JSON
app.use(bodyParser.json());
// para ele decodificar parâmetros enviados via URL, no formato key=value e separados por &
app.use(bodyParser.urlencoded({ extended: true }));
// para aceitar CORS
app.use(cors());
// importar o módulo que possui o CRUD
const bd = require('./clausulas');

// curl http://localhost:3101/alunos
// a função getAlunos foi mapeada para a URL http://localhost:3101/alunos
app.get("/alunos", bd.getAlunos);
// curl http://localhost:3101/alunos/5
// o parâmetro id será passado na URL da seguinte forma http://localhost:3101/alunos/5
app.get('/alunos/:id', bd.getAlunosById);
// curl -d "nome=Lucas Dias&idade=20" http://localhost:3101/alunos
// a diferença entre a chamada do select e insert é o método POST
app.post('/alunos', bd.createAluno);
// curl -X DELETE http://localhost:3101/alunos/1
// para fazer um delete precisamos usar o método DELETE
app.delete('/alunos/:id', bd.deleteAluno);
// curl -X PUT -d "nome=Ana Maria&idade=22" http://localhost:3101/alunos/3
// para fazer um update precisamos usar o método PUT
app.put('/alunos/:id', bd.updateAluno);

/* 
para deixar o seu servidor rodando na porta 3101
http://localhost:3101/
*/
app.listen(3101, () => {
    console.log("Servidor rodando na porta 3101...");
});