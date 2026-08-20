'use client';

import { useEffect } from 'react';

function isImageTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('img, picture'));
}

export function BrowserDeterrents() {
  useEffect(() => {
    const preventImageAction = (event: MouseEvent | DragEvent) => {
      if (isImageTarget(event.target)) event.preventDefault();
    };

    const preventInspectorShortcut = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;
      const inspectShortcut = modifier && event.shiftKey && ['c', 'i', 'j'].includes(key);
      const viewSourceShortcut = modifier && key === 'u';

      if (event.key === 'F12' || inspectShortcut || viewSourceShortcut) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventImageAction);
    document.addEventListener('dragstart', preventImageAction);
    document.addEventListener('keydown', preventInspectorShortcut);

    return () => {
      document.removeEventListener('contextmenu', preventImageAction);
      document.removeEventListener('dragstart', preventImageAction);
      document.removeEventListener('keydown', preventInspectorShortcut);
    };
  }, []);

  return null;
}
