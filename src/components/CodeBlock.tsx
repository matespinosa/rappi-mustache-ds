import { useState } from 'react'

interface CodeBlockProps {
  code: string
  /** Adds a rounded border when the block stands on its own (not under a preview). */
  standalone?: boolean
}

export function CodeBlock({ code, standalone = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div className={standalone ? 'code code--standalone' : 'code'}>
      <button className="code__copy" type="button" onClick={copy}>
        {copied ? 'Copiado ✓' : 'Copiar'}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
