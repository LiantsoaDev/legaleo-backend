export function getCaretPosition() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const rects = range.getClientRects();
  if (rects.length === 0) return null;

  const rect = rects[0];
  return { x: rect.left, y: rect.top, height: rect.height };
}
