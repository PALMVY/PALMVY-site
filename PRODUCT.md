# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dois públicos com o mesmo peso de negócio (confirmado pelo Sam em 2026-10-14). Na home, porém, a ordem é deliberadamente 80/20: produtos próprios primeiro, sob medida depois (decisão do Sam em 2026-10-14, depois da crítica). O peso igual vale para o que cada caminho precisa (ser encontrável, ter CTA próprio e funcionar), não para a ordem nem para o destaque na primeira dobra.

- **Quem quer um projeto sob medida:** dono de pequeno negócio, MEI ou autônomo que precisa de landing page, site institucional ou app mobile e quer saber quanto custa antes de falar com alguém.
- **Quem se interessa pelos apps da PALMVY:** pessoas no público de cada produto (MEIs no Sossegue, entusiastas de carros no TuneLab, quem quer informação de segurança no SafeZone) que querem entender o app e ser avisadas do lançamento.

Os dois chegam majoritariamente pelo celular. Idioma: português do Brasil.

## Product Purpose

O portal é a vitrine da PALMVY, estúdio que cria os próprios apps e faz sites e apps sob medida. Ele apresenta os produtos próprios (cada um com landing em `/produtos/[slug]`) e vende o trabalho sob medida com preço aberto.

Sucesso nos próximos meses:

- **Pedidos de orçamento:** conversas iniciadas no WhatsApp (ou e-mail, no fallback) com a mensagem do tipo de projeto já preenchida.
- **Interesse nos apps:** pedidos de aviso de lançamento pelo WhatsApp. Lista de espera com formulário é decisão pendente (ver Capabilities and Constraints).

## Positioning

- **Preço na mesa.** O site publica o preço inicial de cada tipo de projeto, onde a maioria dos estúdios pede "manda DM". O "a partir de" é o piso real do escopo descrito, não isca.
- **Quem vende software também faz software próprio.** A PALMVY mantém apps próprios em desenvolvimento; o trabalho sob medida vem de quem constrói produto, não só entrega projeto.
- **Contra o jargão.** O manifesto risca "experiências", "soluções mágicas", "transformação digital", "vamos alinhar expectativas" e "chatbot de IA te atendendo". O atendimento é humano e direto.

## Operating Context

- Processo de venda em três passos (`core/data/home.ts`): o cliente conta o que precisa (pode ser um áudio), a PALMVY fecha escopo, prazo e preço por escrito, e o cliente acompanha cada entrega até receber funcionando.
- Canal principal: WhatsApp (`NEXT_PUBLIC_WHATSAPP_NUMBER`). Sem número válido, contato de produto cai em `/#como-trabalhamos` e orçamento cai em `mailto:hello@palmvy.com.br`. Cada landing e cada tipo de orçamento gera mensagem própria (`core/data/contact.ts`).
- Redes: Instagram, X e Dev.to (`@palmvyco`).

## Capabilities and Constraints

- **Tabela de preços (fonte única `core/data/pricing.ts`):** Landing page a partir de R$ 2.900 (uma página, foco em conversão); Site institucional a partir de R$ 5.000 (até 5 páginas); App mobile a partir de R$ 20.000 (iOS e Android, com login e API). Sempre incluso: design do zero sem template, rápido em qualquer tela, publicado no domínio do cliente ou nas lojas, código do cliente.
- **Produtos (todos `coming-soon`, iOS e Android):**
  - **Sossegue** — finanças para MEI e autônomos; painel calmo, conversa por texto ou áudio. Tem prints, passos, FAQ e destaque.
  - **TuneLab** — IA que analisa o carro por fotos e texto e sugere tunagens de forma educativa. Tem 2 prints, passos e FAQ; falta o print do Setup Completo.
  - **SafeZone** — mapa de áreas de risco com denúncias anônimas verificadas. Só destaques; sem logo e sem telas reais.
- **Não há coleta de dados de usuário.** Nenhum formulário envia nada. Lista de espera ou formulário de contato exigem Server Action com validação no servidor, proteção contra abuso e consentimento LGPD, e só depois da revisão da Política de Privacidade.
- Privacidade e Termos são rascunho (`isDraft: true`, `noindex`).
- Analytics: Cloudflare Web Analytics, sem cookies.
- Stack, dependências, motion e segurança seguem o `ARCHITECTURE.md` (Next.js 16, React 19, Tailwind 4, sem bibliotecas novas sem aprovação, motion só em CSS nativo).

## Brand Commitments

- Nome: **PALMVY** (em caixa alta), antes West Sunset Labs. Assinaturas em uso: "Apps feitos com calma e propósito." e "California Dreamin'. Digital reality."
- Voz: provocativa sem se contradizer, direta, coloquial ("a gente", "Fechou, começa"), sem letra miúda e sem jargão de agência.
- Logo: V com sol em cunha nascendo entre as hastes; uso só via `components/ui/Logo.tsx`, cores fixas, sem efeitos. Versão para fundo claro ainda não existe.
- Paleta, tipografia (só Geist) e proibição de gradientes estão fixadas no `ARCHITECTURE.md` §4.

## Evidence on Hand

- Prints reais com dados de demonstração: Sossegue e TuneLab em `public/images/products/<produto>-app/`.
- Preços reais e processo de trabalho publicados.
- **A marca é anônima.** O Sam tem um portfólio pessoal em outro site, mas o site da PALMVY não mostra nome, foto nem link pessoal de quem responde (decisão de 2026-10-14). A confiança vem de preço, processo e produtos, não de uma pessoa.
- **Não existem ainda:** projetos de clientes para portfólio, depoimentos, apps publicados nas lojas, números de downloads ou usuários, logos de clientes, imprensa. Nada disso pode ser inventado, nem como placeholder.
- Não publicar promessa de preço, prazo ou segurança que o produto não cumpra hoje ou que a Política de Privacidade não sustente.

## Product Principles

1. **Transparência é o argumento.** Preço, escopo e processo ficam visíveis; a confiança vem do que é dito com clareza, já que ainda não há portfólio para mostrar.
2. **Dois caminhos, nenhum escondido.** Quem quer um app da PALMVY e quem quer um projeto sob medida chegam ao próximo passo sem disputar espaço um com o outro.
3. **Só o que é verdade hoje.** Status "em breve" é dito como "em breve"; sem métrica, depoimento ou promessa sem lastro.
4. **Conversa humana, um toque de distância.** Todo CTA leva a uma conversa real com a mensagem já preenchida; nada de formulário que não envia ou atendimento automatizado.
5. **Feito para o celular primeiro.** O público chega pelo WhatsApp e pelas redes; a decisão acontece numa tela pequena.

## Accessibility & Inclusion

Requisitos mínimos do `ARCHITECTURE.md` §7: contraste legível, `alt` descritivo, foco visível, navegação por teclado, `aria-expanded`/`aria-controls` em menus, informação nunca só por cor, alvos de toque de 44px (48px em CTAs) e `prefers-reduced-motion` respeitado.
