import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@rappi-ds/react'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="content">
      <EmptyState
        size="lg"
        title="Página no encontrada"
        description="El componente o la ruta que buscas no existe en el portal."
        actionLabel="Ir al inicio"
        onAction={() => navigate('/')}
      />
    </div>
  )
}
