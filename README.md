### Boilerplate DSCVR Struct [CRUD de Usuários + Auth por Magic Link + Upload via Vercel Blob]

Este boilerplate fornece uma base sólida para apps Next.js usando o framework `@discovery-solutions/struct` com:
- CRUD de usuários completo (Mongoose + CRUDController + UI com TableView/ModelForm)
- Autenticação por Magic Link e Email (pronta para configurar provedores)
- Upload de arquivos via endpoint customizado usando Vercel Blob
- UI Provider custom com componentes (shadcn modificados) já integrados ao Struct
- Padrões de models em `models/[name]/{index.ts, model.tsx, utils.tsx}`

Importante: este boilerplate inclui componentes shadcn customizados e integrados ao Struct. Não reinstale/atualize bibliotecas UI sem revisar conflitos para não sobrescrever implementações.

#### Sumário
- Requisitos
- Stack
- Estrutura do Projeto
- Instalação
- Configuração (env)
- Como Rodar
- CRUD de Usuários
- Autenticação
- Upload de Arquivos (Vercel Blob)
- UI Provider do Struct
- Convenções de Código
- Boas Práticas com Struct
- Troubleshooting
- Roadmap curto

### Requisitos
- Node.js LTS (>= 18)
- PNPM, Yarn ou NPM
- Conta MongoDB (connection string)
- E-mail provider (para Magic Link/Email)
- Google OAuth Client (ID e Secret)
- OpenAI API Key
- Vercel Blob ativado (ou credenciais locais)
- Vercel CLI (opcional para deploy)

### Stack
- Next.js (App Router) + TypeScript + TailwindCSS
- Zod + React Hook Form + TanStack Query
- Mongoose (MongoDB)
- `@discovery-solutions/struct` (server + client)
- shadcn (componentes customizados e integrados)
- Vercel Blob (upload)
- sonner (toasts)

### Estrutura do Projeto (resumo)

- `src/struct.ts` – bootstrap do Struct (importar sempre dele)
- `src/auth.ts` – config do authjs
- `src/env.ts` – centralizador e validador de envs
- `src/middleware.ts` – next config
- `src/service/auth/*` – arquivos de configuracao da auth (credential, google, etc)
- `src/lib/mongoose.ts` – utilitários do mongoose, `connectDB`
- `src/providers/config.tsx` – provider do StructUI com seu `config`
- `src/providers/index.tsx` – wrapper de providers
- `src/providers/layout.tsx` – wrapper de providers + setup for layout pages
- `src/models/identity/user/`
  - `index.ts` – interface + schemas Zod
  - `model.tsx` – schema/model do Mongoose
  - `utils.tsx` – `columns` e `fields` para TableView/ModelForm
- `src/app/api/users/[[...id]]/route.ts` – CRUDController do User
- `src/app/api/file/route.ts` – endpoint custom para upload via Vercel Blob
- `src/app/dashboard/users/page.tsx` – listagem (TableView)
- `src/components/ui/*` – componentes shadcn customizados
- `next.config.mjs` – `transpilePackages` para o Struct
- `env` – variáveis de ambiente

### Instalação

1) Clone o repositório:
```bash
git clone https://github.com/discovery-solutions/struct-boilerplate
cd struct-boilerplate
```

2) Instale dependências:
```bash
pnpm install
# ou
yarn
# ou
npm install
```

3) Garanta que o Next transpile o Struct:
- `next.config.mjs` já inclui:
```js
transpilePackages: ["@discovery-solutions/struct"]
```

### Configuração (env)

Crie um `.env.local` na raiz com as chaves abaixo. Ajuste conforme seus provedores.

