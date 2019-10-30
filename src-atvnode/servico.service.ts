import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Aluno } from './aluno';
@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  alunoSelecionado: Aluno;
  alunos$: Observable<Object>;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  urlbase: string = 'http://localhost:3100';

  constructor(private http: HttpClient) {
    this.reset();
    this.getAlunos();
  }

  reset():void{
    this.alunoSelecionado = new Aluno();
  }
  
  /* método HTTP get */
  getAlunos(): void {
    this.alunos$ = this.http.get(this.urlbase + '/alunos')
      .pipe(
        /* função a ser executada no caso de algum erro*/
        catchError(this.handleError<Aluno>('getAlunos'))
      );
  }

  /* método HTTP delete */
  excluir(aluno: Aluno): Observable<Aluno> {
    let url: string = this.urlbase + '/alunos/' + aluno.idaluno;
    return this.http.delete<Aluno>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Aluno>('excluir'))
      );
  }

  /* método HTTP put */
  atualizar(aluno: Aluno): Observable<Aluno> {
    let url: string = this.urlbase + '/alunos/' + aluno.idaluno;
    return this.http.put<Aluno>(url, aluno, this.httpOptions)
      .pipe(
        catchError(this.handleError<Aluno>('atualizar'))
      );
  }

  /* método HTTP post */
  adicionar(aluno: Aluno): Observable<Aluno> {
    let url: string = this.urlbase + '/alunos';
    return this.http.post<Aluno>(url, aluno, this.httpOptions)
      .pipe(
        catchError(this.handleError<Aluno>('adicionar'))
      );
  }

  /* imprime no console a mensagem de erro */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}
