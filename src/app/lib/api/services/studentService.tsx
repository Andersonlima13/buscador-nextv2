// src/lib/api/services/studentService.ts
import apiClient from '../client/apiClient'
import { Student, CreateStudentDto } from '../../types/student'


/// O studentService é responsável por como obter os dados da api

export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await apiClient.get('/students')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar alunos:', error)      /// devemos alterar aqui para ao redenrizar , rederizar a tabela inteira (sem dados)
    throw new Error('Falha ao carregar alunos')
  }
}

export const createStudent = async (data: CreateStudentDto): Promise<Student> => {
  const response = await apiClient.post('/students', data)
  return response.data
}

export const updateStudent = async (id: string, data: Partial<Student>) => {
  const response = await apiClient.patch(`/students/${id}`, data)
  return response.data
}


