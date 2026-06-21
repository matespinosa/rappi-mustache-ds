import { useParams } from 'react-router-dom'
import { Tag } from '@rappi-ds/react'
import { getComponent } from '../data/registry'
import { ExampleBlock } from '../components/ExampleBlock'
import { PropsTable } from '../components/PropsTable'
import { CodeBlock } from '../components/CodeBlock'
import { NotFoundPage } from './NotFoundPage'

export function ComponentPage() {
  const { slug } = useParams()
  const doc = slug ? getComponent(slug) : undefined

  if (!doc) return <NotFoundPage />

  const importNames = doc.importNames ?? [doc.name]
  const propsKeys = doc.propsKeys ?? [doc.name]
  const importLine = `import { ${importNames.join(', ')} } from '@rappi-ds/react'`

  return (
    <div className="content">
      <div className="page-head">
        <div className="page-head__eyebrow">
          <Tag intent="info" variant="pastel" size="sm">
            {doc.category}
          </Tag>
        </div>
        <h1 className="page-title">{doc.name}</h1>
        <p className="page-lead">{doc.description}</p>
      </div>

      <div style={{ marginTop: 18 }}>
        <CodeBlock standalone code={importLine} />
      </div>

      <h2 className="section-title">Ejemplos</h2>
      {doc.examples.map((example, i) => (
        <ExampleBlock key={i} example={example} />
      ))}

      {doc.notes && doc.notes.length > 0 && (
        <>
          <h2 className="section-title">Notas de uso</h2>
          <ul className="notes">
            {doc.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </>
      )}

      <h2 className="section-title">Props</h2>
      {propsKeys.map((key) => (
        <div key={key} style={{ marginBottom: 24 }}>
          {propsKeys.length > 1 && (
            <h3 style={{ fontSize: 15, margin: '0 0 10px', fontWeight: 600 }}>
              <code>{key}</code>
            </h3>
          )}
          <PropsTable component={key} />
        </div>
      ))}
    </div>
  )
}
