import { useState } from "react"

interface AddStudentModalContentProps {
  onClose: () => void
  onSubmit: (data: { nome: string; matricula: string; email: string }) => void
}

export default function AddStudentModalContent({
  onClose,
  onSubmit,
}: AddStudentModalContentProps) {
  const [nome, setNome] = useState("")
  const [matricula, setMatricula] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ nome, matricula, email })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Adicionar Aluno</h2>

      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Matrícula</label>
        <input
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 rounded border"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-3 py-1 rounded bg-blue-600 text-white"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}
