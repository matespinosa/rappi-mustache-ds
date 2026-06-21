// @ts-check
/**
 * Generates src/data/props.generated.json by parsing the TypeScript declaration
 * file shipped with @rappi-ds/react. We extract only each component's OWN
 * design-system props (not the hundreds of inherited DOM attributes), together
 * with their JSDoc descriptions and @default values.
 *
 * Run automatically before `dev` / `build` (see package.json), or manually:
 *   node scripts/generate-props.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const DTS = resolve(root, 'node_modules/@rappi-ds/react/dist/index.d.ts')
const OUT = resolve(root, 'src/data/props.generated.json')

/** Maps each exported component to the name of its props interface/type. */
const COMPONENT_PROPS = {
  ThemeProvider: 'ThemeProviderProps',
  Pagination: 'PaginationProps',
  Button: 'ButtonProps',
  IconButton: 'IconButtonProps',
  BadgeNumber: 'BadgeNumberProps',
  BadgeLive: 'BadgeLiveProps',
  Accordion: 'AccordionProps',
  Uploader: 'UploaderProps',
  Tooltip: 'TooltipProps',
  Snackbar: 'SnackbarProps',
  Search: 'SearchProps',
  Tag: 'TagProps',
  Checkbox: 'CheckboxProps',
  Chip: 'ChipProps',
  Radio: 'RadioProps',
  RadioGroup: 'RadioGroupProps',
  Pin: 'PinProps',
  PinSkeleton: 'PinSkeletonProps',
  Toggle: 'ToggleProps',
  Select: 'SelectProps',
  SelectSkeleton: 'SelectSkeletonProps',
  TextFieldPhone: 'TextFieldPhoneProps',
  TextFieldPhoneSkeleton: 'TextFieldPhoneSkeletonProps',
  TextField: 'TextFieldProps',
  TextFieldSkeleton: 'TextFieldSkeletonProps',
  TextArea: 'TextAreaProps',
  TextAreaSkeleton: 'TextAreaSkeletonProps',
  Breadcrumb: 'BreadcrumbProps',
  Tabs: 'TabsProps',
  TabList: 'TabListProps',
  Tab: 'TabProps',
  TabPanel: 'TabPanelProps',
  Notification: 'NotificationProps',
  SegmentedControl: 'SegmentedControlProps',
  SegmentedOption: 'SegmentedOptionProps',
  Calendar: 'CalendarProps',
  Card: 'CardProps',
  CardAction: 'CardActionProps',
  ComboBox: 'ComboBoxProps',
  ComboBoxSkeleton: 'ComboBoxSkeletonProps',
  Dialog: 'DialogProps',
  BottomSheet: 'BottomSheetProps',
  Drawer: 'DrawerProps',
  EmptyState: 'EmptyStateProps',
  CardTable: 'CardTableProps',
  TableCell: 'TableCellProps',
  TableHeaderCell: 'TableHeaderCellProps',
  DataTable: 'DataTableProps',
}

/**
 * Members that live in a referenced type the simple parser doesn't follow
 * (unions, generics). Added by hand so the tables stay complete.
 */
const EXTRA_MEMBERS = {
  ButtonProps: [
    { name: 'startIcon', type: 'ReactNode', required: false, description: 'Icono renderizado a la izquierda del label. Mutuamente excluyente con endIcon.', defaultValue: '' },
    { name: 'endIcon', type: 'ReactNode', required: false, description: 'Icono renderizado a la derecha del label. Mutuamente excluyente con startIcon.', defaultValue: '' },
  ],
}

function fail(msg) {
  console.warn(`[generate-props] ${msg} — escribiendo props vacíos.`)
  if (!existsSync(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, JSON.stringify({}, null, 2) + '\n')
  process.exit(0)
}

if (!existsSync(DTS)) {
  fail(`No se encontró ${DTS} (¿ejecutaste la instalación de dependencias?)`)
}

const source = readFileSync(DTS, 'utf8')

/** Returns the inner text of every top-level { } group inside `s`. */
function topLevelBraceGroups(s) {
  const groups = []
  let depth = 0
  let start = -1
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '{') {
      if (depth === 0) start = i + 1
      depth++
    } else if (c === '}') {
      depth--
      if (depth === 0 && start !== -1) {
        groups.push(s.slice(start, i))
        start = -1
      }
    }
  }
  return groups
}

/** Extracts the declaration substring for an interface or type alias by name. */
function findDeclaration(name) {
  const iface = new RegExp(`\\binterface\\s+${name}\\b`)
  const talias = new RegExp(`\\btype\\s+${name}\\s*=`)
  let m = source.match(iface)
  if (m && m.index != null) {
    // From the keyword, capture through the matching closing brace of the body.
    let i = source.indexOf('{', m.index)
    if (i === -1) return { kind: 'interface', text: source.slice(m.index, m.index + 200), heritage: '' }
    const heritage = source.slice(source.indexOf(name, m.index) + name.length, i)
    let depth = 0
    let j = i
    for (; j < source.length; j++) {
      if (source[j] === '{') depth++
      else if (source[j] === '}') {
        depth--
        if (depth === 0) { j++; break }
      }
    }
    return { kind: 'interface', text: source.slice(i, j), heritage }
  }
  m = source.match(talias)
  if (m && m.index != null) {
    // Find the terminating `;` at brace/paren/bracket depth 0 — member `;`
    // inside object literals must not end the declaration.
    let depth = 0
    let j = source.indexOf('=', m.index) + 1
    for (; j < source.length; j++) {
      const c = source[j]
      if (c === '{' || c === '(' || c === '[') depth++
      else if (c === '}' || c === ')' || c === ']') depth--
      else if (c === ';' && depth === 0) break
    }
    return { kind: 'type', text: source.slice(m.index, j), heritage: '' }
  }
  return null
}

