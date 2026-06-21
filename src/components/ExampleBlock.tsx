import { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import type { ComponentExample } from '../data/types'

export function ExampleBlock({ example }: { example: ComponentExample }) {
  const [showCode, setShowCode] = useState(false)
  const { Demo } = example

  return (
    <section className="example">
      <div className="example__head">
        <h3>{example.title}</h3>
        {example.description && <p>{example.description}</p>}
      </div>

      <div className={example.stack ? 'example__preview example__preview--stack' : 'example__preview'}>
        <Demo />
      </div>

      <div className="example__actions">
        <button className="ghost-btn" type="button" onClick={() => setShowCode((s) => !s)}>
          {showCode ? 'Ocultar código' : '</> Ver código'}
        </button>
      </div>

      {showCode && <CodeBlock code={example.code} />}
    </section>
  )
}
