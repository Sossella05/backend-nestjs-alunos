import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  private alunos: (CreateAlunoDto & { id: number })[] = [];
  private idAtual = 1;

  create(createAlunoDto: CreateAlunoDto) {
    const novoAluno = {
      id: this.idAtual++,
      ...createAlunoDto,
    };
    this.alunos.push(novoAluno);
    return novoAluno;
  }

  findAll() {
    return this.alunos;
  }

  findOne(id: number) {
    return this.alunos.find((aluno) => aluno.id === id);
  }

  update(id: number, updateAlunoDto: UpdateAlunoDto) {
    const index = this.alunos.findIndex((aluno) => aluno.id === id);
    if (index === -1) return null;

    this.alunos[index] = { ...this.alunos[index], ...updateAlunoDto };
    return this.alunos[index];
  }

  remove(id: number) {
    const index = this.alunos.findIndex((aluno) => aluno.id === id);
    if (index === -1) return false;

    this.alunos.splice(index, 1);
    return true;
  }
}
