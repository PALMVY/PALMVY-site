import { describe, expect, it } from 'vitest';
import {
  buildContactLink,
  getProductContactLink,
  getSocialLinks,
} from '@/core/data/contact';

const FALLBACK_LINK = { href: '/#como-trabalhamos', isExternal: false };
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

  it('cai no fallback sem número válido', () => {
    expect(
      getProductContactLink({ name: 'Sossegue', status: 'launched' }, undefined),
    ).toEqual(FALLBACK_LINK);
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
