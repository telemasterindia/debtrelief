"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  COLLECTOR_CONTACT,
  DEBT_AMOUNTS,
  DEBT_TYPES,
  reviewRequestSchema,
  reviewSteps,
  stepFields,
  type ReviewRequest,
} from "@/lib/validation/review-request";
import { US_STATES } from "@/lib/validation/us-states";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics/track";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Checkbox, RadioGroup, SelectField, TextArea, TextField } from "./fields";
import { FormSuccess } from "./form-success";

type FormValues = ReviewRequest & { website?: string };
type Field = FieldPath<FormValues>;

const labelFor = (options: readonly { value: string; label: string }[], value?: string) =>
  options.find((o) => o.value === value)?.label ?? "—";

export function ReviewForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const started = useRef(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(reviewRequestSchema) as never,
    // Validation runs when the visitor presses Continue. A field that has an error is then
    // re-checked as they type (see onChange below), never on blur — validating on blur would
    // make the layout jump at the moment they click Continue, causing the click to miss.
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { details: "", consentSms: false },
  });

  // Move focus to the new step's heading so screen-reader and keyboard users know where they are.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeading.current?.focus();
  }, [step]);

  const onFirstInteraction = () => {
    if (!started.current) {
      started.current = true;
      track("form_started", { form: "review" });
    }
  };

  const currentErrors = stepFields[step]
    .map((f) => ({ field: f, message: errors[f as keyof FormValues]?.message as string | undefined }))
    .filter((e) => e.message);

  const reportErrors = (fields: string[]) => {
    fields.forEach((field) => track("form_validation_error", { form: "review", step: step + 1, field }));
    setShowSummary(true);
    requestAnimationFrame(() => errorSummary.current?.focus());
  };

  const next = async () => {
    const fields = stepFields[step] as Field[];
    const ok = await trigger(fields, { shouldFocus: false });
    if (!ok) {
      reportErrors(fields.filter((f) => getFieldError(f)));
      return;
    }
    track("form_step_completed", { form: "review", step: step + 1 });
    setShowSummary(false);
    setStep((s) => Math.min(s + 1, reviewSteps.length - 1));
  };

  // Checked against the schema directly: `errors` in this closure is from the previous render.
  const getFieldError = (f: Field) =>
    !reviewRequestSchema.shape[f as keyof typeof reviewRequestSchema.shape]?.safeParse(getValues(f as never)).success;

  const back = () => {
    setShowSummary(false);
    setServerError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const goTo = (target: number) => {
    setShowSummary(false);
    setStep(target);
  };

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/review-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string; fieldErrors?: Record<string, string> };
      if (res.ok) {
        track("form_submitted", { form: "review" });
        setStatus("success");
        return;
      }
      setStatus("idle");
      if (res.status === 422 && body.fieldErrors) {
        const entries = Object.entries(body.fieldErrors);
        entries.forEach(([field, message]) => setError(field as Field, { message }));
        const firstStep = stepFields.findIndex((fields) => entries.some(([f]) => fields.includes(f)));
        if (firstStep >= 0) setStep(firstStep);
        track("form_submit_failed", { form: "review", reason: "rejected" });
        setShowSummary(true);
        return;
      }
      track("form_submit_failed", { form: "review", reason: "server" });
      setServerError(body.message ?? "Something went wrong on our side. Please try again in a few minutes.");
    } catch {
      setStatus("idle");
      track("form_submit_failed", { form: "review", reason: "network" });
      setServerError("We couldn't connect. Please check your internet connection and try again.");
    }
  };

  const onInvalid = () => reportErrors(stepFields[step].filter((f) => errors[f as keyof FormValues]));

  if (status === "success") return <FormSuccess />;

  const values = getValues();
  const stepInfo = reviewSteps[step];
  const isLast = step === reviewSteps.length - 1;

  return (
    <div className="rounded-[1.25rem] border border-line bg-white shadow-[var(--shadow-raised)]">
      {/* Progress */}
      <div className="border-b border-line px-5 py-6 sm:px-10">
        <p className="text-lg font-semibold text-ink" aria-live="polite">
          Step {step + 1} of {reviewSteps.length}: <span className="text-brand-700">{stepInfo.title}</span>
        </p>
        <ol className="mt-4 grid grid-cols-4 gap-2" aria-label="Form progress">
          {reviewSteps.map((s, i) => (
            <li key={s.id} aria-current={i === step ? "step" : undefined}>
              <span className={`block h-2 rounded-full ${i <= step ? "bg-brand-600" : "bg-line"}`} aria-hidden="true" />
              <span className={`mt-2 hidden text-base sm:block ${i === step ? "font-semibold text-ink" : "text-muted"}`}>
                {i < step && <span className="sr-only">Completed: </span>}
                {s.title}
              </span>
              <span className="sr-only sm:hidden">{s.title}{i < step ? " (completed)" : ""}</span>
            </li>
          ))}
        </ol>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          if (isLast) {
            void handleSubmit(onSubmit, onInvalid)(e);
          } else {
            e.preventDefault();
            void next();
          }
        }}
        onFocus={onFirstInteraction}
        onChange={(e) => {
          const name = (e.target as unknown as HTMLInputElement).name as Field;
          if (name && (errors as Record<string, unknown>)[name]) void trigger(name);
        }}
        className="px-5 py-8 sm:px-10 sm:py-10"
        aria-labelledby="form-step-heading"
      >
        <h2 id="form-step-heading" ref={stepHeading} tabIndex={-1} className="text-2xl outline-none sm:text-3xl">
          {stepInfo.title}
        </h2>

        {showSummary && currentErrors.length > 0 && (
          <div
            ref={errorSummary}
            tabIndex={-1}
            role="alert"
            className="mt-6 rounded-[var(--radius-card)] border-2 border-danger-700 bg-danger-50 p-5 outline-none"
          >
            <p className="flex items-center gap-2 text-lg font-semibold text-danger-700">
              <Icon name="alert" className="size-6" />
              Please check {currentErrors.length === 1 ? "this answer" : `these ${currentErrors.length} answers`}:
            </p>
            <ul className="mt-3 space-y-1.5 pl-8 text-[1.0625rem]">
              {currentErrors.map((e) => (
                <li key={e.field}>
                  <a
                    href={`#${e.field}`}
                    className="font-medium text-danger-700 underline"
                    onClick={(ev) => {
                      ev.preventDefault();
                      const el = document.getElementById(e.field);
                      const target = el?.tagName === "FIELDSET" ? el.querySelector<HTMLInputElement>("input") : el;
                      target?.focus();
                    }}
                  >
                    {e.message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {serverError && (
          <div role="alert" className="mt-6 rounded-[var(--radius-card)] border-2 border-danger-700 bg-danger-50 p-5 text-lg text-danger-700">
            <p className="flex items-start gap-2 font-semibold">
              <Icon name="alert" className="mt-0.5 size-6 shrink-0" />
              {serverError}
            </p>
            <p className="mt-2 pl-8 text-[1.0625rem] text-body">Your answers have been kept. You can try again below.</p>
          </div>
        )}

        {/* Honeypot — hidden from people and assistive technology. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="mt-8 space-y-8">
          {step === 0 && (
            <>
              <p className="text-lg text-muted">Let&apos;s start with your name. Every question has a clear label, and you can go back at any time.</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField id="firstName" label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register("firstName")} />
                <TextField id="lastName" label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register("lastName")} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <RadioGroup
                id="debtType"
                legend="What type of debt is it?"
                options={DEBT_TYPES}
                error={errors.debtType?.message}
                inputProps={() => register("debtType")}
              />
              <RadioGroup
                id="debtAmount"
                legend="About how much is being claimed?"
                hint="An estimate is fine."
                options={DEBT_AMOUNTS}
                columns={3}
                error={errors.debtAmount?.message}
                inputProps={() => register("debtAmount")}
              />
              <RadioGroup
                id="collectorContact"
                legend="Has a debt collector contacted you about this debt?"
                options={COLLECTOR_CONTACT}
                columns={3}
                error={errors.collectorContact?.message}
                inputProps={() => register("collectorContact")}
              />
              <SelectField id="state" label="Which state do you live in?" autoComplete="address-level1" error={errors.state?.message} defaultValue="" {...register("state")}>
                <option value="" disabled>
                  Choose your state
                </option>
                {US_STATES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </SelectField>
              <TextArea
                id="details"
                label="Anything else you'd like us to know?"
                optional
                hint="For example, the name on the collection letter. Please do not include your Social Security number or full account numbers."
                maxLength={1000}
                error={errors.details?.message}
                {...register("details")}
              />
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-lg text-muted">We&apos;ll use these details only to contact you about your request.</p>
              <TextField
                id="email"
                type="email"
                label="Email address"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                error={errors.email?.message}
                {...register("email")}
              />
              <TextField
                id="phone"
                type="tel"
                label="Phone number"
                hint="A 10-digit U.S. number, like (555) 555-0123."
                autoComplete="tel-national"
                inputMode="tel"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </>
          )}

          {step === 3 && (
            <>
              <div className="rounded-[var(--radius-card)] bg-canvas p-5 sm:p-6">
                <h3 className="text-xl">Please check your answers</h3>
                <dl className="mt-4 divide-y divide-line text-lg">
                  {[
                    { label: "Name", value: `${values.firstName ?? ""} ${values.lastName ?? ""}`, step: 0 },
                    { label: "Type of debt", value: labelFor(DEBT_TYPES, values.debtType), step: 1 },
                    { label: "Approximate amount", value: labelFor(DEBT_AMOUNTS, values.debtAmount), step: 1 },
                    { label: "Contacted by a collector", value: labelFor(COLLECTOR_CONTACT, values.collectorContact), step: 1 },
                    { label: "State", value: US_STATES.find(([c]) => c === values.state)?.[1] ?? "—", step: 1 },
                    { label: "Email", value: values.email, step: 2 },
                    { label: "Phone", value: values.phone, step: 2 },
                  ].map((row) => (
                    <div key={row.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                      <dt className="text-muted">{row.label}</dt>
                      <dd className="flex items-center gap-4 font-medium text-ink">
                        <span className="break-all">{row.value}</span>
                        <button
                          type="button"
                          onClick={() => goTo(row.step)}
                          className="min-h-11 rounded-lg px-2 text-base font-semibold text-brand-700 underline"
                        >
                          Edit<span className="sr-only"> {row.label.toLowerCase()}</span>
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <fieldset className="space-y-4">
                <legend className="text-xl font-semibold text-ink">Your consent</legend>
                <Checkbox
                  id="consentContact"
                  error={errors.consentContact?.message}
                  {...register("consentContact")}
                  label={
                    <>
                      <strong className="font-semibold text-ink">Required.</strong> I agree that {siteConfig.name} may
                      contact me by phone call or email, using the details I provided, about my request for a debt
                      validation review. I understand this consent is not a condition of buying anything, and I can
                      withdraw it at any time.
                    </>
                  }
                />
                <Checkbox
                  id="consentTerms"
                  error={errors.consentTerms?.message}
                  {...register("consentTerms")}
                  label={
                    <>
                      <strong className="font-semibold text-ink">Required.</strong> I have read the{" "}
                      <Link href="/privacy" target="_blank" className="link">
                        Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" target="_blank" className="link">
                        Terms &amp; Conditions<span className="sr-only"> (opens in a new tab)</span>
                      </Link>
                      . I understand that a review does not guarantee any result
                      {siteConfig.isLawFirm ? "" : ` and that ${siteConfig.name} does not provide legal advice`}.
                    </>
                  }
                />
                <Checkbox
                  id="consentSms"
                  {...register("consentSms")}
                  label={
                    <>
                      <strong className="font-semibold text-ink">Optional.</strong> You may also send me text messages
                      about my request at the phone number I provided. Message and data rates may apply. I can opt out at
                      any time.
                    </>
                  }
                />
              </fieldset>
            </>
          )}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={back}>
              <Icon name="arrowRight" className="size-5 rotate-180" />
              Back
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {isLast ? (
            <Button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>
              {status === "submitting" ? "Sending your request…" : "Request My Validation Review"}
            </Button>
          ) : (
            <Button type="submit" arrow>
              Continue to step {step + 2}
            </Button>
          )}
        </div>

        <p className="mt-6 flex items-start gap-2.5 text-base leading-relaxed text-muted">
          <Icon name="lock" className="mt-0.5 size-5 shrink-0" />
          Your answers are sent over an encrypted connection. We never ask for your Social Security number, full account
          numbers or bank passwords on this website.
        </p>
      </form>
    </div>
  );
}
