// components/ModalContent.tsx
'use client'

import styled from 'styled-components'
import { ReactNode } from 'react'

// Estilo base
const Wrapper = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`

// Props para poder receber children dinâmicos
interface ModalContentProps {
  children: ReactNode
}

// Componente exportado
export default function ModalContent({ children }: ModalContentProps) {
  return <Wrapper>{children}</Wrapper>
}
