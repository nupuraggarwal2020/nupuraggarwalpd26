/**
 * Traveling border light (from the reference video): a small gradient comet
 * makes one 1s orbit of the element's edge when its `group` parent is
 * hovered, then fades out; re-hovering restarts it.
 * Drop inside any `group relative` element with a border-radius.
 * Styles live in globals.css (.glow-border).
 */
export function GlowBorder() {
  return <span aria-hidden className="glow-border" />;
}
