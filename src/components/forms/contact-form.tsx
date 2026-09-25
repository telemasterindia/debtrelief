"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactMessageSchema, type ContactMessage } from "@/lib/validation/consultation-request";
import { track } from "@/lib/analytics/track";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { TextArea, TextField } from "./fields";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);
  const done = useRef<HTMLHeadingElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactMessage & { website?: string }>({ resolver: zodResolver(contactMessageSchema) as never, mode: "onSubmit", reValidateMode: "onChange" });

  const onSubmit = async (data: ContactMessage) => {
    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(body.message || "Something went wrong. Please try again.");
      track("form_submitted", { form: "contact" });
      setStatus("sent");
      requestAnimationFrame(() => done.current?.focus());
    } catch (e) {
      track("form_submit_failed", { form: "contact", reason: "server" });
      setStatus("idle");
      setServerError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-line bg-white p-8">
        <Icon name="checkCircle" className="size-10 text-success-700" />
        <h2 ref={done} tabIndex={-1} className="mt-4 text-3xl outline-none">Your Message Has Been Sent.</h2>
        <p className="mt-3 text-lg leading-relaxed">Thank you. We&apos;ll reply to the email address you provided.</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) =>
        void handleSubmit(onSubmit, (errs) =>
          Object.keys(errs).forEach((field) => track("form_validation_error", { form: "contact", field })),
        )(e)
      }
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          track("form_started", { form: "contact" });
        }
      }}
      className="space-y-6 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title" className="text-2xl sm:text-3xl">Send us a message</h2>
      {serverError && (
        <p role="alert" className="flex gap-2 rounded-xl border-2 border-danger-700 bg-danger-50 p-4 text-lg font-medium text-danger-700">
          <Icon name="alert" className="mt-0.5 size-6 shrink-0" />
          {serverError}
        </p>
      )}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <TextField id="name" label="Your name" autoComplete="name" error={errors.name?.message} {...register("name")} />
      <TextField id="email" type="email" label="Email address" autoComplete="email" spellCheck={false} error={errors.email?.message} {...register("email")} />
      <TextArea
        id="message"
        label="Your message"
        hint="Please don't include your Social Security number, account numbers or other sensitive details."
        rows={6}
        maxLength={2000}
        error={errors.message?.message}
        {...register("message")}
      />
      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send My Message"}
      </Button>
    </form>
  );
}
