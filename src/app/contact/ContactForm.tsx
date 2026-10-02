"use client";
import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaCalendarDays, FaPaperPlane, FaWhatsapp } from "react-icons/fa6";
import LocationInput from "@/components/estimate/LocationInput";
import { waLink } from "@/data/site";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", email: "", pickup: "", destination: "", date: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [id, setId] = useState("");
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!f.name.trim()) x.name = "Please enter your name";
    if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ""))) x.phone = "Enter a valid 10-digit mobile number";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Enter a valid email";
    setErr(x);
    if (Object.keys(x).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", ...f, drop: f.destination }),
      });
      const d = await r.json().catch(() => ({}));
      setId(d.bookingId ?? "");
      setState("done");
    } catch {
      setState("idle");
      setErr({ form: "Couldn't send right now — please call or WhatsApp us." });
    }
  }

  if (state === "done")
    return (
      <div className="success">
        <div className="tick">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h3 style={{ fontSize: 26, textTransform: "uppercase" }}>Enquiry sent!</h3>
        <p className="muted" style={{ marginTop: 10 }}>Thank you, {f.name.split(" ")[0]}. Our team will call you shortly{id ? ` — reference ${id}` : ""}.</p>
        <a className="btn btn-wa" style={{ marginTop: 20 }} target="_blank" rel="noopener" href={waLink(`Hi, I just sent an enquiry${id ? ` (${id})` : ""}. ${f.pickup ? `Trip: ${f.pickup} → ${f.destination}` : ""}`)}>
          <FaWhatsapp /> Follow up on WhatsApp
        </a>
      </div>
    );

  const inp = (k: "name" | "phone" | "email" | "date", label: string, icon: React.ReactNode, props: React.InputHTMLAttributes<HTMLInputElement> = {}, req = false) => (
    <div className={`field ${err[k] ? "invalid" : ""}`}>
      <label>{label} {req && <em>*</em>}</label>
      <div className="ctrl">
        {icon}
        <input value={f[k]} onChange={(e) => set(k)(e.target.value)} {...props} />
      </div>
      {err[k] && <span className="err">{err[k]}</span>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate>
      <h3 style={{ fontSize: 26, textTransform: "uppercase", marginBottom: 20 }}>Send an enquiry</h3>
      <div className="fgrid">
        {inp("name", "Name", <FaUser size={14} />, { placeholder: "Your name", autoComplete: "name" }, true)}
        {inp("phone", "Phone Number", <FaPhone size={14} />, { placeholder: "10-digit mobile", inputMode: "tel", autoComplete: "tel" }, true)}
        {inp("email", "Email", <FaEnvelope size={14} />, { placeholder: "you@example.com", type: "email", autoComplete: "email" })}
        {inp("date", "Travel Date", <FaCalendarDays size={14} />, { type: "date" })}
        <LocationInput label="Pickup Location" value={f.pickup} onChange={set("pickup")} />
        <LocationInput label="Destination" value={f.destination} onChange={set("destination")} />
        <div className="field full">
          <label>Message</label>
          <textarea value={f.message} onChange={(e) => set("message")(e.target.value)} placeholder="Tell us about your trip…" />
        </div>
      </div>
      {err.form && <p className="notice" style={{ marginTop: 14 }}>{err.form}</p>}
      <button className="btn btn-ink" style={{ marginTop: 20 }} disabled={state === "sending"}>
        <FaPaperPlane /> {state === "sending" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
