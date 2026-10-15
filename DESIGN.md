---
name: PALMVY
description: Apps feitos com calma e propósito. California Dreamin'. Digital reality.
colors:
  pacific-night: "#071a2b"
  pacific-deep: "#0e2a40"
  cloud: "#f5f7f4"
  soft-gray: "#c7d1d8"
  muted: "#8fa1ad"
  sunset: "#ff7a45"
  sunset-dark: "#e2673a"
  gold: "#ffc857"
  pacific-blue: "#147d9a"
  palm-green: "#164a43"
  amber: "#6b4413"
  hairline: "rgba(245, 247, 244, 0.10)"
typography:
  display:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  price:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
    fontFeature: "tnum"
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "0.1em"
rounded:
  control: "6px"
  container: "24px"
  device: "32px"
  pill: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  section: "96px"
  section-lg: "128px"
  container: "1152px"
components:
  button-primary:
    backgroundColor: "{colors.sunset}"
    textColor: "{colors.pacific-night}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.sunset-dark}"
    textColor: "{colors.pacific-night}"
  button-secondary:
    backgroundColor: "{colors.pacific-deep}"
    textColor: "{colors.cloud}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "56px"
  button-inverse:
    backgroundColor: "{colors.cloud}"
    textColor: "{colors.pacific-night}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  container:
    backgroundColor: "{colors.pacific-deep}"
    textColor: "{colors.soft-gray}"
    rounded: "{rounded.container}"
    padding: "36px"
  chip:
    backgroundColor: "{colors.pacific-night}"
    textColor: "{colors.soft-gray}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.sunset}"
    textColor: "{colors.pacific-night}"
  status-badge:
    textColor: "{colors.soft-gray}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  section-label:
    textColor: "{colors.sunset}"
    typography: "{typography.label}"
---

# Design System: PALMVY

## Overview

**Creative North Star: "Pacific Golden Hour"**

A noite azul do Pacífico com o sol baixo no horizonte. Quase tudo é escuro, frio e silencioso: fundo `pacific-night`, texto em cinzas azulados, linhas finas. Em cada tela existe um único ponto quente, o laranja `sunset`, e ele marca o que o visitante deve fazer ou notar em seguida (o CTA, o rótulo da seção, o termo riscado). A calma vem da contenção. O calor vem da raridade do laranja.

A tipografia fala alto e curto. Títulos em Geist pesado, apertados, quase encostando nas linhas, e ao lado deles a voz técnica em Geist Mono caixa alta: rótulos `[ PRODUTOS ]`, numeração `01 · 02 · 03`, plataformas, a palavra "a partir de". É o tom de um estúdio que mostra o preço e o processo em vez de prometer "experiências": o jargão aparece na tela riscado em laranja.

A profundidade não vem de gradiente nem de sombra decorativa. Vem do contraste entre duas superfícies azuis (`pacific-night` e `pacific-deep`), de bordas finas em `cloud` a 10%, do grão sutil sobre a página inteira e das linhas de horizonte ondulando na base do hero. Os prints dos apps, em molduras de celular levemente inclinadas, são a única imagem.

**Key Characteristics:**
- Escuro e frio por padrão, com um único acento quente por contexto.
- Display pesado e apertado + mono caixa alta como voz técnica.
- Profundidade tonal, grão e linhas de horizonte; sem gradientes.
- Jargão riscado em laranja como assinatura verbal e visual.
- Preço e números em algarismos tabulares, grandes e legíveis.

## Colors

Uma noite azul-marinho em camadas, cinzas frios para leitura e um laranja de pôr do sol que é o único elemento quente da tela.

### Primary
- **Sol Baixo** (sunset): o acento da marca e o sol do logo. CTAs principais, rótulos de seção, numeração, risco dos termos, foco visível e seleção de texto. Contraste de 7:1 sobre `pacific-night`, como texto ou como fundo de botão com texto `pacific-night`.
- **Brasa** (sunset-dark): só o hover do CTA principal.

### Secondary
- **Último Raio** (gold): detalhe pontual e raro no portal. A linha de resposta sob o termo riscado ("O piso está na tela...") e o ponto do status "Em breve". Nunca em CTA, nunca no logo, nunca em painel de produto.

### Tertiary
- **Água Funda** (pacific-blue), **Âmbar** (amber) e **Palmeira** (palm-green): cores de identidade de produto (Sossegue, TuneLab e SafeZone), usadas nos painéis e marcadores de cada app (`accentColor`) e no badge "Disponível". As três são escuras de propósito, para o laranja continuar sendo o único ponto quente da tela. Não são cores do portal; não aparecem em títulos, CTAs ou fundos de seção.

