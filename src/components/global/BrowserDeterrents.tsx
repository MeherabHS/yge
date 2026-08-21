'use client';

import { useEffect } from 'react';

function isImageTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('img, picture'));
}

export function BrowserDeterrents() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    const preventContextMenu = (event: MouseEvent) => event.preventDefault();

    const preventImageDrag = (event: DragEvent) => {
      if (isImageTarget(event.target)) event.preventDefault();
    };

    const preventInspectorShortcut = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrlOrCommand = event.ctrlKey || event.metaKey;
      const inspectShortcut =
        (ctrlOrCommand && event.shiftKey && ['c', 'i', 'j', 'k'].includes(key)) ||
        (event.metaKey && event.altKey && ['c', 'i', 'j'].includes(key));
      const viewSourceShortcut = ctrlOrCommand && key === 'u';

      if (event.key === 'F12' || inspectShortcut || viewSourceShortcut) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu, true);
    document.addEventListener('dragstart', preventImageDrag, true);
    document.addEventListener('keydown', preventInspectorShortcut, true);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu, true);
      document.removeEventListener('dragstart', preventImageDrag, true);
      document.removeEventListener('keydown', preventInspectorShortcut, true);
    };
  }, []);

  return null;
}