Obrigatórias:
- `MONGODB_URI` – conexão do MongoDB
- `NEXT_PUBLIC_APP_URL` – URL pública do app (http://localhost:3000 no dev)
- `OPENAI_API_KEY` – para features de AI (se aplicável)
- `BLOB_READ_WRITE_TOKEN` – token do Vercel Blob (ou use bindings da Vercel)
- `AUTH_SECRET` – segredo da sessão/jwt da sua camada de auth
- Email (Magic Link/SMTP):
  - `EMAIL_FROM` – remetente (ex: "noreply@seu-dominio.com")
  - `EMAIL_SERVER` – URI SMTP (ex: `smtp://user:pass@smtp.host:587`)

Google OAuth:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Exemplo de `.env.local`:
```
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
AUTH_SECRET=uma_chave_aleatoria_segura

# Mongo
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Email (Magic Link / SMTP)
EMAIL_FROM="Seu App <noreply@seu-dominio.com>"
EMAIL_SERVER=smtp://user:pass@smtp.seu-dominio.com:587

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=yyy

# OpenAI
OPENAI_API_KEY=sk-...

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

Observações:
- Se usar Vercel, você pode configurar o Blob via UI e usar bindings automáticos. Em local/dev, um RW token é o caminho mais simples.
- Garanta que o AUTH_SECRET seja robusto.

### Como Rodar

Desenvolvimento:
```bash
pnpm dev
# ou yarn dev / npm run dev
```

Build:
```bash
pnpm build && pnpm start
```

Lint:
```bash
pnpm lint
```

### CRUD de Usuários

- Endpoints: `GET/POST/PATCH/DELETE /api/users/[[...id]]`
- Implementado com `CRUDController` do Struct, `softDelete: true`, Zod `createSchema` e `updateSchema`.
- Campos padrão (exemplo):
  - `name`, `email`, `password?`, `avatar?`, `role ('admin'|'user')`, `status ('active'|'inactive')`, `language`, `country`, `credits`, etc.

Uso na UI (páginas prontas):
- `/admin/users` – lista (TableView com `userColumns`)
- `/admin/users/[id]` – form de edição/criação (ModelForm com `userFields`)

Importante:
- Sempre importe APIs/utilitários do Struct a partir de `@/struct` (seu bootstrap), nunca direto de `@discovery-solutions/struct`.

### Autenticação

O boilerplate está pronto para:
- Magic Link e Email (via SMTP)
- Google OAuth (ID/Secret)

Fluxo esperado:
- Rota/handler de auth configurada para enviar magic link por email.
- Após o login, usuário é criado/recuperado no Mongo.
- RBAC básico para rotas CRUD (ex.: GET para `user|admin` e POST/PATCH/DELETE para `admin`, ajustável).

Notas:
- Você precisa garantir que `EMAIL_SERVER` e `EMAIL_FROM` estejam corretos para que o Magic Link funcione.
- Garanta que a rota de callback do Google esteja registrada no console do Google (ex.: `<APP_URL>/api/auth/callback/google`).

### Upload de Arquivos (Vercel Blob)

Endpoint custom: `POST /api/file`
- Recebe arquivo (form-data)
- Faz upload para o Vercel Blob
- Retorna a URL e metadados

Requisitos:
- `BLOB_READ_WRITE_TOKEN` (em dev) ou bindings em prod (Vercel)
- No cliente, utilize os componentes:
  - `ImageUpload`, `FileUpload`, `AvatarUpload`, `InputFileOpenAI`
- O `StructUIProvider` já mapeia estes componentes via `alias`.

Boas práticas:
- Limitar tamanho/tipo de arquivo no servidor
- Opcional: autenticar endpoint (ex.: apenas usuários logados)

### UI Provider do Struct

O projeto já inclui o mapeamento customizado dos componentes UI para o Struct:

```ts
export const config: StructUIConfig = {
  MultiSelect: MultiSelectField,
  AvatarUpload: AvatarUpload,
  ModelSelect: ModelSelect,
  FileOpenAI: InputFileOpenAI,
  FileUpload: FileUpload,
  DatePicker: DatePicker,
  ImageUpload: ImageUpload,
  Textarea: Textarea,
  Select: Select,
  Toggle: Toggle,
  Checkbox: Checkbox,
  InputTags: InputTags,
  SelectField: SelectField,
  Markdown: Markdown,
  Loader: Loader,
  Button: Button,
  Input: Input,
  Table: { ... },
  Card: { ... },
  Dialog: { ... },
  Dropdown: { ... },
  queryClient,
  toast,
  alias: {
    "model-select": "ModelSelect",
    multiselect: "MultiSelect",
    password: "Input",
    text: "Input",
    date: "DatePicker",
    tags: "InputTags",
    number: "Input",
    avatar: "AvatarUpload",
    image: "ImageUpload",
    select: "SelectField",
    markdown: "Markdown",
    toggle: "Toggle",
    checkbox: "Checkbox",
    textarea: "Textarea",
    file: "FileUpload",
    "file-openai": "FileOpenAI",
    document: "FileUpload",
  }
}
```

Atenção:
- Estes componentes são customizados para o Struct. Evite reinstalar `shadcn/ui` diretamente sobre essa pasta. Se precisar adicionar novos componentes, gere-os em outra pasta e integre manualmente ao `StructUIConfig`.

### Convenções de Código

- Models: `src/models/<domain?>/<entity>/{index.ts, model.tsx, utils.tsx}`
- Import do Struct: sempre `@/struct`
- Zod: todo form/CRUD deve ter `createSchema` e `updateSchema`
- CRUDController: `softDelete: true` por padrão; RBAC configurável por método
- UI: use `fields`/`columns` da entidade, alimentando `ModelForm` e `TableView`
- Tipos: use TypeScript com `Interface` coesa para cada model

### Boas Práticas com Struct

1) Use o `Struct.configure` no `src/struct.ts` para integrar DB e auth.
2) Em rotas API, prefira `CRUDController` com `createSchema`/`updateSchema`.
3) Use hooks do CRUD quando precisar de lógica custom (ex.: `beforeCreate`, `afterGet`).
4) Nas telas, consuma `ModelForm` e `TableView` com `fields` e `columns` da entidade.
5) Habilite `softDelete` para auditoria e segurança.

### Troubleshooting

- Componentes UI “quebrados” após instalar pacotes shadcn:
  - Possível conflito/overwrite. Restaure a versão custom dos componentes. Revise o `StructUIConfig`.
- Erros de import do Struct:
  - Importe de `@/struct`, não do pacote direto.
- Upload falha em dev:
  - Verifique `BLOB_READ_WRITE_TOKEN` e permissões. Em Vercel, confirme bindings.
- Magic Link não chega:
  - Cheque `EMAIL_SERVER/EMAIL_FROM`, spam, porta TLS/STARTTLS, firewall de SMTP.
- Mongo desconecta:
  - Reveja `MONGODB_URI`, IP allow list, SRV DNS e versão do driver.

Se achar que há um potencial problema na interface (UI) ou em outra funcionalidade, pode ser um issue do próprio UI ou configuração. Vamos depurar juntos: me diga o erro/log, a rota e o passo-a-passo para reproduzir.

### Roadmap curto

- [ ] Finalizar fluxo de Auth (páginas de login/logout e callbacks)
- [ ] Expor rota de perfil para o usuário finalizar cadastro (nome, avatar, idioma)
- [ ] Validações extras de upload (mimetype/limite de tamanho)
- [ ] Scripts de seed (criar admin)
- [ ] README avançado para deploy na Vercel (bindings Blob + envs)

### Scripts úteis

- Dev: `pnpm dev`
- Build: `pnpm build && pnpm start`
- Lint: `pnpm lint`