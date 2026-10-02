"use client";
import { useEffect, useId, useRef, useState } from "react";
import { FaLocationDot, FaChevronDown } from "react-icons/fa6";
import { searchLocalPlaces } from "@/data/locations";

interface Suggestion {
  id: string;
  main: string;
  secondary: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

/** Popular places + every district of Karnataka, Tamil Nadu and Kerala. Full list when the field is empty. */
const hintSuggestions = (q: string, limit?: number): Suggestion[] =>
  searchLocalPlaces(q, limit).map((p) => ({ id: `local:${p.value}`, main: p.name, secondary: p.secondary, value: p.value }));

/** Local district / popular matches first, then online results that aren't duplicates. */
const mergeSuggestions = (q: string, remote: Suggestion[]): Suggestion[] => {
  const local = hintSuggestions(q, 6);
  const seen = new Set(local.map((s) => s.main.toLowerCase()));
  return [...local, ...remote.filter((s) => !seen.has(s.main.toLowerCase()))].slice(0, 12);
};

const newSession = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()));

// If the suggestions service is unavailable, stop asking and use the local list for every field.
let remoteAvailable = true;

export default function LocationInput({ label, value, onChange, placeholder, required, error, className = "" }: Props) {
  const listId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const session = useRef(newSession());
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Suggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch suggestions (debounced) for what the user typed.
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (!remoteAvailable || q.length < 2) {
      setItems(hintSuggestions(q));
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(q)}&session=${session.current}`, { signal: ctl.signal });
        const data = await res.json();
        if (res.status === 503) remoteAvailable = false;
        setItems(res.ok && data.suggestions?.length ? mergeSuggestions(q, data.suggestions) : hintSuggestions(q));
      } catch (e) {
        if ((e as Error).name !== "AbortError") setItems(hintSuggestions(q));
      } finally {
        if (!ctl.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctl.abort();
    };
  }, [query, open]);

  // Keep the keyboard-highlighted option visible in the (long) list.
  useEffect(() => {
    if (active < 0) return;
    wrap.current?.querySelector('.loc-menu li[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    const on = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", on);
    return () => document.removeEventListener("mousedown", on);
  }, [open]);

  const pick = (s: Suggestion) => {
    onChange(s.value);
    setOpen(false);
    setActive(-1);
    session.current = newSession();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && open && items[active]) {
      e.preventDefault();
      pick(items[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`field ${error ? "invalid" : ""} ${className}`}>
      <label>
        {label} {required && <em>*</em>}
      </label>
      <div className="ctrl loc-ctrl" ref={wrap}>
        <FaLocationDot size={15} />
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => {
            setQuery(value);
            setOpen(true);
          }}
          onKeyDown={onKey}
          placeholder={placeholder ?? "Enter a location"}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
        />
        <button type="button" className="loc-toggle" tabIndex={-1} aria-label={`Show ${label} options`} onClick={() => { setQuery(value); setOpen((o) => !o); }}>
          <FaChevronDown size={12} />
        </button>
        {open && (loading || items.length > 0) && (
          <ul className="loc-menu" id={listId} role="listbox">
            {loading && items.length === 0 && <li className="loc-empty">Searching…</li>}
            {items.map((s, k) => (
              <li
                key={s.id}
                role="option"
                aria-selected={k === active}
                className={k === active ? "active" : ""}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(k)}
                onClick={() => pick(s)}
              >
                <FaLocationDot size={13} />
                <span>
                  <b>{s.main}</b>
                  {s.secondary && <small>{s.secondary}</small>}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="err">{error}</span>}
    </div>
  );
}
