"use client"
// aqui onde vamos renderizar a lista de alunos
import { useEffect, useState } from "react";
import { List } from "../components/List";
import SidebarComponent from "../components/Sidebar";
import { fetchStudents } from '../lib/api/services/studentService';
import { Student } from "../lib/types/student";


export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Erro ao carregar alunos");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarComponent />
        <div style={{ flex: 1, padding: '20px' }}>
          <p>Carregando alunos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' ,margin: '0',
      padding: '0',}}>
        <SidebarComponent />
        <div style={{ flex: 1, padding: '20px' }}>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    
    <div style={{ display: 'flex', minHeight: '100vh' , background:'#a2d2fa', marginLeft: '242px', padding: '20px' }}>
     
      <SidebarComponent />
      <div style={{ flex: 1, padding: '10px' , }}>
        <List<Student>
          title="Listagem De Alunos"
          data={students}
          columns={[
            { key: 'id', label: 'Matrícula' },
            { key: 'nome', label: 'nome' },
            { key: 'serie', label: 'serie' },
            { key: 'unidade', label: 'unidade' },
            { key: 'email', label: 'email' },
          
          

            // Remova completamente o bloco do status
          ]}
        />
      </div>
    </div>
  );
}