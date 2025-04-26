// src/app/alunos/[matricula]/page.tsx
'use client'

import { fetchStudentByMatricula } from '@/app/lib/api/services/studentService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Student } from '@/app/lib/types/student';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  width: 250px;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  background: #f0f0f0;
  box-shadow: 10px 10px 20px #cbced1, -10px -10px 20px #ffffff;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProfilePic = styled.img`
  width: 60%;
  max-width: 150px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Info = styled.div`
  padding: 10px 0;

  p {
    margin: 5px 0;
    display: flex;
    align-items: center;

    strong {
      margin-right: 5px;
    }
  }
`;

const SocialLinks = styled.div`
  margin-top: 10px;

  a {
    display: inline-block;
    margin-right: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`;















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


    <Container>
    <Card>
      <ProfilePic src="https://via.placeholder.com/150" alt="Profile" />

    
      <Info>
        <>{aluno.nome && (
            <>
            <p className="text-gray-700"><strong> <span className="font-medium">NOME:</span></strong> {aluno.nome}</p>
            <p className="text-gray-700"><strong> <span className="font-medium">SÉRIE:</span></strong> {aluno.serie}</p>
            </>
          )}
          </>

          <>{aluno.serie && (
            <>
            <p className="text-gray-700"><strong> <span className="font-medium">UNIDADE:</span></strong> {aluno.unidade}</p>
            <p className="text-gray-700"><strong> <span className="font-medium">E-MAIL:</span></strong> {aluno.email}</p>
            </>
          )}
          </>

          <>{aluno.serie && (
            <>
            <p className="text-gray-700"><strong> <span className="font-medium">SENHA EMAIL:</span></strong> {aluno.senha_email}</p>
            <p className="text-gray-700"><strong> <span className="font-medium">SFB</span></strong> {aluno.sfb}</p>
            </>
          )}
          </>

          <>{aluno.serie && (
            <>
            <p className="text-gray-700"><strong> <span className="font-medium">SENHA SFB:</span></strong> {aluno.senha_sfb}</p>
            <p className="text-gray-700"><strong> <span className="font-medium">RICHMOND:</span></strong> {aluno.richmond}</p>
            </>
          )}
          </>

          <>{aluno.serie && (
            <>
            <p className="text-gray-700"><strong> <span className="font-medium">SENHA RICHMOND</span></strong> {aluno.senha_r}</p>
            <p className="text-gray-700"><strong> <span className="font-medium">unidade:</span></strong> {aluno.unidade}</p>
            </>
          )}
          </>


          <>{aluno.serie && (
            <>
            <p className="text-gray-700"><strong> <span className="font-medium">Nome:</span></strong> {aluno.nome}</p>
            <p className="text-gray-700"><strong> <span className="font-medium">unidade:</span></strong> {aluno.unidade}</p>
            </>
          )}
          </>
          
















      </Info>     
  
    </Card>



    <Card>
      <ProfilePic src="https://via.placeholder.com/150" alt="Profile" />

    
      <Info>
        <p>{aluno.serie && (
            <p className="text-gray-700"><strong> <span className="font-medium">Nome:</span></strong> {aluno.nome}</p>
          )}
          </p>
          <p>{aluno.serie && (
            <p className="text-gray-700"><strong> <span className="font-medium">Série:</span></strong> {aluno.serie}</p>
          )}
          </p>
          <p>{aluno.serie && (
            <p className="text-gray-700"><strong> <span className="font-medium">:</span></strong> {aluno.serie}</p>
          )}
          </p>
          <p>{aluno.serie && (
            <p className="text-gray-700"><strong> <span className="font-medium">Série:</span></strong> {aluno.serie}</p>
          )}
          </p>
      </Info>
          
    </Card>
  </Container>

















  
)}