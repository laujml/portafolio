import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pb-16 pt-32 text-center">
      <p className="font-display text-6xl text-ink">404</p>
      <h1 className="mt-4 max-w-md font-display text-3xl">Page not found / Página no encontrada</h1>
      <p className="mt-3 max-w-md text-lg text-ink-soft">
        This page is not part of the portfolio. / Esta página no forma parte del portafolio.
      </p>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-pink-deep px-6 font-display text-lg text-ink">
        Home
      </Link>
    </main>
  );
}
