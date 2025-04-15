// components/SmartUserTable.tsx
'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FiChevronLeft } from 'react-icons/fi'
import { FiChevronRight } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'

type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'Ativo' | 'Inativo' | 'Férias' | 'Afastado'
}

// Componentes estilizados
const TableWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 1px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.05);
  padding: 24px;
  font-family: 'Source Sans Pro', sans-serif;
`

const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`

const SearchBox = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 640px) {
    width: 300px;
  }
`

const SearchInput = styled.input`
  width: 80%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;

  &:focus {
    border-color: #3c8dbc;
    box-shadow: 0 0 0 3px rgba(60, 141, 188, 0.1);
    outline: none;
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
`

const TableHead = styled.thead`
  background-color: #f4f6f9;
`

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #444;
  text-transform: uppercase;
  border-bottom: 2px solid #f4f4f4;
`

const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #444;
  border-bottom: 1px solid #f4f4f4;
`

const StatusBadge = styled.span<{ status: User['status'] }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;

  ${({ status }) => 
    status === 'Ativo' ? `
      background-color: #d4edda;
      color: #155724;
    ` : status === 'Inativo' ? `
      background-color: #f8d7da;
      color: #721c24;
    ` : status === 'Férias' ? `
      background-color: #fff3cd;
      color: #856404;
    ` : `
      background-color: #d1ecf1;
      color: #0c5460;
    `
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

const PaginationInfo = styled.span`
  font-size: 14px;
  color: #666;
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`

const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #ddd;
  background-color: ${({ active }) => active ? '#3c8dbc' : '#fff'};
  color: ${({ active }) => active ? '#fff' : '#444'};

  &:hover:not(:disabled) {
    background-color: ${({ active }) => active ? '#367fa9' : '#f4f4f4'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export function List() {
  // Dados mockados (mesmo do exemplo anterior)
  const allUsers: User[] = [
    {id: 1, name: "João Silva", email: "joao@empresa.com", role: "Desenvolvedor", status: "Ativo"},
    {id: 2, name: "fulano ", email: "joao@empresa.com", role: "Desenvolvedor", status: "Ativo"}
    // ... outros usuários
  ]

  // Estados e lógica idênticos ao exemplo anterior
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const usersPerPage = 10

  useEffect(() => {
    const filtered = allUsers.filter(user =>
      Object.values(user).some(
        val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [searchTerm])

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <TableWrapper>
      <TableHeader>
        <Title>Lista de Usuários</Title>
        
        <SearchBox>
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
      </TableHeader>

      <Table>
        <TableHead>
          <tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Cargo</Th>
            <Th>Status</Th>
          </tr>
        </TableHead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <StatusBadge status={user.status}>
                    {user.status}
                  </StatusBadge>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                Nenhum usuário encontrado
              </Td>
            </tr>
          )}
        </tbody>
      </Table>

      {filteredUsers.length > usersPerPage && (
        <PaginationContainer>
          <PaginationInfo>
            Mostrando {indexOfFirstUser + 1} a{' '}
            {Math.min(indexOfLastUser, filteredUsers.length)} de{' '}
            {filteredUsers.length} registros
          </PaginationInfo>
          
          <PaginationButtons>
            <PaginationButton
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </PaginationButton>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <PaginationButton
                key={number}
                onClick={() => paginate(number)}
                active={currentPage === number}
              >
                {number}
              </PaginationButton>
            ))}
            
            <PaginationButton
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </PaginationButton>
          </PaginationButtons>
        </PaginationContainer>
      )}
    </TableWrapper>
  )
}