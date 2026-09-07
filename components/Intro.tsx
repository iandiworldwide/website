"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { introContent } from "@/lib/content";
import { buildSequence } from "@/lib/marks";

const GRACE_MS = 700; // long enough to see it flicker before it can be dismissed
const HOLD_MS = 420; // how long the real mark holds before the screen goes
const FADE_MS = 900;
const SAFETY_MS = 9000; // nobody is ever stuck here

// Set on the client after the first play, so returning to the home page
// during the same visit does not replay it. A fresh load starts over.
let hasPlayed = false;

/*
  The opening screen, on the home page only. It opens on i&i, flickers through
  every other way of writing "i and i", and always lands back on i&i before it
  fades. It leaves on the first sign of intent: a mouse move, a scroll, a tap
  or a keystroke.

  It is rendered on the server so there is no flash of the site beforehand,
  and a noscript rule hides it when JavaScript is unavailable, so it can
  never sit over the site with no way to dismiss it.
*/
export default function Intro() {
  const pathname = usePathname();
  const [sequence] = useState(() => buildSequence(introContent.final));
  const [frame, setFrame] = useState(0);
  const [armed, setArmed] = useState(false);
  const [landed, setLanded] = useState(false);
  const [out, setOut] = useState(false);
  // Reads false on the server and on the very first client render, so the
  // markup matches; true on any later visit to the home page.
  const [gone, setGone] = useState(() => hasPlayed);

  const showing = pathname === "/" && !gone;

  // Flicker through the sequence in order, so every variation gets a turn.
  useEffect(() => {
    if (!showing || landed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const tick = () => {
      setFrame((current) => (current + 1) % sequence.length);
      timer = window.setTimeout(tick, 150 + Math.random() * 210);
    };
    timer = window.setTimeout(tick, 320);
    return () => window.clearTimeout(timer);
  }, [showing, landed, sequence.length]);

  // Hold the page still underneath, and let it go again on the way out.
  useEffect(() => {
    if (!showing) return;
    hasPlayed = true;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showing]);

  // Arm after a beat, so a mouse already in motion cannot skip it instantly.
  useEffect(() => {
    if (!showing) return;
    const timer = window.setTimeout(() => setArmed(true), GRACE_MS);
    return () => window.clearTimeout(timer);
  }, [showing]);

  // Any sign of intent snaps back to the real mark and stops the flicker.
  useEffect(() => {
    if (!showing || !armed || landed) return;
    const leave = () => {
      setFrame(0);
      setLanded(true);
    };
    const passive = { passive: true } as const;
    window.addEventListener("mousemove", leave, passive);
    window.addEventListener("wheel", leave, passive);
    window.addEventListener("touchmove", leave, passive);
    window.addEventListener("touchstart", leave, passive);
    window.addEventListener("keydown", leave);
    window.addEventListener("click", leave);
    const safety = window.setTimeout(leave, SAFETY_MS);
    return () => {
      window.removeEventListener("mousemove", leave);
      window.removeEventListener("wheel", leave);
      window.removeEventListener("touchmove", leave);
      window.removeEventListener("touchstart", leave);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("click", leave);
      window.clearTimeout(safety);
    };
  }, [showing, armed, landed]);

  // Hold on the real mark, then fade.
  useEffect(() => {
    if (!landed) return;
    const timer = window.setTimeout(() => setOut(true), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [landed]);

  // Take it out of the document once it has faded.
  useEffect(() => {
    if (!out) return;
    document.body.style.overflow = "";
    const timer = window.setTimeout(() => setGone(true), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [out]);

  if (!showing) return null;

  return (
    <div className="intro" data-out={out || undefined} aria-hidden="true">
      <noscript>
        <style>{`.intro{display:none}`}</style>
      </noscript>
      <div className="text-center">
        <p className="intro-mark text-hero-sm">{sequence[frame]}</p>
        {introContent.hint && <p className="intro-hint text-caption">{introContent.hint}</p>}
      </div>
    </div>
  );
}
