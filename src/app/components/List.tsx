
// Component de Listagem, deve ser reaproveitado para listar alunos ou usuarios (TI,COORDENACAO,DIRECAO)
'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FiChevronLeft, FiSend } from 'react-icons/fi'
import { FiChevronRight } from 'react-icons/fi'
import { FiSearch, FiPlus , FiDownload, FiUpload , FiCreditCard} from 'react-icons/fi'
import { handleDownloadStudents,fetchStudents,uploadStudentSpreadsheet,downloadSpreadsheetTemplate } from '../lib/api/services/studentService'
import Link from 'next/link'
import Modal from './Modal'
import { Student } from '../lib/types/student'

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


const StudentNameLink = styled.div` // Mudamos de 'a' para 'div'
  color: white;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
  display: inline;

  &:hover {
    color: #c5e3f6;
    text-decoration: underline;
  }
`;
// Componentes estilizados
const TableWrapper = styled.div`
background-color:#1e0f26;
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
    border-color: #SearchInput;
    box-shadow: 0 0 0 3px rgba(60, 141, 188, 0.1);
    outline: none;
  }
`

const SearchIcon = styled.span`
  color:black;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
`

const Table = styled.table`
  background-color:#1e0f26;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
`

const TableHead = styled.thead`
color:white;
background-color:black ;

`

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  border-bottom: 2px solid #f4f4f4;
`

const Td = styled.td`
text-shadow: 1px 1px 1px #374151;
  padding: 12px 16px;
  font-size: 14px;
  color: white;
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
const DataContainer = styled.div`
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  backdrop-filter: blur(10px); /* Efeito vidro fosco */
  border: 1px solid rgba(255, 255, 255, 0.25); /* Borda branca suave */
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra escura para profundidade */

  /* Hover */
  &:hover {
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
    background-color: rgba(128, 0, 128, 0.25); /* Intensifica o roxo translúcido */
  }
`;

const FileInputContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  
  /* Esconde o input original */
  input[type="file"] {
    display: none;
  }
