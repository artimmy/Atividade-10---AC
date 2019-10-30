import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private servico: ServicoService) { }

  ngOnInit() {
  }

  salvar(): void {
    if (this.servico.alunoSelecionado.nome.trim() != "") {
      if (this.servico.alunoSelecionado.idaluno != undefined) {
        this.servico.atualizar(this.servico.alunoSelecionado)
          .subscribe((aluno: Aluno) => {
            this.servico.reset();
            this.servico.getAlunos();
          });
      }
      else {
        this.servico.adicionar(this.servico.alunoSelecionado)
          .subscribe((aluno: Aluno) => {
            this.servico.reset();
            this.servico.getAlunos();
          });
      }
    }
  }

  selecionar(aluno: Aluno): void {
    this.servico.alunoSelecionado = aluno;
  }

  limpar(): void {
    this.servico.reset();
  }

  excluir(aluno: Aluno): boolean {
    console.log(aluno);
    if (aluno.idaluno != undefined) {
      console.log(aluno);
      this.servico.excluir(aluno)
        .subscribe((aluno: Aluno) => {
          this.servico.reset();
          this.servico.getAlunos();
        });
    }
    return false; // para evitar o menu popup
  }

}
