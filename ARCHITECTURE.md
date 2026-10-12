# Architecture Decision Records (ADR) & System Guidelines
**Projeto:** PALMVY — Portal principal & ecossistema de produtos
**Autor:** Sam Campos Almeida
**Propriedade de:** PALMVY (anteriormente West Sunset Labs)
**Licença:** All Rights Reserved (Proprietary)
**Última revisão:** 2026-10-01

## 1. Visão geral
Este documento dita as regras arquiteturais, visuais e de governança do portal da PALMVY, estúdio de tecnologia que desenvolve sites e aplicativos (Web e Mobile) e mantém produtos próprios: **Sossegue**, **TuneLab** e **SafeZone**. O sistema prioriza performance, manutenibilidade, segurança e uma estética "Dark Mode Premium" inspirada na luz da costa oeste (California Dreamin'. Digital reality.).

## 2. Propriedade intelectual & governança
- Todo o código deste repositório é propriedade intelectual da PALMVY.
- **Licenciamento:** proibida a cópia, distribuição ou modificação sem autorização.
- **Contato comercial / auditoria:** hello@palmvy.com.br.
- A IA assistente não deve incluir comentários ou sugestões que infrinjam a exclusividade deste código-fonte.

## 3. Stack & controle de dependências
- **Core:** Next.js 16 (App Router) e React 19.
- **Linguagem:** TypeScript em modo `strict`.
- **Estilo:** Tailwind CSS 4, com os tokens definidos em `app/globals.css`.
- **Testes:** Vitest (ver seção 9).
- **Ícones:** SVG inline. `lucide-react` só entra com aprovação do Arquiteto.
- **Regra de versões:** proibido `^` ou `~` no `package.json`. Todas as versões são exatas. O `.npmrc` (`save-exact=true`) garante isso nos próximos `npm install`.
- **Novas bibliotecas** exigem aprovação explícita do Arquiteto. Antes de propor uma, avalie se um utilitário nativo resolve.
- **Versões que já causaram problema:** `vitest@4.1.x` falha na instalação com o npm 10.9 (erro `edgesOut`). O projeto usa `vitest@4.0.18`. Só atualize depois de testar `npm install` do zero.

## 4. Identidade visual
### 4.1 Paleta (fonte da verdade: `app/globals.css`)
| Token | Hex | Uso |
|---|---|---|
| `pacific-night` | `#071A2B` | Fundo principal, símbolo em versão clara |
| `pacific-deep` | `#0E2A40` | Superfícies secundárias (ex.: Footer) |
| `cloud` | `#F5F7F4` | Títulos, o V do logo sobre fundo escuro |
| `soft-gray` | `#C7D1D8` | Texto de leitura |
| `muted` | `#8FA1AD` | Texto secundário |
| `sunset` / `sunset-dark` | `#FF7A45` / `#E2673A` | Acento, CTAs, o sol do logo |
| `gold` | `#FFC857` | Detalhes pontuais (não é usado no logo) |
| `pacific-blue` | `#147D9A` | Identidade de produto |
| `palm-green` | `#164A43` | Identidade de produto |

- Use sempre os tokens (`bg-pacific-night`), nunca hex solto em componentes.
- **Sem gradientes de cor.** A profundidade vem de grão sutil (`.grain-overlay`), linhas de horizonte e contraste entre superfícies.
- Barras flutuantes (Navbar) usam fundo translúcido com `backdrop-blur`.

### 4.2 Tipografia
- **Wordmark do logo:** Geist SemiBold, já convertido em curvas nos SVGs (não depende de fonte instalada).
- **Site (estado atual):** Geist em tudo, carregada por `next/font/google` em `app/layout.tsx` (sem dependência nova) e exposta como `font-sans`, `font-display` e `font-mono` em `app/globals.css`. Não introduza uma terceira família.

### 4.3 Logo e ícones
- **Conceito:** um V (a assinatura "VY") com um sol em cunha nascendo entre as hastes. O logo interpreta a Califórnia, sem desenhá-la.
- **Arquivos:** `public/images/logo/symbol.svg`, `lockup-horizontal.svg`, `lockup-vertical.svg`. Favicon adaptativo (claro/escuro) em `app/icon.svg`.
- **Uso no código:** somente pelo componente `components/ui/Logo.tsx` (`variant`: `symbol`, `horizontal`, `vertical`; `size`: `sm`, `md`, `lg`). Não referencie os SVGs diretamente nem calcule proporções à mão.
- **Cores fixas:** V `#F5F7F4` e sol `#FF7A45` sobre fundos escuros. Não recolorir, distorcer, aplicar sombra ou efeitos.
- **Fundo claro:** a versão com o V em `#071A2B` ainda não existe no repositório. Crie o arquivo antes de usar o logo sobre fundo claro.
- **Compartilhamento:** `app/opengraph-image.png` e `app/twitter-image.png` (1200×630). Mantenha o conteúdo importante no centro, porque o WhatsApp corta as bordas.

## 5. Estrutura de pastas
- `/app`: apenas roteamento, metadados e união de seções (Views). Landing pages de produto ficam em `app/produtos/[slug]`, geradas a partir de `core/data/products.ts` (barrel) e dos arquivos em `core/data/products/`. Páginas legais (`app/privacidade`, `app/termos`) renderizam os textos de `core/data/legal`. `app/sitemap.ts` e `app/robots.ts` saem de `core/data/sitemap.ts` e `core/data/site.ts` (domínio em um lugar só). Páginas legais em rascunho ficam fora do sitemap.
- `/components/ui`: blocos visuais sem regra de negócio (`Button`, `Card`, `CtaLink`, `Logo`, `PhoneFrame`, `PhoneStage`, `ProductVisual`). Recebem tudo por props.
- `/components/sections`: blocos de contexto da página (`Navbar`, `Hero`, `Products`, `Footer`...). A landing de produto é composta por `ProductLanding`, que monta `ProductHero`, `ProductHighlights`, `ProductSteps`, `ProductSpotlight`, `ProductFaq` e `ProductClosing`. Componentes que precisam de estado do navegador (ex.: `MobileMenu`) levam `'use client'` e ficam o menor possível.
- `/core/data`: todo dado estático e configuração (textos, links, produtos, navegação, contato). Cada produto tem seu arquivo em `core/data/products/<produto>.ts` (tipos em `types.ts`); `products.ts` só reúne e reexporta, isolado dos componentes React. Testes desses módulos ficam ao lado deles (`*.test.ts`).
- `/public/images`: imagens estáticas (`logo/`, `products/`). Imagens de produto ficam em `public/images/products/<produto>-app/`, em minúsculas e otimizadas (WebP). Mantenha os originais pesados fora de `public`.
- **Maiúsculas e minúsculas em caminhos:** o Windows ignora a diferença, a Vercel (Linux) não. O teste de `core/data/products.test.ts` confere a existência de cada imagem com a grafia exata.
- Bloco visual repetido deve virar componente imediatamente (ex.: o estilo dos botões vive em `buttonStyles.ts` e é usado por `Button` e `CtaLink`).

### 5.1 Landing de produto
- Seções opcionais (`heroScreenshots`, `steps`, `spotlight`, `faq`) só aparecem se o produto tiver esses dados. Produto sem prints continua com o visual de logo.
- Cada print tem `alt` descritivo e dimensões reais (evita salto de layout). No máximo dois prints no hero.
- Não invente preço, prazo ou promessa de segurança nos textos. Só publique o que o produto cumpre hoje e o que a Política de Privacidade sustenta.
- Prints devem usar dados de demonstração, sem informação de pessoas reais.

## 6. Contato e conversão
- O destino principal dos CTAs é o **WhatsApp**, definido em `core/data/contact.ts` a partir da variável `NEXT_PUBLIC_WHATSAPP_NUMBER` (país + DDD + número, só dígitos).
- Sem número válido, o CTA leva à seção `/#como-trabalhamos` da home. A validação é feita em `buildContactLink`. Cada landing usa uma mensagem própria (`getProductContactLink`).
- Links externos usam sempre `target="_blank"` com `rel="noopener noreferrer"` (o `CtaLink` já faz isso).
- Para publicar, cadastre a mesma variável no painel do serviço de hospedagem. Sem ela, o botão em produção cai no fallback.

## 7. Mobile-first, UX e acessibilidade
- O layout base é mobile. Prefixos `md:` e `lg:` expandem para desktop, não o contrário.
- **Toques:** CTAs no mobile têm no mínimo 48px de altura (`h-12`). Demais alvos de toque têm no mínimo 44px.
- CTAs principais em páginas de produto ficam fixos na base da tela no mobile (`fixed bottom-0 pb-safe`).
- Toda tela ou componente com dados considera os estados **carregando, erro, vazio e sucesso**.
- Acessibilidade mínima: contraste legível, `alt` e rótulos, navegação por teclado com foco visível (`:focus-visible` global), `aria-expanded` e `aria-controls` em menus, e sem informação transmitida só por cor.
- Não duplique texto lido por leitor de tela (ex.: logo com `alt="PALMVY"` ao lado do mesmo texto).

## 8. Motion
- Apenas utilitários nativos do Tailwind/CSS. Proibido Framer Motion, GSAP ou similares sem autorização.
- Transições específicas (`transition-colors`, `transition-[opacity,transform,visibility]`). Evite `transition-all`.
- Todo movimento respeita `prefers-reduced-motion` (`motion-reduce:transition-none`).

## 9. Testes
- **Ferramenta:** Vitest. Comandos: `npm test` (uma vez) e `npm run test:watch`.
- **O que testar primeiro:** lógica pura em `core/` (ex.: `buildContactLink`), integridade de dados (ex.: cada link de `NAV_LINKS` tem uma seção com o `id` correspondente) e componentes com implicação de segurança (ex.: `CtaLink` e o `rel="noopener noreferrer"`).
- **Cobertura:** mire em tudo que envolve dinheiro, contato, autenticação ou dados de usuário. Cobertura de 100% por vaidade não é meta.
- **Antes de cada commit:** rodar `npm test`, `npm run lint` e `npm run build`.
- **Componentes interativos:** testados com `jsdom` e `@testing-library/react` (ex.: `MobileMenu`), declarando `// @vitest-environment jsdom` no topo do arquivo. Componentes só de renderização usam `renderToStaticMarkup` no ambiente node (ex.: `ProductLanding`).

## 10. Segurança
- Nenhum segredo (chaves de API, tokens, senhas) no código, no frontend ou no repositório.
- Variáveis com prefixo `NEXT_PUBLIC_` ficam **visíveis a qualquer visitante**. Use-as só para dados públicos (ex.: número de WhatsApp). Segredos ficam em variáveis sem esse prefixo, lidas apenas no servidor.
- Analytics: Cloudflare Web Analytics (gratuito, sem cookies). `components/ui/CloudflareAnalytics.tsx` só carrega o script se `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` for válida (`core/data/analytics.ts`). O token é público por natureza. Sem a variável, nada é carregado (é o caso do ambiente local).
- O `.gitignore` bloqueia `.env*`, `.next` e `node_modules`. Exceção permitida: `.env.example`, sem valores reais.
- Proibido `eval` e `dangerouslySetInnerHTML` sem sanitização.
- Todo input de usuário é validado no servidor. Validação no cliente é só conveniência.
- Endpoints que expõem ou alteram dados exigem autenticação e autorização.
- Mantenha as dependências fixas e sem vulnerabilidades conhecidas (`npm audit` antes de publicar).

## 11. Diretrizes para IA
Qualquer modelo de IA que modifique este repositório DEVE:
1. Ler este documento antes de gerar código.
2. **Nunca executar `git commit`.** É permitido `git add`. O Arquiteto escreve as mensagens e faz os commits. Nunca adicionar tags `Co-authored-by`.
3. Não criar código genérico com "cara de IA" e componentizar blocos repetitivos.
4. Usar dados reais, sem placeholders como "lorem ipsum".
5. Não instalar bibliotecas nem alterar versões sem aprovação. Se sugerir uma, explicar o motivo e as alternativas.
6. Não gravar segredos nem números pessoais no código. Configuração vai em variável de ambiente.
7. Verificar o resultado (tipos, lint, testes, build) antes de afirmar que algo está pronto.

## 12. Decisões pendentes
- Conteúdo das landing pages: o Sossegue já tem prints, passos, FAQ e destaque de ritmo. TuneLab e SafeZone ainda usam só os destaques; faltam prints, passos e FAQ, e no SafeZone a logo. Definir se o objetivo passa a ser lista de espera (exige formulário validado no servidor e página de Privacidade antes de coletar dados).
- Revisão jurídica de Privacidade e Termos. O texto atual é rascunho (`isDraft: true`, página com `noindex`). Para publicar, substitua o conteúdo de `core/data/legal/privacy.ts` e `terms.ts` mantendo o formato `LegalDocument` e troque `isDraft` para `false`. O rascunho pressupõe medição de audiência sem cookies e nenhum formulário: revise se isso mudar.
- Redes sociais: `SOCIAL_LINKS` em `core/data/contact.ts` já tem Instagram, X e Dev.to. Um `href` `null` esconde o link no Footer.
- Versão do logo para fundos claros.
