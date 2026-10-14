'use client';

import { useId, useRef, useState, type ChangeEvent } from 'react';
import { flushSync } from 'react-dom';
import { CtaLink } from '@/components/ui/CtaLink';
import { PriceOdometer } from '@/components/ui/PriceOdometer';
import type { ContactLink } from '@/core/data/contact';

// Nome compartilhado pela opção clicada (antes) e pela caixa da estimativa (depois).
const MORPH_NAME = 'quote-pick';

const canMorph = (): boolean =>
  typeof document.startViewTransition === 'function' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export type QuoteOption = {
  id: string;
  label: string;
  /** Sem estimativa quando a pessoa ainda não sabe o que precisa. */
  estimate: { name: string; price: string } | null;
  link: ContactLink;
};

type QuotePickerProps = {
  options: readonly QuoteOption[];
};

const isWhatsApp = (link: ContactLink): boolean =>
  link.href.startsWith('https://wa.me/');

// Começa em "ainda não sei" (a opção sem estimativa): quem toca no botão sem
// escolher manda a mensagem genérica, nunca um tipo de projeto que não pediu.
const getDefaultId = (options: readonly QuoteOption[]): string | undefined =>
  (options.find(({ estimate }) => estimate === null) ?? options[0])?.id;

export function QuotePicker({ options }: QuotePickerProps) {
  const [selectedId, setSelectedId] = useState(() => getDefaultId(options));
  const groupName = useId();
  const estimateRef = useRef<HTMLDivElement>(null);
  const selected = options.find(({ id }) => id === selectedId) ?? options[0];

  if (!selected) return null;

  // A opção clicada se transforma na caixa da estimativa (View Transition).
  // Sem suporte ou com movimento reduzido, a troca é direta.
  const select = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const chip = event.currentTarget.closest('label');
    const estimate = estimateRef.current;

    if (!chip || !estimate || !canMorph()) {
      setSelectedId(id);
      return;
    }

    chip.style.viewTransitionName = MORPH_NAME;
    const transition = document.startViewTransition(() => {
      chip.style.viewTransitionName = '';
      estimate.style.viewTransitionName = MORPH_NAME;
      flushSync(() => setSelectedId(id));
    });
    transition.finished.finally(() => {
      estimate.style.viewTransitionName = '';
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-4 text-xl font-semibold text-cloud">
          O que vamos construir?
        </legend>

        <div className="flex flex-wrap gap-2.5">
          {options.map(({ id, label }) => (
            <label
              key={id}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-soft-gray/20 px-4 font-mono text-xs uppercase tracking-wider text-soft-gray transition-colors hover:border-soft-gray/40 has-checked:border-sunset has-checked:bg-sunset/10 has-checked:text-cloud has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-sunset motion-reduce:transition-none"
            >
              <input
                type="radio"
                name={groupName}
                value={id}
                checked={id === selected.id}
                onChange={(event) => select(id, event)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div
        ref={estimateRef}
        aria-live="polite"
        className="rounded-md border border-dashed border-sunset/45 bg-sunset/5 px-5 py-4"
      >
        {selected.estimate ? (
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-sunset">
              Estimativa · {selected.estimate.name}
            </span>
            <span className="flex flex-col items-start sm:items-end">
              <span className="font-mono text-xs uppercase tracking-widest text-sunset">
                a partir de
              </span>
              <PriceOdometer
                price={selected.estimate.price}
                className="text-3xl font-extrabold leading-tight tracking-tight text-cloud sm:text-4xl"
              />
            </span>
          </div>
        ) : (
          <p className="leading-relaxed text-cloud">
            Não sabe ainda o que precisa? A gente te ajuda a decidir.
          </p>
        )}
      </div>

      <CtaLink
        href={selected.link.href}
        isExternal={selected.link.isExternal}
        variant="primary"
        size="xl"
        className="w-full"
      >
        {isWhatsApp(selected.link) ? 'Chamar no WhatsApp' : 'Enviar e-mail'}
        <span aria-hidden="true">→</span>
      </CtaLink>
      <p className="text-sm leading-relaxed text-muted">
        A mensagem já vai pronta. É só contar a ideia. A conversa não tem custo.
      </p>
    </div>
  );
}
