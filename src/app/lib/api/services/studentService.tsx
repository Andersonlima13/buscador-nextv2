// src/lib/api/services/studentService.ts
// servico de estudante, onde devemos colocar os metodos esperados do banco


import apiClient from '../client/apiClient'
import { Student, CreateStudentDto } from '../../types/student'



/// O studentService é responsável por como obter os dados da api
// faz um fetch , espera uma promessa dos dados do back-end, esses dados vem da interface  <Student[]>
export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await apiClient.get('/alunos')  /// resposta é um get nessa rota 
    return response.data.map((aluno: { matricula: string }) => ({  // retorno deve ser um mapeamento dos dados, deixamos explicito
      id: aluno.matricula,                                          // que vamos tratar matricula como id
      ...aluno}))  
  } catch (error) {
    console.error('Erro ao buscar alunos:', error)      /// devemos alterar aqui para ao redenrizar , rederizar a tabela inteira (sem dados)
    throw new Error('Falha ao carregar alunos')         // ao inves de apenas um erro no console
  }
}
/// funcao para busca indiviudal de um aluno , deve fazer o fetch dos dados do card
// src/app/lib/api/services/studentService.ts
export const fetchStudentByMatricula = async (matricula: string): Promise<Student> => {
  const response = await apiClient.get(`/alunos?matricula=${matricula}`);
  
  // Encontre o aluno no array retornado
  const aluno = response.data.find((a: { matricula: string }) => a.matricula === matricula);
  if (!aluno) throw new Error('Aluno não encontrado');

  return {
    id: aluno.id,        // Use o ID real
    matricula: aluno.matricula,
    ...aluno
  };
};













export const createStudent = async (data: CreateStudentDto): Promise<Student> => {
  const response = await apiClient.post('/aluno', data)
  return response.data
}

export const updateStudent = async (id: string, data: Partial<Student>) => {
  const response = await apiClient.patch(`/students/${id}`, data)
  return response.data
}