### Neutral
- **Noite do Pacífico** (pacific-night): fundo de toda página, texto de botões sobre laranja e `cloud`, fundo das molduras de celular.
- **Mar Profundo** (pacific-deep): a segunda camada. Footer, cards e painéis.
- **Névoa** (cloud): títulos, nomes de produto, preços e o V do logo. Também é a base das bordas finas (`hairline`, 10%) e do botão invertido.
- **Cinza Costeiro** (soft-gray): texto corrido e links da navegação.
- **Areia Molhada** (muted): texto secundário, descrições, legendas, termos riscados e plataformas. Contraste de 6,6:1 sobre `pacific-night`.
- **Linha d'Água** (hairline): divisores de seção, bordas de cards e o fio sob cabeçalhos de seção.

### Named Rules
**The One Sun Rule.** Cada contexto visível tem um elemento laranja dominante: o CTA principal. Rótulos e números em laranja são pequenos e em mono; nunca dois blocos sólidos de `sunset` disputando a mesma dobra.

**The No-Gradient Rule.** Proibido gradiente de cor, em fundo, texto ou borda. A transição de luz é feita por superfícies sólidas, grão e linhas.

**The Product Color Rule.** A `accentColor` de cada produto (`pacific-blue` no Sossegue, `amber` no TuneLab, `palm-green` no SafeZone) só preenche os painéis de arte daquele produto: o palco dos celulares e o painel da logo. Fora deles, o portal usa só a família noite + névoa + sol.

## Typography

**Display Font:** Geist (com -apple-system, Segoe UI, Roboto)
**Body Font:** Geist (mesmo fallback)
**Label/Mono Font:** Geist Mono (com SFMono-Regular, Consolas, Menlo)

**Character:** uma família só, em dois registros. Geist Sans pesada e apertada grita a ideia; Geist Mono em caixa alta e espaçada sussurra o dado técnico. O contraste é de peso e de textura, não de família.

### Hierarchy
- **Display** (800, 3.75rem no mobile → 4.5rem a partir de `sm`, line-height 0.92, tracking -0.05em): o `h1` do hero e das landings. Para em 4.5rem de propósito, para os CTAs caberem na primeira dobra em 1440×900. Uma palavra pode vir em `sunset`.
- **Closing** (800, 3rem → 3.75rem em `sm`, line-height 0.95, tracking -0.05em): o título de fechamento ("Quer começar?", "Quer acompanhar o X?") e o `h1` das páginas legais. O mesmo tamanho em toda página.
- **Headline** (700, 2.25rem → 3rem → 3.75rem, line-height 1, tracking -0.025em): `h2` de seção. Sempre com `text-balance`.
- **Title** (700, 1.5rem, tracking -0.025em): passos, nomes de faixa de preço. Nomes de produto sobem para 800 e 2.25rem–3.75rem.
- **Price** (800, 1.875rem → 2.25rem, algarismos tabulares): valores em reais. Sempre precedidos do rótulo mono "A partir de".
- **Body** (400, 1.125rem, line-height 1.625, até ~28rem de largura): parágrafos de apoio em `muted` ou `soft-gray`.
- **Label** (Geist Mono 400, 0.75rem → 0.875rem, caixa alta, tracking 0.1em): rótulos de seção, numeração, categorias, plataformas, badges e o texto dos CTAs.

### Named Rules
**The Two Registers Rule.** Ideia em Sans pesada, dado em Mono caixa alta. Não existe uma terceira voz: nada de serifa, itálico decorativo ou terceira família.

**The Bracket Label Rule.** Toda seção abre com o rótulo mono em `sunset` no formato `[ NOME ]`, antes do `h2`.

## Layout

Mobile-first, coluna única até `lg` (1024px), quando hero, sob medida e contato abrem em duas colunas. O conteúdo vive num container de 1152px (`max-w-6xl`) centralizado; a navegação usa 1280px. Margens laterais de 16px → 24px (`sm`) → 32px (`lg`).

O ritmo vertical é generoso e regular: seções com 96px de respiro, 128px a partir de `sm`, separadas por um fio `hairline` no topo. Dentro da seção, o padrão é rótulo → título → apoio em `muted` → conteúdo, com 28px a 48px entre blocos. Cabeçalhos de seção podem levar um texto curto alinhado à direita no desktop, sobre um fio inferior.

Listas de dados (preços, passos) são réguas, não grades de cards: linhas separadas por `hairline`, rótulo à esquerda, valor à direita. A vitrine de produtos é a exceção: o produto em destaque ocupa a largura toda em duas colunas e os demais ficam em cards empilhados.

No mobile, CTAs têm no mínimo 48px de altura (os principais, 56px) e ocupam a largura toda quando ficam sozinhos. Nas landings de produto o CTA principal fica fixo na base da tela.

