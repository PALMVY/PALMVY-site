# Home editorial: protótipo

Protótipo visual da nova home da PALMVY. É **referência de design**, não código de produção.

## Como abrir

Dê dois cliques em `index.html`. As telas dos apps vêm de `public/images/products/`, então o arquivo precisa ficar nesta pasta (`design/home-editorial/`).

## O que é provisório

- O formulário não envia nada. No site real ele precisa de Server Action com validação no servidor (zod), rate limit ou Turnstile, chave do provedor de e-mail só no servidor e registro do consentimento LGPD.
- As molduras dos celulares são CSS. Para produção, use `PhoneFrame` / `PhoneStage` com `next/image`.
- O mapa do SafeZone é ilustração até existirem telas reais.

## Decisões fechadas

- Ordem 80/20: produtos primeiro, sob medida depois.
- Tom: provocativo sem se contradizer. O preço "a partir de" é o piso real do escopo descrito.
- Preços: Landing R$ 2.900 · Institucional R$ 5.000 · App mobile R$ 20.000.
- Paleta e fontes: as mesmas de `app/globals.css` (Pacific Night, Sunset, Geist).

## Ao implementar

Coloque os preços em um arquivo só (`core/data/pricing.ts`), com teste. Assim a tabela e a estimativa do formulário nunca mostram números diferentes.
