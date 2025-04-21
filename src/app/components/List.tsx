// components/SmartUserTable.tsx
// Component de Listagem, deve ser reaproveitado para listar alunos ou usuarios (TI,COORDENACAO,DIRECAO)
'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FiChevronLeft } from 'react-icons/fi'
import { FiChevronRight } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'


// Tipagem genérica
type TableColumn<T> = {
  key: keyof T
  label: string
  render?: (value: any, item: T) => React.ReactNode
}


// Props do componente
interface ListProps<T> {
  title: string
  data: T[]
  columns: TableColumn<T>[]
  itemsPerPage?: number
  searchable?: boolean
}



// Componentes estilizados
const TableWrapper = styled.div`
background-color:#c5f0c5;
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
  color: #4682B4;
  margin: 0;
`

const SearchBox = styled.div`
color: #white ;

  position: relative;
  width: 100%;

  @media (min-width: 640px) {
    width: 300px;
  }
`

const SearchInput = styled.input`
background-color: #a2d2fa;
color:white;
 font:white;
  width: 80%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;

  &:focus {
    border-color: #4682B4;
    box-shadow: 0 0 0 3px rgba(60, 141, 188, 0.1);
    outline: none;
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color:#4682B4;
`

const Table = styled.table`
  background-color:#a2d2fa;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
`

const TableHead = styled.thead`
  background-color:#4682B4;;
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

export function List<T extends { id: number | string }>({
  title,
  data,
  columns,
  itemsPerPage = 10,
  searchable = true
}: ListProps<T>) {
  const [filteredData, setFilteredData] = useState<T[]>(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  useEffect(() => {
    const filtered = data.filter(item =>
      columns.some(column => {
        const value = item[column.key]
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    )
    setFilteredData(filtered)
    setCurrentPage(1)
  }, [searchTerm, data, columns])

  // Lógica de paginação
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)



  return (
    <TableWrapper>
      <TableHeader>
        <Title>{title}</Title>
        
        {searchable && (
          <SearchBox>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder={`Buscar ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
        )}
      </TableHeader>

      <Table>
        <TableHead>
          <tr>
            {columns.map(column => (
              <Th key={String(column.key)}>{column.label}</Th>
            ))}
          </tr>
        </TableHead>
        <tbody>
  {currentItems.length > 0 ? (
    currentItems.map((item) => (
      <tr key={item.id}>
        {columns.map(column => (
          <Td key={String(column.key)}> 
            {String(item[column.key as keyof T])} {}   
          </Td>
        ))}
      </tr>
      // acessa dinamicamente via item[column.key as keyof T] cada propriedade de student
    ))
  ) : (
    <tr>
      <Td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
        Nenhum registro encontrado
      </Td>
    </tr>
  )}
</tbody>

      </Table>

      {filteredData.length > itemsPerPage && ( // mostrando aqui a quantidade de alunos presente no banco a partir da func filteddata
        <PaginationContainer>
          <PaginationInfo>
            Mostrando {indexOfFirstItem + 1} a{' '}
            {Math.min(indexOfLastItem, filteredData.length)} de{' '}
            {filteredData.length} registros
          </PaginationInfo>
          
          <PaginationButtons>  
            <PaginationButton
              onClick={() => paginate(currentPage - 1)} // logica de paginacao , de acordo com quantos alunos temos no banco
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