## Elevation & Depth

Sistema plano e tonal. A profundidade vem da troca de superfície (`pacific-night` → `pacific-deep`), da borda `hairline` e do grão fixo sobre a página inteira (ruído SVG a 5% de opacidade, `mix-blend-mode: overlay`). Sombras só existem para objetos físicos: molduras de celular e a logo do produto, que "flutuam" sobre o painel.

### Shadow Vocabulary
- **Device** (`box-shadow: 0 24px 48px rgba(7, 26, 43, 0.45)`): molduras de celular (`PhoneFrame`).
- **Product mark** (`box-shadow: 0 12px 28px rgba(7, 26, 43, 0.35)`): cartão da logo do produto (`ProductVisual`).

### Named Rules
**The Tonal Depth Rule.** Superfície sobe de camada trocando de azul, não ganhando sombra. Card, painel e footer usam `pacific-deep` com borda `hairline`.

**The Blur Is For Floating Rule.** `backdrop-blur` só em barras que flutuam sobre conteúdo em rolagem: a Navbar e a barra fixa de CTA da landing de produto. Cards e painéis são sólidos.

## Shapes

Dois níveis de raio. Controles (botões, campos, CTAs) têm cantos discretos de 6px; containers (cards, painéis de preço e de orçamento) têm cantos amplos de 24px. A diferença é deliberada: o controle é preciso, o container é acolhedor. Pílulas (raio total) ficam restritas a badges de status, chips de seleção e marcadores redondos. Molduras de celular têm 32px para lembrar o aparelho.

As linhas de horizonte (três ondas finas em `soft-gray`, opacidade decrescente de 60% → 35% → 18%) são a forma-assinatura do sistema. Aparecem na base do hero; não viram padrão de fundo nem ícone.

### Named Rules
**The Two Radii Rule.** 6px para o que se clica, 24px para o que contém. 12px e 16px não existem no sistema.

## Components

### Buttons
Diretos e pesados: texto em caixa alta, espaçado, com seta `→` empurrada para a ponta.
- **Shape:** cantos discretos (6px).
- **Primary:** fundo `sunset`, texto `pacific-night` em negrito, caixa alta, tracking 0.1em, 56px de altura, 24px de padding lateral, rótulo à esquerda e `→` à direita (`justify-between`).
- **Hover / Focus:** hover troca o fundo para `sunset-dark` com `transition-colors` de 200ms; foco é o contorno global de 2px em `sunset` com 2px de afastamento.
- **Secondary:** superfície `pacific-deep` com borda `hairline`, texto `cloud`; o hover clareia a borda para `cloud` a 30%.
- **Inverse:** fundo `cloud`, texto `pacific-night` em Mono caixa alta, 48px. Usado no "Conhecer o produto" do card em destaque.
- **Text link:** Mono caixa alta em `cloud` ou `soft-gray`, hover em `sunset`, alvo mínimo de 44px.

### Chips
- **Style:** pílula de 44px, borda `soft-gray` a 20%, texto Mono caixa alta em `soft-gray`. O input de rádio fica escondido e o foco aparece no rótulo.
- **State:** selecionada ganha borda `sunset`, fundo `sunset` a 10% e texto `cloud` (não preenche de laranja, para não disputar com o CTA). Hover clareia a borda para 40%.

### Estimativa do orçamento
Caixa tracejada em `sunset` a 45% sob as opções. Mostra "Estimativa · tipo" em Mono, "A partir de" em Mono `sunset` e o preço em Price (800, 1.875rem → 2.25rem), alinhado à direita a partir de `sm` e à esquerda no celular.
- **Contador:** o preço é um contador mecânico (`PriceOdometer`). Cada algarismo é uma fita de 0 a 9 que rola até o dígito (900ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 45ms de atraso por casa, da esquerda para a direita). Uma casa nova nasce rolando do zero. Leitores de tela leem o preço por extenso; os dígitos animados ficam escondidos.
- **Transição:** a opção clicada vira a caixa (View Transition de 480ms, só nesse par; o resto da página troca sem fade). Sem suporte ou com `prefers-reduced-motion`, a troca é direta e o contador não rola.

### Status Badge
Pílula pequena em Mono caixa alta com ponto de 6px à esquerda. "Em breve": borda `soft-gray` a 20%, ponto `gold`. "Disponível": borda e fundo `palm-green`, ponto `cloud`. O texto sempre diz o status; a cor não carrega a informação sozinha.

### Cards / Containers
- **Corner Style:** cantos amplos (24px).
- **Background:** `pacific-deep`.
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).
- **Border:** `hairline`; em cards clicáveis, o hover leva a borda a `sunset` a 40%.
- **Internal Padding:** 24px no mobile, 36px–48px no desktop.

