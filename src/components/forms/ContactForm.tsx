"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { featuredCourses } from "@/config/site";
import { Button } from "@/components/ui/Button";
import styles from "@/app/contact/page.module.css";

export function ContactForm() {
  const [version, setVersion] = useState(0);
  return <ContactFormFields key={version} onReset={() => setVersion((value) => value + 1)} />;
}

function ContactFormFields({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState<ContactFormState, FormData>(submitContactForm, { status: "idle", message: "" });
  const [values, setValues] = useState({ name: "", email: "", phone: "", instrument: "", mode: "", message: "" });
  function update(field: keyof typeof values, value: string) { setValues((current) => ({ ...current, [field]: value })); }
  function error(field: string) { return state.errors?.[field]?.[0]; }

  if (state.status === "success") {
    return <div className={styles.formSuccess} role="status"><CheckCircle2 size={28} aria-hidden /><h3>Request sent</h3><p>{state.message}</p><Button type="button" variant="secondary" onClick={onReset}>Send another request</Button></div>;
  }

  return (
    <form className={styles.form} action={action} aria-label="Trial class request">
      {state.message ? <p className={styles.formError} role="alert">{state.message}</p> : null}
      <div className={styles.fieldGrid}>
        <label><span>Student name</span><input name="name" placeholder="Student name" autoComplete="name" required maxLength={100} value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(error("name"))} aria-describedby={error("name") ? "contact-name-error" : undefined} />{error("name") ? <small id="contact-name-error">{error("name")}</small> : null}</label>
        <label><span>Phone number</span><input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" required maxLength={25} value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(error("phone"))} aria-describedby={error("phone") ? "contact-phone-error" : undefined} />{error("phone") ? <small id="contact-phone-error">{error("phone")}</small> : null}</label>
      </div>
      <label><span>Email address</span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={254} value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(error("email"))} aria-describedby={error("email") ? "contact-email-error" : undefined} />{error("email") ? <small id="contact-email-error">{error("email")}</small> : null}</label>
      <div className={styles.fieldGrid}>
        <label><span>Instrument</span><select name="instrument" required value={values.instrument} onChange={(event) => update("instrument", event.target.value)} aria-invalid={Boolean(error("instrument"))} aria-describedby={error("instrument") ? "contact-instrument-error" : undefined}><option value="" disabled>Choose instrument</option>{featuredCourses.map((course) => <option key={course.slug} value={course.title}>{course.title}</option>)}</select>{error("instrument") ? <small id="contact-instrument-error">{error("instrument")}</small> : null}</label>
        <label><span>Learning mode</span><select name="mode" required value={values.mode} onChange={(event) => update("mode", event.target.value)} aria-invalid={Boolean(error("mode"))} aria-describedby={error("mode") ? "contact-mode-error" : undefined}><option value="" disabled>Choose mode</option><option>Online</option><option>Offline</option><option>Hybrid</option></select>{error("mode") ? <small id="contact-mode-error">{error("mode")}</small> : null}</label>
      </div>
      <label><span>What would you like to learn?</span><textarea name="message" placeholder="Tell us about your goals, age group, or preferred timing." maxLength={3000} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(error("message"))} aria-describedby={error("message") ? "contact-message-error" : undefined} />{error("message") ? <small id="contact-message-error">{error("message")}</small> : null}</label>
      <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <Button type="submit" variant="primary" disabled={pending} icon={pending ? <LoaderCircle aria-hidden size={17} /> : <Send aria-hidden size={17} />}>{pending ? "Sending request..." : "Send Trial Request"}</Button>
    </form>
  );
}
