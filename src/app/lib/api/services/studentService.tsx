// src/lib/api/services/studentService.ts
// servico de estudante, onde devemos colocar os metodos esperados do banco


import apiClient from '../client/apiClient'
import { Student, CreateStudentDto } from '../../types/student'


/// O studentService é responsável por como obter os dados da api
// faz um fetch , espera uma promessa dos dados do back-end, esses dados vem da interface  <Student[]>
export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await apiClient.get('/alunos')  /// resposta é um get nessa rota 
    console.log(response)
    return response.data.map((aluno: { matricula: string }) => ({  // retorno deve ser um mapeamento dos dados, deixamos explicito
      id: aluno.matricula,                                          // que vamos tratar matricula como id
      ...aluno}))  
  } catch (error) {
    console.error('Erro ao buscar alunos:', error)      /// devemos alterar aqui para ao redenrizar , rederizar a tabela inteira (sem dados)
    throw new Error('Falha ao carregar alunos')         // ao inves de apenas um erro no console
  }
}

export const createStudent = async (data: CreateStudentDto): Promise<Student> => {
  const response = await apiClient.post('/aluno', data)
  return response.data
}

export const updateStudent = async (id: string, data: Partial<Student>) => {
  const response = await apiClient.patch(`/students/${id}`, data)
  return response.data
}


