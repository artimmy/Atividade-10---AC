const Pool = require('pg').Pool
// cria um pool de conexão, isso evita ter de abrir um cliente e fechar a cada consulta
const pool = new Pool({
    host: 'localhost',
    database: 'bdaula',
    user: 'postgres',
    password: '123',
    port: 5432,
});

// retorna todos os registros da tbaluno
const getAlunos = (request, response) => {
    pool.query('select * from tbaluno order by nome, idade', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// retorna somente o registro que possui o ID passado como parâmetro
const getAlunosById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('select * from tbaluno where idaluno = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// insere um registro na tbaluno com os dados passados no corpo da requisição (request)
const createAluno = (request, response) => {
    const { nome, idade } = request.body;

    pool.query('insert into tbaluno(nome, idade) values ($1,$2) RETURNING  *', 
        [nome,idade], 
        (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// exclui o registro que possui o ID passado como parâmetro
const deleteAluno = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('delete from tbaluno where idaluno = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if( results.rowCount > 0 ){
            response.status(204).send(`Aluno excluído com ID: ${id}`);
        }
        else{
            response.status(204).send(`Não foi possível excluir o aluno com ID: ${id}`);
        }
    });
}

const updateAluno = (request, response) => {
    const id = parseInt(request.params.id);
    const { nome, idade } = request.body;
  
    pool.query(
      'update tbaluno set nome = $1, idade = $2 where idaluno = $3',
      [nome, idade, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        if( results.rowCount > 0 ){
            response.status(204).send(`Aluno atualizado com ID: ${id}`);
        }
        else{
            response.status(204).send(`Não foi possível atualizar o aluno com ID: ${id}`);
        }
      }
    );
};

module.exports = {
    getAlunos,
    getAlunosById,
    createAluno,
    deleteAluno,
    updateAluno
};