### Navigation
Barra fixa no topo, `pacific-night` a 90% com blur. Logo horizontal à esquerda, links em `soft-gray` 14px (hover `cloud`) no centro a partir de `md`, CTA "Vamos conversar?" em `sunset` à direita. No mobile, os links vão para o menu (`aria-expanded` / `aria-controls`).

### Section Label
O rótulo `[ NOME ]` em Geist Mono, caixa alta, `sunset`, 12px → 14px. Abre toda seção.

### Strike
O jargão que a PALMVY não vende, riscado: texto em `muted`, risco em `sunset` de 2px (3px a partir de `sm`). Aparece em listas de manifesto ("Sem ~~"soluções"~~ mágicas.") e pode ser seguido de uma resposta em `gold`.

**Movimento (o momento autoral da abertura da página):** no manifesto do hero, o risco é desenhado da esquerda para a direita sobre cada termo, um depois do outro (520ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 220ms entre termos, começando em 450ms), e o termo apaga de `cloud` para `muted` junto com a linha. Roda uma vez ao abrir a página. Com `prefers-reduced-motion`, o risco já aparece pronto. Os outros riscos do site são estáticos.

### Price Ledger
Régua de preços: cada faixa é uma linha com nome (Title) e escopo (`muted`) à esquerda; à direita, o rótulo mono "A partir de" em `sunset` sobre o valor em Price. Linhas separadas por `hairline`. Abaixo, "Sempre incluso" em lista de duas colunas com `+` mono em `sunset`.

### Phone Stage
Prints reais dos apps em molduras de 32px com sombra Device. No hero, dois aparelhos sobrepostos e levemente inclinados (-3° e 6°), cada um com uma etiqueta do produto (ponto na cor do app + nome em Mono). Os aparelhos são decorativos (`aria-hidden`), porque os mesmos produtos aparecem com texto logo abaixo.

Nas landings, o "Passo a passo" é o pico da página: a partir de 1024px, uma faixa contínua na cor do produto (com as linhas de horizonte) atravessa as colunas, e um aparelho sobe do pé da faixa em cada passo, no mesmo eixo esquerdo do texto. Abaixo, `01 / 03` em Mono e o título do passo em Sans 800. No tablet (768–1023px), cada passo vira uma linha com o painel colorido à esquerda e o texto à direita: três colunas não cabem o aparelho nessa largura. No celular, cada passo tem o próprio painel, empilhado. Destaques e FAQ ficam em régua, de propósito mais quietos.

**Painel que viaja:** o painel de arte do card na home e o painel do topo da landing são o mesmo objeto (`ProductArtTransition`, View Transition do React com `name` por produto). Ao clicar em "Conhecer o X", o painel cresce e voa até o topo da landing (560ms, `cubic-bezier(0.16, 1, 0.3, 1)`, desfoque de 2px no meio do caminho, recortado com raio de 24px); o "Todos os produtos" faz o caminho de volta. O resto da página troca sem fade. Sem suporte (Firefox) ou com `prefers-reduced-motion`, a navegação é direta.

## Do's and Don'ts

### Do:
- **Do** usar sempre os tokens (`bg-pacific-night`, `text-sunset`), nunca hex solto em componente.
- **Do** manter um único CTA `sunset` sólido por dobra (The One Sun Rule).
- **Do** abrir toda seção com `[ RÓTULO ]` mono em `sunset` e separar seções com um fio `hairline`.
- **Do** escrever preços com algarismos tabulares e o rótulo "A partir de" acima.
- **Do** usar 6px em controles e 24px em containers.
- **Do** animar só cor e opacidade/transform com propriedades explícitas (`transition-colors`, 200ms) e `motion-reduce:transition-none`.
- **Do** manter o foco visível global (contorno `sunset` de 2px) em todo elemento interativo.

### Don't:
- **Don't** usar gradiente de cor de nenhum tipo.
- **Don't** introduzir uma segunda família tipográfica além de Geist / Geist Mono.
- **Don't** usar `backdrop-blur` ou fundo translúcido em cards e painéis; vidro é só para barras flutuantes.
- **Don't** usar `transition-all`.
- **Don't** usar a cor de um produto fora dos painéis de arte dele (títulos, CTAs, fundos de seção).
- **Don't** recolorir, distorcer ou aplicar sombra ao logo; ele sai sempre de `components/ui/Logo.tsx`.
- **Don't** usar `gold` em CTA ou em blocos grandes do portal; ele é detalhe. Cor de produto nova também precisa ser escura.
- **Don't** criar raios de 12px ou 16px.
