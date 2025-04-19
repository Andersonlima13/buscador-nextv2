// modelo aluno (como ele deve estar disposto no bd)

export type Student = {
    id: number;
    name: string;
    email: string;
    class: string;
    status?: 'Ativo' | 'Inativo';
    // ... outros campos
  };

  
export type CreateStudentDto = {
    name: string;
    email: string;
    class: string;
    // Campos sem 'id' e status opcional
  };