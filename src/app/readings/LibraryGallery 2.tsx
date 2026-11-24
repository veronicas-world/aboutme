"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import styles from "./library.module.css";

interface LibrarySection {
  id: string;
  label: string;
  cover?: string;
  content: ReactNode;
}

export default function LibraryGallery({ sections }: { sections: LibrarySection[] }) {
  const [selected, setSelected] = useState<LibrarySection | null>(null);
  const [paused, setPaused] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const backdropPress = useRef(false);

  useLayoutEffect(() => {
    const panel = dialog.current;
    if (!selected || !panel || panel.open) return;
    const card = opener.current?.getBoundingClientRect();
    if (card) {
      panel.style.setProperty("--reveal-x", `${card.left + card.width / 2 - window.innerWidth / 2}px`);
      panel.style.setProperty("--reveal-y", `${card.top + card.height / 2 - window.innerHeight / 2}px`);
    }
    panel.showModal();
    closeButton.current?.focus({ preventScroll: true });
  }, [selected]);

  return (
    <>
      <ul className={styles.cards} data-paused={paused || selected !== null}>
        {sections.map((section, index) => {
          const position = {
            "--card-angle": `${(index * 360) / sections.length}deg`,
          } as CSSProperties;

          return (
            <li key={section.id} className={styles.cardPosition} style={position}>
              <button
                type="button"
                className={styles.card}
                aria-haspopup="dialog"
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setSelected(section);
                }}
              >
                <span
                  className={styles.cover}
                  data-category={section.id}
                  aria-hidden="true"
                >
                  {section.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={section.cover} alt="" />
                  )}
                </span>
                <span className={styles.label}>{section.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={styles.rotationControl}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Resume rotation" : "Pause rotation"}
      </button>

      <dialog
        ref={dialog}
        className={styles.detail}
        aria-labelledby="library-detail-title"
        onPointerDown={(event) => {
          backdropPress.current = event.target === event.currentTarget;
        }}
        onClick={(event) => {
          if (backdropPress.current && event.target === event.currentTarget) event.currentTarget.close();
          backdropPress.current = false;
        }}
        onClose={() => {
          setSelected(null);
          opener.current?.focus({ preventScroll: true });
        }}
      >
        {selected && (
          <div className={styles.panel}>
            <header className={styles.detailHeader}>
              <button
                ref={closeButton}
                type="button"
                className={styles.back}
                onClick={() => dialog.current?.close()}
              >
                <span aria-hidden="true">←</span> Back to Library
              </button>
              <h2 id="library-detail-title">{selected.label}</h2>
            </header>
            <div className={styles.detailContent}>{selected.content}</div>
          </div>
        )}
      </dialog>
    </>
  );
}
