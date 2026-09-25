import Link from "next/link";
import { faqs, homeFaqIds } from "@/lib/content/faq";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/ui/tracked-link";
import { FaqList } from "./faq-list";

export function FaqPreview() {
  const items = homeFaqIds.map((id) => faqs.find((f) => f.id === id)!).filter(Boolean);
  return (
    <section aria-labelledby="faq-preview-title" className="bg-canvas py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="faq-preview-title"
            eyebrow="Common questions"
            title="Straight Answers to Common Questions"
            intro="Select a question to read the answer."
          />
          <div className="mt-8 flex flex-col gap-4">
            <Link href="/faq" className="link inline-flex min-h-12 items-center gap-2 text-lg">
              See all frequently asked questions
              <Icon name="arrowRight" className="size-5" />
            </Link>
            <div>
              <CtaButton href="/request-review" location="faq_preview" variant="secondary" arrow>
                Request a Validation Review
              </CtaButton>
            </div>
          </div>
        </div>
        <div className="reveal">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
