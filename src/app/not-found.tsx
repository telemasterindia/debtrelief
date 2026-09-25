import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center sm:py-32">
      <p className="text-lg font-semibold text-brand-700">Page not found</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">We couldn&apos;t find that page.</h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
        The page may have moved, or the address may have a typo. These links may help.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/faq" variant="secondary">Read the FAQ</ButtonLink>
      </div>
      <p className="mt-8 text-lg">
        Or <Link href="/free-consultation" className="link">request your free consultation</Link>.
      </p>
    </section>
  );
}
