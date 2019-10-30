// importar o módulo sqlite3
// ao definir verbose (detalhado) poderemos rastrear a pilha de execução
const sqlite3 = require('sqlite3').verbose();

// cria o BD e abre a conexão com ele, e após, dispara a função callback
const bd = new sqlite3.Database('./bdaula.db', (error) =>{
    if( error ){ // se não tiver o objeto error será null
        console.log( error.message );
    }
    else{
        console.log("BD criado");
    }
});
bd.run(
    'create table if not exists tbaluno('+
        'idaluno integer primary key autoincrement,'+
        'nome text not null,'+
        'idade integer not null'+
    ')'
);

// retorna todos os registros da tbaluno
const getAlunos = (request, response) => {
    // o método all é usado para fazer uma consulta que retorna vários registros
    // a resposta é um array de JSON
    bd.all('select * from tbaluno order by nome, idade', (error, rows) => {
        if (error) {
            throw error;
        }
        response.status(200).json(rows);
    });
};

// retorna somente o registro que possui o ID passado como parâmetro
const getAlunosById = (request, response) => {
    const id = parseInt(request.params.id);
    // o método get é usado para fazer uma consulta que retorna 0 ou 1 registro,
    // a resposta é um objeto JSON
    bd.get('select * from tbaluno where idaluno = ?', [id], (error, row) => {
        if (error) {
            throw error;
        }
        response.status(200).json(row);
    });
};

// insere um registro na tbaluno com os dados passados no corpo da requisição (request)
const createAluno = (request, response) => {
    const { nome, idade } = request.body;
    bd.run('insert into tbaluno(nome, idade) values (?,?)', 
        [nome,idade], 
        (error) => {
            if (error) {
                throw error;
            }
            response.status(204).json(this.lastID);
        }
    );
};

// exclui o registro que possui o ID passado como parâmetro
const deleteAluno = (request, response) => {
    const id = parseInt(request.params.id);

    bd.run('delete from tbaluno where idaluno = ?', [id], (error) => {
        if (error) {
            throw error;
        }
        response.status(204).json(this.lastID);
    });
};

const updateAluno = (request, response) => {
    const id = parseInt(request.params.id);
    const { nome, idade } = request.body;
  
    bd.run(
      'update tbaluno set nome = ?, idade = ? where idaluno = ?',
      [nome, idade, id],
      (error) => {
        if (error) {
          throw error;
        }
        response.status(204).json(this.changes);
      }
    );
}

module.exports = {
    getAlunos,
    getAlunosById,
    createAluno,
    deleteAluno,
    updateAluno
};