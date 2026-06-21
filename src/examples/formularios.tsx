import { useState } from 'react'
import {
  TextField,
  TextArea,
  TextFieldPhone,
  Search,
  Select,
  ComboBox,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  Pin,
  Uploader,
} from '@rappi-ds/react'
import type { TextFieldPhoneCountry } from '@rappi-ds/react'
import { Mail, Eye } from '@rappi-ds/icons'
import type { ComponentDoc } from '../data/types'

const phoneCountries: readonly TextFieldPhoneCountry[] = [
  { code: 'CO', callingCode: '+57', name: 'Colombia' },
  { code: 'MX', callingCode: '+52', name: 'México' },
  { code: 'BR', callingCode: '+55', name: 'Brasil' },
]

export const formulariosDocs: ComponentDoc[] = [
  {
    slug: 'text-field',
    name: 'TextField',
    category: 'Formularios',
    description:
      'Campo de texto de una línea con label obligatorio, texto de ayuda, mensaje de error, adornos al inicio o al final y los estados nativos (disabled, readOnly).',
    notes: [
      'El prop label es obligatorio; usa visuallyHiddenLabel si necesitas ocultarlo visualmente.',
      'Pasar error activa el estado inválido y reemplaza al helperText.',
    ],
    examples: [
      {
        title: 'Con texto de ayuda',
        stack: true,
        description: 'Campo controlado con un adorno de icono al inicio y texto de ayuda.',
        code: `const [email, setEmail] = useState('')

<TextField
  label="Correo electrónico"
  placeholder="tu@correo.com"
  startAdornment={<Mail />}
  helperText="Usaremos este correo para tu cuenta"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
        Demo: function TextFieldHelperDemo() {
          const [email, setEmail] = useState('')
          return (
            <TextField
              label="Correo electrónico"
              placeholder="tu@correo.com"
              startAdornment={<Mail />}
              helperText="Usaremos este correo para tu cuenta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )
        },
      },
      {
        title: 'Estado de error',
        stack: true,
        code: `const [pass, setPass] = useState('123')

<TextField
  label="Contraseña"
  type="password"
  fieldSize="sm"
  endAdornment={<Eye />}
  error="Debe tener al menos 8 caracteres"
  value={pass}
  onChange={(e) => setPass(e.target.value)}
/>`,
        Demo: function TextFieldErrorDemo() {
          const [pass, setPass] = useState('123')
          return (
            <TextField
              label="Contraseña"
              type="password"
              fieldSize="sm"
              endAdornment={<Eye />}
              error="Debe tener al menos 8 caracteres"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          )
        },
      },
    ],
  },
  {
    slug: 'text-area',
    name: 'TextArea',
    category: 'Formularios',
    description:
      'Entrada de texto multilínea con label obligatorio, texto de ayuda, mensaje de error y un botón de limpieza opcional.',
    examples: [
      {
        title: 'Con ayuda y limpieza',
        stack: true,
        description: 'TextArea controlado que muestra un botón × para limpiar cuando hay contenido.',
        code: `const [nota, setNota] = useState('')

<TextArea
  label="Comentarios"
  placeholder="Cuéntanos cómo fue tu experiencia"
  helperText="Máximo 280 caracteres"
  rows={4}
  value={nota}
  onChange={(e) => setNota(e.target.value)}
  onClear={() => setNota('')}
/>`,
        Demo: function TextAreaDemo() {
          const [nota, setNota] = useState('')
          return (
            <TextArea
              label="Comentarios"
              placeholder="Cuéntanos cómo fue tu experiencia"
              helperText="Máximo 280 caracteres"
              rows={4}
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              onClear={() => setNota('')}
            />
          )
        },
      },
    ],
  },
  {
    slug: 'text-field-phone',
    name: 'TextFieldPhone',
    category: 'Formularios',
    description:
      'Campo de teléfono internacional con un selector de país nativo, label accesible, texto de ayuda, validación y acción de limpieza opcional.',
    notes: [
      'Requiere countries, countryCode y label; el valor y el país se controlan por separado.',
    ],
    examples: [
      {
        title: 'Selector de país controlado',
        stack: true,
        code: `const countries = [
  { code: 'CO', callingCode: '+57', name: 'Colombia' },
  { code: 'MX', callingCode: '+52', name: 'México' },
  { code: 'BR', callingCode: '+55', name: 'Brasil' },
]

const [phone, setPhone] = useState('')
const [country, setCountry] = useState('CO')

<TextFieldPhone
  label="Teléfono"
  countries={countries}
  countryCode={country}
  value={phone}
  helperText="Te enviaremos un código de verificación"
  clearable
  onChange={(e) => setPhone(e.target.value)}
  onCountryChange={(c) => setCountry(c.code)}
  onClear={() => setPhone('')}
/>`,
        Demo: function TextFieldPhoneDemo() {
          const [phone, setPhone] = useState('')
          const [country, setCountry] = useState('CO')
          return (
            <TextFieldPhone
              label="Teléfono"
              countries={phoneCountries}
              countryCode={country}
              value={phone}
              helperText="Te enviaremos un código de verificación"
              clearable
              onChange={(e) => setPhone(e.target.value)}
              onCountryChange={(c) => setCountry(c.code)}
              onClear={() => setPhone('')}
            />
          )
        },
      },
    ],
  },
  {
    slug: 'search',
    name: 'Search',
    category: 'Formularios',
    description:
      'Campo de búsqueda con icono, botón de limpieza y un modo opcional con flecha de retroceso para pantallas anidadas. Disponible en tamaños lg y sm.',
    examples: [
      {
        title: 'Búsqueda controlada',
        stack: true,
        description: 'El botón × aparece cuando hay texto; en modo controlado tú reinicias el valor.',
        code: `const [q, setQ] = useState('')

<Search
  size="lg"
  placeholder="Buscar restaurantes"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onClear={() => setQ('')}
/>
<Search
  size="sm"
  showBackButton
  placeholder="Buscar en el menú"
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onBack={() => setQ('')}
/>`,
        Demo: function SearchDemo() {
          const [q, setQ] = useState('')
          return (
            <>
              <Search
                size="lg"
                placeholder="Buscar restaurantes"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onClear={() => setQ('')}
              />
              <Search
                size="sm"
                showBackButton
                placeholder="Buscar en el menú"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onBack={() => setQ('')}
              />
            </>
          )
        },
      },
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Formularios',
    description:
      'Select accesible de selección única con label, placeholder, texto de ayuda, estado de error e indicador de selección opcional (check, radio o checkbox).',
    examples: [
      {
        title: 'Selección única',
        stack: true,
        code: `const options = [
  { value: 'comida', label: 'Comida' },
  { value: 'mercado', label: 'Mercado' },
  { value: 'farmacia', label: 'Farmacia' },
]

const [cat, setCat] = useState('')

<Select
  label="Categoría"
  placeholder="Elige una categoría"
  options={options}
  value={cat}
  onChange={setCat}
  helperText="Filtra los pedidos por categoría"
  selectionIndicator="check"
/>`,
        Demo: function SelectDemo() {
          const options = [
            { value: 'comida', label: 'Comida' },
            { value: 'mercado', label: 'Mercado' },
            { value: 'farmacia', label: 'Farmacia' },
          ]
          const [cat, setCat] = useState('')
          return (
            <Select
              label="Categoría"
              placeholder="Elige una categoría"
              options={options}
              value={cat}
              onChange={setCat}
              helperText="Filtra los pedidos por categoría"
              selectionIndicator="check"
            />
          )
        },
      },
    ],
  },
  {
    slug: 'combo-box',
    name: 'ComboBox',
    category: 'Formularios',
    description:
      'Entrada de texto que filtra una lista de opciones y admite selección múltiple. A diferencia de Select, el disparador es un input editable que abre y filtra al escribir.',
    notes: ['El valor es un arreglo de strings: selección múltiple.'],
    examples: [
      {
        title: 'Selección múltiple',
        stack: true,
        code: `const options = [
  { value: 'co', label: 'Colombia' },
  { value: 'mx', label: 'México' },
  { value: 'br', label: 'Brasil' },
  { value: 'ar', label: 'Argentina' },
]

const [paises, setPaises] = useState<string[]>([])

<ComboBox
  label="Países"
  placeholder="Busca y selecciona"
  options={options}
  value={paises}
  onChange={setPaises}
  helperText="Puedes elegir más de uno"
  clearable
/>`,
        Demo: function ComboBoxDemo() {
          const options = [
            { value: 'co', label: 'Colombia' },
            { value: 'mx', label: 'México' },
            { value: 'br', label: 'Brasil' },
            { value: 'ar', label: 'Argentina' },
          ]
          const [paises, setPaises] = useState<string[]>([])
          return (
            <ComboBox
              label="Países"
              placeholder="Busca y selecciona"
              options={options}
              value={paises}
              onChange={setPaises}
              helperText="Puedes elegir más de uno"
              clearable
            />
          )
        },
      },
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Formularios',
    description:
      'Checkbox nativo con soporte para el estado indeterminado. Es un primitivo: se compone con un <label> y la lógica de negocio vive en el callsite.',
    examples: [
      {
        title: 'Estados',
        stack: true,
        description: 'Normal, marcado, indeterminado y deshabilitado, cada uno dentro de su label.',
        code: `const [acepta, setAcepta] = useState(false)

<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Checkbox checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
  Acepto los términos
</label>
<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Checkbox checked readOnly />
  Marcado
</label>
<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Checkbox indeterminate readOnly />
  Indeterminado
</label>
<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Checkbox disabled />
  Deshabilitado
</label>`,
        Demo: function CheckboxDemo() {
          const [acepta, setAcepta] = useState(false)
          return (
            <>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Checkbox checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
                Acepto los términos
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Checkbox checked readOnly />
                Marcado
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Checkbox indeterminate readOnly />
                Indeterminado
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Checkbox disabled />
                Deshabilitado
              </label>
            </>
          )
        },
      },
    ],
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    category: 'Formularios',
    importNames: ['Radio', 'RadioGroup'],
    propsKeys: ['RadioGroup', 'Radio'],
    description:
      'Fieldset semántico para un conjunto de radios relacionados. RadioGroup aporta el name compartido y una legend accesible; cada Radio es un input nativo dentro de su label.',
    examples: [
      {
        title: 'Opciones mutuamente excluyentes',
        stack: true,
        code: `const [pago, setPago] = useState('tarjeta')

<RadioGroup legend="Método de pago" name="pago">
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <Radio value="tarjeta" checked={pago === 'tarjeta'} onChange={(e) => setPago(e.target.value)} />
    Tarjeta de crédito
  </label>
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <Radio value="efectivo" checked={pago === 'efectivo'} onChange={(e) => setPago(e.target.value)} />
    Efectivo
  </label>
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <Radio value="rappipay" checked={pago === 'rappipay'} onChange={(e) => setPago(e.target.value)} />
    RappiPay
  </label>
</RadioGroup>`,
        Demo: function RadioGroupDemo() {
          const [pago, setPago] = useState('tarjeta')
          return (
            <RadioGroup legend="Método de pago" name="pago">
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Radio
                  value="tarjeta"
                  checked={pago === 'tarjeta'}
                  onChange={(e) => setPago(e.target.value)}
                />
                Tarjeta de crédito
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Radio
                  value="efectivo"
                  checked={pago === 'efectivo'}
                  onChange={(e) => setPago(e.target.value)}
                />
                Efectivo
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Radio
                  value="rappipay"
                  checked={pago === 'rappipay'}
                  onChange={(e) => setPago(e.target.value)}
                />
                RappiPay
              </label>
            </RadioGroup>
          )
        },
      },
    ],
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    category: 'Formularios',
    description:
      'Interruptor que se renderiza como <button role="switch"> para soporte nativo de teclado y lectores de pantalla. No tiene onChange: se alterna con el onClick del botón.',
    notes: ['Disponible en tres tamaños: sm, md y lg.'],
    examples: [
      {
        title: 'Tamaños y estado',
        stack: true,
        description: 'El primer toggle es controlado; los demás muestran los tres tamaños.',
        code: `const [on, setOn] = useState(true)

<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Toggle size="sm" checked={on} onClick={() => setOn((v) => !v)} />
  Notificaciones
</label>
<Toggle size="md" checked={on} onClick={() => setOn((v) => !v)} />
<Toggle size="lg" checked={on} onClick={() => setOn((v) => !v)} />`,
        Demo: function ToggleDemo() {
          const [on, setOn] = useState(true)
          return (
            <>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Toggle size="sm" checked={on} onClick={() => setOn((v) => !v)} />
                Notificaciones
              </label>
              <Toggle size="md" checked={on} onClick={() => setOn((v) => !v)} />
              <Toggle size="lg" checked={on} onClick={() => setOn((v) => !v)} />
            </>
          )
        },
      },
    ],
  },
  {
    slug: 'pin',
    name: 'Pin',
    category: 'Formularios',
    description:
      'Entrada de PIN o código de un solo uso que se muestra como celdas individuales pero conserva un único input nativo para pegado, autocompletado, teclado y lectores de pantalla.',
    examples: [
      {
        title: 'Código de 4 dígitos',
        stack: true,
        code: `const [code, setCode] = useState('')

<Pin
  label="Código de verificación"
  length={4}
  value={code}
  onValueChange={setCode}
  onComplete={() => {}}
/>`,
        Demo: function PinDemo() {
          const [code, setCode] = useState('')
          return (
            <Pin
              label="Código de verificación"
              length={4}
              value={code}
              onValueChange={setCode}
              onComplete={() => {}}
            />
          )
        },
      },
    ],
  },
  {
    slug: 'uploader',
    name: 'Uploader',
    category: 'Formularios',
    description:
      'Zona de carga de archivos con estados visuales: no-upload, drop, loading (con barra de progreso), uploaded y error. Componente presentacional controlado desde el callsite.',
    examples: [
      {
        title: 'Estados',
        stack: true,
        description: 'Sin archivo, cargando con progreso, cargado y error.',
        code: `<Uploader size="lg" state="no-upload" onSelect={() => {}} />
<Uploader size="lg" state="loading" fileName="IMG345444" fileInfo="JPG 5 MB" progress={60} />
<Uploader size="lg" state="uploaded" fileName="IMG345444" fileInfo="JPG 5 MB" />
<Uploader size="lg" state="error" fileName="IMG345444" errorMessage="Supera los 5 MB" onSelect={() => {}} />`,
        Demo: () => (
          <>
            <Uploader size="lg" state="no-upload" onSelect={() => {}} />
            <Uploader
              size="lg"
              state="loading"
              fileName="IMG345444"
              fileInfo="JPG 5 MB"
              progress={60}
            />
            <Uploader size="lg" state="uploaded" fileName="IMG345444" fileInfo="JPG 5 MB" />
            <Uploader
              size="lg"
              state="error"
              fileName="IMG345444"
              errorMessage="Supera los 5 MB"
              onSelect={() => {}}
            />
          </>
        ),
      },
    ],
  },
]
