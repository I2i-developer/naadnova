"use client";

import Image from "next/image";
import { Maximize, Minimize, Share2, X, ZoomIn, ZoomOut } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import styles from "./GalleryLightbox.module.css";

type Props = {
  slide: { title: string; caption: string; image: string };
  onClose: () => void;
};

export function GalleryLightbox({ slide, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !document.fullscreenElement) onClose();
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(3, value + 0.25));
      if (event.key === "-") setZoom((value) => Math.max(1, value - 0.25));
      if (event.key === "Tab") {
        const buttons = rootRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }

    function syncFullscreen() { setFullscreen(document.fullscreenElement === rootRef.current); }
    window.addEventListener("keydown", handleKey);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("fullscreenchange", syncFullscreen);
      previousFocus?.focus();
    };
  }, [onClose]);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await rootRef.current?.requestFullscreen();
    } catch { setMessage("Fullscreen is unavailable in this browser."); }
  }

  async function share() {
    const url = new URL(slide.image, window.location.origin).href;
    try {
      if (navigator.share) await navigator.share({ title: slide.title, text: slide.caption, url });
      else { await navigator.clipboard.writeText(url); setMessage("Image link copied."); }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setMessage("Sharing is unavailable in this browser.");
    }
  }

  function closeOutsideImage(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as Element).closest("button")) return;
    const image = imageRef.current;
    if (event.target === image && image?.naturalWidth && image.naturalHeight) {
      // Contain sizing leaves clickable empty space within the image element.
      const bounds = image.getBoundingClientRect();
      const scale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const left = bounds.left + (bounds.width - width) / 2;
      const top = bounds.top + (bounds.height - height) / 2;
      if (event.clientX >= left && event.clientX <= left + width && event.clientY >= top && event.clientY <= top + height) return;
    }
    onClose();
  }

  return createPortal(
    <div ref={rootRef} className={styles.viewer} role="dialog" aria-modal="true" aria-label={slide.title} onClick={closeOutsideImage}>
      <header className={styles.toolbar}>
        <span className={styles.counter}>{Math.round(zoom * 100)}%</span>
        <div>
          <button type="button" title="Zoom out" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((value) => Math.max(1, value - 0.25))}><ZoomOut size={22} /></button>
          <button type="button" title="Zoom in" aria-label="Zoom in" disabled={zoom >= 3} onClick={() => setZoom((value) => Math.min(3, value + 0.25))}><ZoomIn size={22} /></button>
          <button type="button" title={fullscreen ? "Exit fullscreen" : "Full screen"} aria-label={fullscreen ? "Exit fullscreen" : "Full screen"} onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize size={22} /> : <Maximize size={22} />}</button>
          <button type="button" title="Share image" aria-label="Share image" onClick={() => void share()}><Share2 size={22} /></button>
          <button ref={closeRef} type="button" title="Close" aria-label="Close expanded image" onClick={onClose}><X size={25} /></button>
        </div>
      </header>
      <div className={styles.stage} key={slide.image}>
        <div className={styles.imageSpace} style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}>
          <Image ref={imageRef} src={slide.image} alt={slide.title} fill unoptimized sizes="100vw" priority draggable={false} className={styles.image} />
        </div>
      </div>
      <footer className={styles.caption}><strong>{slide.title}</strong><p>{slide.caption}</p><span role="status">{message}</span></footer>
    </div>,
    document.body
  );
}
