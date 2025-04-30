// src/app/alunos/[matricula]/page.tsx
'use client'

import { fetchStudentByMatricula } from '@/app/lib/api/services/studentService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Student } from '@/app/lib/types/student';
import styled from 'styled-components';
import { FiExternalLink } from 'react-icons/fi';


const AccessLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  color: blue;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  svg {
    margin-right: 4px;
  }
`;

const Container = styled.div`
background:rgb(237, 227, 227);  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  width: 600px;
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  background: linear-gradient(90deg,rgba(76, 160, 194, 1) 0%, rgba(132, 219, 168, 1) 50%);
  box-shadow: 10px 10px 20px #ebebeb, -10px -10px 20px #ffffff;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProfilePic = styled.img`
  width: 40%;
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



const InfoSection = styled.div<{ title?: string }>`
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;

  &::before {
    content: "${props => props.title || ''}";
    display: inline-block;
    font-weight: bold;
    color: #555;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <InfoItemContainer>
    <Label>{label}:</Label>
    <Value>{value}</Value>
  </InfoItemContainer>
);

const InfoItemContainer = styled.div`
  display: flex;
  margin: 0.3rem 0;
  align-items: baseline;
`;

const Label = styled.span`
  font-weight: 600;
  color: #444;
  min-width: 120px;
  font-size: 0.8rem;
`;

const Value = styled.span`
  color: #333;
  word-break: break-word;
  flex-grow: 1;

`










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
  <ProfilePic src="https://cdn-icons-png.flaticon.com/512/4196/4196591.png" alt="Profile" />
  
  <Info>
    {/* Seção Principal */}
    <InfoSection>
      <SectionHeader>
  
      </SectionHeader>
      {aluno.nome && <InfoItem label="NOME" value={aluno.nome} />}
      {aluno.serie && <InfoItem label="SÉRIE" value={aluno.serie} />}
      {aluno.unidade && <InfoItem label="UNIDADE" value={aluno.unidade} />}
    </InfoSection>

    {/* E-mail */}
    <InfoSection>
      <SectionHeader>
        <span>E-MAIL</span>
        <AccessLink href={aluno.email ? `mailto:${aluno.email}` : '#'}>
          <FiExternalLink /> ACESSE AQUI
        </AccessLink>
      </SectionHeader>
      {aluno.email && <InfoItem label="E-MAIL" value={aluno.email} />}
      {aluno.senha_email && <InfoItem label="SENHA" value="••••••••" />}
    </InfoSection>

    {/* SFB */}
    <InfoSection>
      <SectionHeader>
        <span>SFB</span>
        <AccessLink href="#" onClick={() => window.open('https://www.sfb.com.br', '_blank')}>
          <FiExternalLink /> ACESSE AQUI
        </AccessLink>
      </SectionHeader>
      {aluno.sfb && <InfoItem label="USUÁRIO" value={aluno.sfb} />}
      {aluno.senha_sfb && <InfoItem label="SENHA" value="••••••••" />}
    </InfoSection>

    {/* Adicione as outras seções seguindo o mesmo padrão */}
    <InfoSection>
      <SectionHeader>
        <span>RICHMOND</span>
        <AccessLink href="#" onClick={() => window.open('https://www.richmond.com.br', '_blank')}>
          <FiExternalLink /> ACESSE AQUI
        </AccessLink>
      </SectionHeader>
      {aluno.richmond && <InfoItem label="USUÁRIO" value={aluno.richmond} />}
      {aluno.senha_r && <InfoItem label="SENHA" value="••••••••" />}
    </InfoSection>


    <InfoSection>
      <SectionHeader>
        <span>ARVORE</span>
        <AccessLink href="#" onClick={() => window.open('https://www.richmond.com.br', '_blank')}>
          <FiExternalLink /> ACESSE AQUI
        </AccessLink>
      </SectionHeader>
      {aluno.richmond && <InfoItem label="USUÁRIO" value={aluno.richmond} />}
      {aluno.senha_r && <InfoItem label="SENHA" value="••••••••" />}
    </InfoSection>

    <InfoSection>
      <SectionHeader>
        <span>EVOLUCIONAL</span>
        <AccessLink href="#" onClick={() => window.open('https://www.richmond.com.br', '_blank')}>
          <FiExternalLink /> ACESSE AQUI
        </AccessLink>
      </SectionHeader>
      {aluno.richmond && <InfoItem label="USUÁRIO" value={aluno.richmond} />}
      {aluno.senha_r && <InfoItem label="SENHA" value="••••••••" />}
    </InfoSection>

    <InfoSection>
      <SectionHeader>
        <span>MEDALHEI</span>
        <AccessLink href="#" onClick={() => window.open('https://www.richmond.com.br', '_blank')}>
          <FiExternalLink /> ACESSE AQUI
        </AccessLink>
      </SectionHeader>
      {aluno.richmond && <InfoItem label="USUÁRIO" value={aluno.richmond} />}
      {aluno.senha_r && <InfoItem label="SENHA" value="••••••••" />}
    </InfoSection>

    
    






  </Info>
</Card>


  </Container>

















  
)}