// src/app/alunos/[matricula]/page.tsx
'use client'

import { fetchStudentByMatricula } from '@/app/lib/api/services/studentService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Student } from '@/app/lib/types/student';

export default function AlunoDetalhes({ params }: { params: { matricula: string } }) {
  const [aluno, setAluno] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        if (!/^\d+$/.test(params.matricula)) {
          setError('Matrícula inválida');
          setLoading(false);
          return;
        }

        const data = await fetchStudentByMatricula(params.matricula)
        if (!data?.matricula) {
          setError('Aluno não encontrado');
          setLoading(false);
          return;
        }

        setAluno(data);
        setLoading(false);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Erro ao carregar dados do aluno');
          console.error('Erro detalhado:', err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [params.matricula]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
        <p>Carregando dados do aluno...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">404 - Aluno não encontrado</h2>
          <p className="mt-1">{error}</p>
          <button 
            onClick={() => router.push('/home')}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Voltar para lista
          </button>
        </div>
      </div>
    );
  }

  // Garantia que aluno não é null antes de renderizar
  if (!aluno) {
    return null; // Ou algum fallback UI
  }

  return (
    <div className="p-5 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">{aluno.nome}</h1>
        <p className="text-gray-600">Matrícula: {aluno.matricula}</p>
      </header>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {aluno.serie && (
            <p className="text-gray-700"><span className="font-medium">Série:</span> {aluno.serie}</p>
          )}
          {aluno.unidade && (
            <p className="text-gray-700"><span className="font-medium">Unidade:</span> {aluno.unidade}</p>
          )}
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Contato</h3>
          {aluno.email && (
            <p className="text-gray-700"><span className="font-medium">Email:</span> {aluno.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}