interface ExportStudentsModalContentProps {
  onClose: () => void
  onExport: (format: "csv" | "xlsx") => void
}

export default function ExportStudentsModalContent({
  onClose,
  onExport,
}: ExportStudentsModalContentProps) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Exportar Alunos</h2>
      <p className="text-sm text-gray-600">
        Selecione o formato para exportar a lista de alunos.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onExport("csv")}
          className="px-3 py-1 rounded bg-green-600 text-white"
        >
          Exportar CSV
        </button>
        <button
          onClick={() => onExport("xlsx")}
          className="px-3 py-1 rounded bg-indigo-600 text-white"
        >
          Exportar XLSX
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 rounded border"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
