import { describe, expect, it } from 'vitest';
import {
  CONTACT_EMAIL,
  buildContactLink,
  getContactChannel,
  getProductContactLink,
  getQuoteContactLink,
  getSocialLinks,
} from '@/core/data/contact';
import { findPriceTier } from '@/core/data/pricing';

const FALLBACK_LINK = { href: '/#contato', isExternal: false };
const VALID_PHONE = '5511999999999';

describe('buildContactLink', () => {
  it('monta o link do WhatsApp para um número válido', () => {
    const link = buildContactLink(VALID_PHONE);
    const url = new URL(link.href);

    expect(link.isExternal).toBe(true);
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe(`/${VALID_PHONE}`);
    expect(url.searchParams.get('text')).toContain('PALMVY');
  });

  it('usa a mensagem informada, com codificação segura', () => {
    const link = buildContactLink(VALID_PHONE, 'Olá & tudo bem?');

    expect(new URL(link.href).searchParams.get('text')).toBe('Olá & tudo bem?');
  });

  it.each([
    undefined,
    '',
    'abc',
    '+5511999999999',
    '11 99999-9999',
    '123',
    '12345678901234567',
    '5511999999999?x=1',
    '5511999999999/../evil',
  ])('usa o fallback interno para o valor %j', (phone) => {
    expect(buildContactLink(phone)).toEqual(FALLBACK_LINK);
  });
});

describe('getProductContactLink', () => {
  it('pede aviso de lançamento para produtos em breve', () => {
    const link = getProductContactLink(
      { name: 'Sossegue', status: 'coming-soon' },
      VALID_PHONE,
    );
    const text = new URL(link.href).searchParams.get('text');

    expect(text).toContain('Sossegue');
    expect(text).toContain('avisado');
  });

  it('pergunta sobre o produto quando já foi lançado', () => {
    const link = getProductContactLink(
      { name: 'Sossegue', status: 'launched' },
      VALID_PHONE,
    );
    const text = new URL(link.href).searchParams.get('text');

    expect(text).toContain('saber mais sobre o Sossegue');
  });

  it('cai no e-mail com a mensagem do produto sem número válido', () => {
    const link = getProductContactLink(
      { name: 'SafeZone', status: 'coming-soon' },
      undefined,
    );
    const url = new URL(link.href);

    expect(link.isExternal).toBe(false);
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(CONTACT_EMAIL);
    expect(url.searchParams.get('subject')).toBe('SafeZone: aviso de lançamento');
    expect(url.searchParams.get('body')).toContain('avisado');
  });

  it('não leva a landing de volta para a home sem número válido', () => {
    const link = getProductContactLink(
      { name: 'Sossegue', status: 'launched' },
      'abc',
    );

    expect(link.href.startsWith('/')).toBe(false);
    expect(new URL(link.href).searchParams.get('subject')).toBe('Sobre o Sossegue');
  });
});

describe('getQuoteContactLink', () => {
  const app = findPriceTier('app');

  it('abre o WhatsApp com o tipo e o preço inicial na mensagem', () => {
    const link = getQuoteContactLink(app, VALID_PHONE);
    const text = new URL(link.href).searchParams.get('text');

    expect(link.isExternal).toBe(true);
    expect(text).toContain('App mobile');
    expect(text).toMatch(/R\$\s20\.000/);
  });

  it('usa a mensagem padrão quando a pessoa ainda não sabe o tipo', () => {
    const text = new URL(
      getQuoteContactLink(undefined, VALID_PHONE).href,
    ).searchParams.get('text');

    expect(text).toContain('PALMVY');
    expect(text).not.toContain('orçamento de');
  });

  it('cai no e-mail, e não na própria página, sem número válido', () => {
    const link = getQuoteContactLink(app, undefined);
    const url = new URL(link.href);

    expect(link.isExternal).toBe(false);
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(CONTACT_EMAIL);
    expect(url.searchParams.get('subject')).toBe('Orçamento: App mobile');
    expect(url.searchParams.get('body')).toContain('App mobile');
  });
});

describe('getContactChannel', () => {
  it('reconhece WhatsApp, e-mail e âncora da página', () => {
    expect(getContactChannel(buildContactLink(VALID_PHONE))).toBe('whatsapp');
    expect(getContactChannel(getQuoteContactLink(undefined, undefined))).toBe('email');
    expect(getContactChannel(FALLBACK_LINK)).toBe('page');
  });
});

describe('getSocialLinks', () => {
  it('esconde perfis sem URL', () => {
    expect(getSocialLinks([{ label: 'Instagram', href: null }])).toEqual([]);
  });

  it('expõe só links https e sem rótulos repetidos nos perfis do site', () => {
    const links = getSocialLinks();
    const labels = links.map(({ label }) => label);

    expect(links.length).toBeGreaterThan(0);
    expect(links.every(({ href }) => href.startsWith('https://'))).toBe(true);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('mantém apenas URLs https', () => {
    const links = getSocialLinks([
      { label: 'Instagram', href: 'https://instagram.com/palmvy' },
      { label: 'X', href: 'http://x.com/palmvy' },
      { label: 'Outro', href: 'javascript:alert(1)' },
    ]);

    expect(links).toEqual([
      { label: 'Instagram', href: 'https://instagram.com/palmvy' },
    ]);
  });
});
