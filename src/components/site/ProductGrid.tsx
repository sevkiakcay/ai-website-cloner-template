import Link from "next/link";

interface Product {
  name: string;
  tagline: string;
  swatch: string;
}

const PRODUCTS: Product[] = [
  { name: "Palet Air", tagline: "İnanılmaz derecede ince.", swatch: "from-zinc-200 to-zinc-400" },
  { name: "Palet Pro", tagline: "Profesyoneller için güç.", swatch: "from-neutral-700 to-neutral-900" },
  { name: "Palet Mini", tagline: "Küçük. Ama mükemmel.", swatch: "from-sky-300 to-sky-500" },
  { name: "Palet Studio", tagline: "Yaratıcılığın yeni evi.", swatch: "from-amber-200 to-amber-400" },
];

export function ProductGrid() {
  return (
    <section className="bg-black px-4 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2">
        {PRODUCTS.map((product) => (
          <article
            key={product.name}
            className="flex min-h-[420px] flex-col items-center justify-between overflow-hidden rounded-3xl bg-neutral-900 px-8 py-12 text-center"
          >
            <div>
              <h2 className="text-3xl font-semibold text-white">{product.name}</h2>
              <p className="mt-1 text-lg text-white/60">{product.tagline}</p>
              <div className="mt-4 flex items-center justify-center gap-5 text-base">
                <Link href="#" className="text-blue-500 hover:underline">
                  Satın al &gt;
                </Link>
                <Link href="#" className="text-blue-500 hover:underline">
                  Daha fazla bilgi &gt;
                </Link>
              </div>
            </div>
            <div
              className={`mt-8 h-40 w-full max-w-xs rounded-2xl bg-gradient-to-br ${product.swatch}`}
              aria-hidden
            />
          </article>
        ))}
      </div>
    </section>
  );
}
