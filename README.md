# PALMVY — Portal

*Engineering the future under the west coast light.*

## Visão geral
Este repositório contém o código-fonte do portal oficial da **PALMVY**, estúdio de tecnologia que desenvolve sites e aplicativos (Web e Mobile) e mantém produtos próprios: **Sossegue**, **TuneLab** e **SafeZone**. O portal segue uma estética "Dark Mode Premium" e é a vitrine central da marca.

## Stack
- **Next.js 16** (App Router) e **React 19**
- **TypeScript** em modo `strict`
- **Tailwind CSS 4** (mobile-first)
- **Vitest** para testes
- Todas as dependências têm versão exata (sem `^` ou `~`)

## Requisitos
- Node.js **20.19+** ou **22.12+**
- npm

## Como rodar localmente
```bash
npm install
```

Crie um arquivo `.env` (ou `.env.local`) na raiz com o número de WhatsApp usado nos botões de contato. Use país + DDD + número, só dígitos:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

Sem essa variável, o contato geral rola até a seção de orçamento e os botões de orçamento e de produto abrem um e-mail com a mensagem pronta. Depois, inicie o servidor:

```bash
npm run dev
```

O site abre em `http://localhost:3000`. Reinicie o servidor sempre que alterar variáveis de ambiente.

## Scripts
| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | Análise estática com ESLint |
| `npm test` | Roda os testes uma vez |
| `npm run test:watch` | Testes em modo observação |

Antes de cada commit, rode `npm test`, `npm run lint` e `npm run build`.

## Estrutura
```
app/                 Rotas, metadados, favicon e imagens de compartilhamento
components/ui/       Blocos visuais sem regra de negócio (Button, Card, Logo...)
components/sections/ Seções da página (Navbar, Hero, Products, Footer...)
core/data/           Dados estáticos e configuração (produtos, navegação, contato)
public/images/       Logo e imagens dos produtos
```

## Publicação
Cadastre a variável `NEXT_PUBLIC_WHATSAPP_NUMBER` no serviço de hospedagem antes de publicar. Variáveis com prefixo `NEXT_PUBLIC_` ficam visíveis para qualquer visitante, então use-as só para dados públicos. Faça o mesmo com `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` (token do Cloudflare Web Analytics, painel "Manage site"); sem ela, o site funciona sem medição. Nunca versione arquivos `.env`.

## Arquitetura e padrões
Paleta, tipografia, regras do logo, segurança, testes e governança de dependências estão no `ARCHITECTURE.md`. Leia-o antes de contribuir.

## Intellectual Property & License
Copyright © 2026 Sam Campos Almeida / PALMVY. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this source code, via any medium, is strictly prohibited.

For academic review, portfolio verification, or business inquiries, please contact the founder at: hello@palmvy.com.br.
