export type PriceLedgerRow = {
  id: string;
  name: string;
  /** Escopo ou detalhe, abaixo do nome. */
  detail: string;
  /** Rótulo mono acima do valor (ex.: "A partir de"). */
  label: string;
  /** Valor já formatado em reais. */
  price: string;
};

/** Régua de preços (DESIGN.md, Price Ledger): nome à esquerda, valor à direita. */
export function PriceLedger({ rows }: { rows: readonly PriceLedgerRow[] }) {
  return (
    <dl>
      {rows.map(({ id, name, detail, label, price }) => (
        <div
          key={id}
          className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-cloud/10 py-6 first:pt-0"
        >
          <dt>
            <span className="block text-xl font-bold text-cloud sm:text-2xl">{name}</span>
            <span className="mt-1 block text-muted">{detail}</span>
          </dt>
          <dd className="ml-auto text-right">
            <span className="block font-mono text-xs uppercase tracking-widest text-sunset">
              {label}
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-cloud tabular-nums sm:text-4xl">
              {price}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
