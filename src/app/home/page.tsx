"use client"

import { useEffect, useState } from "react";
import { List } from "../components/List";
import SidebarComponent from "../components/Sidebar";
import { fetchStudents } from '../lib/api/services/studentService';

type Student = {
  id: number;
  name: string;
  email: string;
  class: string;
  // Remova o status se não for usar
}

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
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarComponent />
        <div style={{ flex: 1, padding: '20px' }}>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarComponent />
      <div style={{ flex: 1, padding: '20px' }}>
        <List<Student>
          title="Alunos"
          data={students}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Nome' },
            { key: 'email', label: 'E-mail' },
            { key: 'class', label: 'Turma' }
            // Remova completamente o bloco do status
          ]}
        />
      </div>
    </div>
  );
}