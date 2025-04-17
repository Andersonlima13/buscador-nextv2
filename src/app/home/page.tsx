import React, { useEffect, useState } from "react";
import {List }   from "../components/List";
import SidebarComponent from "../components/Sidebar";
import { fetchStudents } from '@/lib/api/services/studentService'

type Student = {
  id: number
  name: string
  email: string
  class: string
}



export default function home() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    fetchStudents().then(setStudents)
  }, [])
  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh'
    }}>
      <SidebarComponent />
      <div style={{ 
        flex: 1,
        padding: '20px'
      }}>
         <List<Student>
      title="Alunos"
      data={students}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'E-mail' },
        { key: 'class', label: 'Turma' },
      ]}
    />
      </div>
    </div>
  );
}