`;

// Componente que usa o estilo
const FileUploadButton = styled(DataContainer)`
  /* Pode adicionar estilos específicos se necessário */
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Modalcontent = styled.div`
  justify-content:space-between;
  display:flex;
  align-items:center;
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
}
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
  const [isDownloading, setIsDownloading] = useState(false);

const handleDownloadClick = async () => {
  setIsDownloading(true);
  try {
    await handleDownloadStudents();
  } catch (error) {
    console.error("Falha no download:", error);
    // Adicione aqui seu tratamento de erro (toast, alert, etc)
  } finally {
    setIsDownloading(false);
  }
};

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);







  const handleUpload = async (file: File) => {

    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
    setUploadError('Por favor, envie um arquivo .xlsx, .xls ou .csv');
    return;
  }

  // Validação de tamanho (exemplo: 5MB)
  if (file.size > 5 * 1024 * 1024) {
    setUploadError('O arquivo é muito grande (máximo 5MB)');
    return;
  }
    setIsUploading(true);
    setUploadError(null);
    
    try {
      await uploadStudentSpreadsheet(file);
      setUploadSuccess(true);
      // Atualizar lista de alunos após upload bem-sucedido
      const updatedStudents = await fetchStudents();
      setStudents(updatedStudents);
      // Fechar modal após 2 segundos
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error:any) {
      setUploadError(error.message);
    const validExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
    // Validações do arquivo
    if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
      setUploadError('Por favor, envie um arquivo .xlsx, .xls ou .csv');
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('O arquivo é muito grande (máximo 5MB)');
      return;
    }
  
    setIsUploading(true);
    setUploadError(null);
  
    try {
      await uploadStudentSpreadsheet(file);
      setUploadSuccess(true);
      
      // Atualize a lista de alunos se necessário
      setTimeout(() => {
        setIsModalOpen(false);
        setUploadSuccess(false);
      }, 2000);
      
    } catch (error: any) {
      setUploadError(error.message || 'Erro ao enviar planilha');
    } finally {
      setIsUploading(false);
    }
  };



  const handleDownloadTemplate = async () => {
    setIsDownloading(true);
    try {
      await downloadSpreadsheetTemplate();
    } catch (error) {
      console.error('Erro ao baixar modelo:', error);
      alert('Erro ao baixar modelo');
    } finally {
      setIsDownloading(false);
    }
  };











  return (
    <TableWrapper>
    <TableHeader>         
      <DataContainer>
        <FiCreditCard size={24} style={{ marginRight: '10px' }} />
        Importar Cards
      </DataContainer>

      <DataContainer onClick={handleDownloadClick}>
        <FiDownload size={24} style={{ marginRight: '10px' }} />
        {isDownloading ? 'Gerando arquivo...' : 'Importar planilha'}
      </DataContainer>

      <DataContainer>
        <FiPlus size={24} style={{ marginRight: '10px' }} />
        Adicionar Aluno
      </DataContainer>
      
      <DataContainer onClick={() => setIsModalOpen(true)}>
        
        <FiUpload size={24} style={{ marginRight: '10px',}} />
        Exportar alunos
      </DataContainer>
      
      <Modal 
      isOpen={isModalOpen}
      onClose={() => {
      setIsModalOpen(false);
      setSelectedFile(null);
      setUploadSuccess(false);
      setUploadError(null);
      }}
      title="Upload de Planilha"
      >

<Modalcontent>
  <DataContainer onClick={handleDownloadTemplate}>
    <FiDownload size={20} style={{ marginRight: '10px' }} />
    {isDownloading ? 'Gerando arquivo...' : 'Modelo De Planilha'}
  </DataContainer>

  {uploadSuccess ? (
    <div style={{ color: 'green' }}>
      ✅ Planilha enviada com sucesso!
    </div>
  ) : (
    <>
      <FileInputContainer>
        <FileUploadButton>
          <FiUpload size={20} style={{ marginRight: '8px' }} />
          {selectedFile ? selectedFile.name : 'Escolher arquivo'}
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
          />
        </FileUploadButton>
      </FileInputContainer>

      {uploadError && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          ❌ {uploadError}
        </div>
      )}

      <DataContainer 
        onClick={() => selectedFile && handleUpload(selectedFile)}
        aria-disabled={!selectedFile}
        style={{
          opacity: selectedFile ? 1 : 0.6,
          cursor: selectedFile ? 'pointer' : 'not-allowed',
          pointerEvents: !selectedFile ? 'none' : 'auto',
          marginTop: '10px'
        }}
      >
        <FiSend size={20} style={{ marginRight: '10px' }} />
        Enviar Planilha
      </DataContainer>
    </>
  )}
</Modalcontent>


</Modal>

 
        
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
      <tr key={item.id} >
        {columns.map(column => (
       <Td key={String(column.key) }  title="Vizualizar Card">
       {column.key === 'nome' ? (
         <Link href={`/alunos/${item.id}`} passHref legacyBehavior>
           <StudentNameLink>
             {String(item[column.key as keyof T])}
           </StudentNameLink>
         </Link>
       ) : (
         <div>{String(item[column.key as keyof T])}</div>
       )}
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

      {filteredData.length > itemsPerPage && (
  <PaginationContainer>
    <PaginationInfo>
      Mostrando {indexOfFirstItem + 1} a{' '}
      {Math.min(indexOfLastItem, filteredData.length)} de{' '}
      {filteredData.length} registros
    </PaginationInfo>
    
    <PaginationButtons>  
      <PaginationButton
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </PaginationButton>
      
      {/* Lógica para mostrar apenas um intervalo de páginas */}
      {(() => {
        const maxVisiblePages = 10; // Quantidade máxima de páginas visíveis
        let startPage: number, endPage;
        
        if (totalPages <= maxVisiblePages) {
          // Se tiver menos páginas que o máximo, mostra todas
          startPage = 1;
          endPage = totalPages;
        } else {
          // Calcula o intervalo de páginas para mostrar
          const half = Math.floor(maxVisiblePages / 2);
          if (currentPage <= half) {
            startPage = 1;
            endPage = maxVisiblePages;
          } else if (currentPage + half >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
          } else {
            startPage = currentPage - half;
            endPage = currentPage + half;
          }
        }
        
        // Renderiza os botões de página no intervalo calculado
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((number) => (
          <PaginationButton
            key={number}
            onClick={() => paginate(number)}
            active={currentPage === number}
          >
            {number}
          </PaginationButton>
        ));
      })()}
      
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
  )}