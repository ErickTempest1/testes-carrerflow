## 🧪 Qualidade e Testes Automatizados

O projeto **CarrerFlow** adota uma estratégia robusta de QA (Quality Assurance) para garantir a estabilidade tanto do Front-end quanto do Back-end. Nossa arquitetura de testes foi desenhada para validar regras de negócio críticas, segurança de dados e integridade das rotas.

### 🛠️ Stack de Testes

| Camada | Framework | Ferramentas Auxiliares | Foco |
| :--- | :--- | :--- | :--- |
| **Front-end** | **Vitest** | React Testing Library, JSDOM | Renderização de Componentes, Hooks, Interação do Usuário. |
| **Back-end** | **Jest** | Supertest, SQLite (:memory:) | Regras de Negócio (Unitários), Rotas da API (E2E). |

---

### 📐 Estratégia e Cobertura

O plano de testes foi estruturado seguindo a **Pirâmide de Testes**, garantindo feedback rápido e confiabilidade.

#### 1. Back-end (NestJS API)
Validamos a API em dois níveis:
* **Testes Unitários (`.spec.ts`):** Focados nos **Services**. Utilizamos *Mocks* para isolar o banco de dados e testar a lógica pura (ex: hashing de senha, validação de email duplicado).
* **Testes Ponta-a-Ponta (`.e2e-spec.ts`):** Focados nos **Controllers**. Subimos uma instância da aplicação com um banco SQLite em memória para testar o fluxo completo da requisição HTTP (Auth -> Guard -> Controller -> Service -> DB).

**Cenários Críticos Cobertos:**
* ✅ **Autenticação:** Registro, Login, Geração de JWT e tratamento de erros (401/409).
* ✅ **Segurança de Usuário:** Garantia de que senhas não são retornadas nas rotas GET.
* ✅ **Gestão de Vagas:** CRUD completo e validação de que um usuário não pode alterar/excluir vagas de outro usuário.

#### 2. Front-end (React)
Adotamos a estratégia de **Co-localização** (testes próximos aos componentes).
* **Testes de Integração:** Validação de formulários (Login/Cadastro), navegação e feedback visual.
* **Testes de UI:** Verificação de renderização condicional (ex: Cards do Kanban, Modais).

---

### 🚀 Como Executar os Testes

Para rodar a suíte de testes localmente, utilize os comandos abaixo na raiz de cada projeto.

#### No Back-end (`/Back-end`)

```bash
# Rodar testes unitários (Services)
npm run test

# Rodar testes E2E (Rotas e Integração)
npm run test:e2e

# Verificar cobertura de código
npm run test:cov

# Executar todos os testes
npm test

# Modo watch (re-executa ao salvar arquivos)
npx vitest