/** Parses members out of the inner text of a single { } literal block. */
function parseMembers(inner) {
  const members = []
  let i = 0
  let depth = 0
  let buf = ''
  let pendingDoc = ''

  const flush = () => {
    const stmt = buf.trim()
    buf = ''
    const doc = pendingDoc
    pendingDoc = ''
    if (!stmt) return
    const m = stmt.match(
      /^(?:readonly\s+)?(?:(['"])([^'"]+)\1|([A-Za-z_$][\w$-]*))(\?)?\s*:\s*([\s\S]+)$/
    )
    if (!m) return
    const name = m[2] ?? m[3]
    if (!name) return
    const optional = Boolean(m[4])
    const type = m[5].replace(/\s+/g, ' ').trim().replace(/;$/, '')
    const { description, defaultValue } = cleanDoc(doc)
    members.push({ name, type, required: !optional, description, defaultValue })
  }

  while (i < inner.length) {
    // JSDoc block
    if (inner.startsWith('/**', i)) {
      const end = inner.indexOf('*/', i)
      const block = inner.slice(i + 3, end === -1 ? undefined : end)
      pendingDoc = block
      i = end === -1 ? inner.length : end + 2
      continue
    }
    // line comment
    if (inner.startsWith('//', i)) {
      const nl = inner.indexOf('\n', i)
      i = nl === -1 ? inner.length : nl + 1
      continue
    }
    const c = inner[i]
    if (c === '{' || c === '(' || c === '[') depth++
    else if (c === '}' || c === ')' || c === ']') depth--
    if (c === ';' && depth === 0) {
      flush()
      i++
      continue
    }
    buf += c
    i++
  }
  flush()
  return members
}

/** Turns a raw JSDoc block into a clean description + extracted default value. */
function cleanDoc(raw) {
  if (!raw) return { description: '', defaultValue: '' }
  const lines = raw
    .split('\n')
    .map((l) => l.replace(/^\s*\*?\s?/, '').trimEnd())
  let defaultValue = ''
  const kept = []
  for (const line of lines) {
    const at = line.match(/@default\s+(.+)/)
    if (at) {
      defaultValue = at[1].trim().replace(/^[`'"]|[`'"]$/g, '')
      continue
    }
    if (line.startsWith('@')) continue // drop other jsdoc tags (@example, @param…)
    kept.push(line)
  }
  let description = kept.join(' ').replace(/\s+/g, ' ').trim()
  if (!defaultValue) {
    // Only trust an inline default when it is backticked, quoted, or follows a
    // colon — otherwise prose like "default icon" produces false positives.
    const inline =
      description.match(/Defaults?(?:\s+to)?:?\s*`([^`]+)`/i) ||
      description.match(/Defaults?(?:\s+to)?:?\s*"([^"]+)"/i) ||
      description.match(/Defaults?(?:\s+to)?:?\s*'([^']+)'/i) ||
      description.match(/Defaults?(?:\s+to)?:\s*([\w-]+)/i)
    if (inline) defaultValue = inline[1].trim().replace(/^['"]|['"]$/g, '')
  }
  return { description, defaultValue }
}

const visited = new Set()

function membersFor(typeName) {
  if (visited.has(typeName)) return []
  visited.add(typeName)
  const decl = findDeclaration(typeName)
  if (!decl) return []
  const groups = topLevelBraceGroups(decl.text)
  let members = groups.flatMap(parseMembers)

  // Follow `extends` into LOCAL interfaces (e.g. TableCellContentProps).
  if (decl.kind === 'interface' && decl.heritage) {
    const bases = decl.heritage
      .replace(/^.*extends/, '')
      .split(',')
      .map((b) => b.trim().replace(/<[\s\S]*$/, '').trim())
      .filter(Boolean)
    for (const base of bases) {
      if (/^[A-Z][\w]*$/.test(base) && new RegExp(`\\binterface\\s+${base}\\b`).test(source)) {
        members = members.concat(membersFor(base))
      }
    }
  }

  if (EXTRA_MEMBERS[typeName]) members = members.concat(EXTRA_MEMBERS[typeName])

  // de-dupe by name, keeping the first (most specific) occurrence
  const seen = new Set()
  return members.filter((m) => (seen.has(m.name) ? false : seen.add(m.name)))
}

const result = {}
for (const [component, propsType] of Object.entries(COMPONENT_PROPS)) {
  visited.clear()
  result[component] = membersFor(propsType)
}

if (!existsSync(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n')

const summary = Object.entries(result)
  .map(([k, v]) => `${k}(${v.length})`)
  .join(' ')
console.log(`[generate-props] ${Object.keys(result).length} componentes → ${OUT}`)
console.log(`[generate-props] ${summary}`)
