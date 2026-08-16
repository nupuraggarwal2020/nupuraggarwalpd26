type Variant = "chat" | "browser" | "cards" | "plain";

type MediaProps = {
  /** Path under /public, e.g. "/work/canva-ai/fig-1.mp4". Omit for a placeholder. */
  src?: string;
  alt?: string;
  /** Figure number for the caption, e.g. 1 → "Fig 1 · …" */
  fig?: number;
  caption?: string;
  /** What should eventually go here — shown on the placeholder only. */
  note?: string;
  /** Tailwind aspect class for the placeholder frame only. */
  aspect?: string;
  tint: string;
  tone: string;
  variant?: Variant;
};

const VIDEO_RE = /\.(mp4|webm|mov)$/i;

/* Skeleton sketches drawn in the case tint/tone — stand-ins until real
   screenshots and recordings are dropped into /public/work/… */

function ChatSketch({ tone }: { tone: string }) {
  return (
    <div className="flex h-full w-full max-w-md flex-col justify-end gap-3">
      <div className="ml-auto h-9 w-3/5 rounded-2xl rounded-br-md bg-ink/10" />
      <div
        className="h-24 w-4/5 rounded-2xl rounded-bl-md"
        style={{ background: tone, opacity: 0.55 }}
      />
      <div
        className="h-9 w-1/2 rounded-2xl rounded-bl-md"
        style={{ background: tone, opacity: 0.3 }}
      />
      <div className="mt-1 flex h-11 items-center rounded-full border border-ink/15 bg-white/70 px-4">
        <div className="h-2 w-1/3 rounded-full bg-ink/15" />
      </div>
    </div>
  );
}

function BrowserSketch({ tone }: { tone: string }) {
  return (
    <div className="flex h-full w-full max-w-lg flex-col rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(22,20,15,0.12)]">
      <div className="mb-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        ))}
      </div>
      <div
        className="mb-4 h-8 w-2/5 rounded-lg"
        style={{ background: tone, opacity: 0.5 }}
      />
      <div className="flex flex-col gap-2.5">
        {["82%", "64%", "91%", "48%"].map((w) => (
          <div
            key={w}
            className="h-2.5 rounded-full"
            style={{ width: w, background: tone, opacity: 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}

function CardsSketch({ tone }: { tone: string }) {
  return (
    <div className="flex h-full w-full max-w-lg items-stretch gap-4">
      {[0.5, 0.3].map((opacity, i) => (
        <div
          key={i}
          className="flex flex-1 flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(22,20,15,0.12)]"
        >
          <div
            className="h-6 w-16 rounded-full"
            style={{ background: tone, opacity }}
          />
          <div className="flex flex-col gap-2.5">
            {["73%", "57%", "82%"].map((w) => (
              <div
                key={w}
                className="h-2.5 rounded-full"
                style={{ width: w, background: tone, opacity: 0.35 }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Case study figure. Real media keeps its intrinsic size (width 100%,
 * height auto). The tinted rounded frame is padding, not a crop window.
 * Placeholders still use a fixed aspect box.
 */
export function Media({
  src,
  alt = "",
  fig,
  caption,
  note,
  aspect = "aspect-[16/9]",
  tint,
  tone,
  variant = "plain",
}: MediaProps) {
  return (
    <figure>
      {src ? (
        <div
          className="w-full overflow-hidden rounded-3xl p-3 md:p-4"
          style={{ background: tint }}
        >
          {VIDEO_RE.test(src) ? (
            <video
              src={src}
              className="h-auto w-full"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            // Native img so the file keeps its original aspect. next/image
            // fill + a fixed aspect box crops or letterboxes the shot.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="h-auto w-full" />
          )}
        </div>
      ) : (
        <div
          className={`relative w-full overflow-hidden rounded-3xl ${aspect}`}
          style={{ background: tint }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
            {variant === "chat" && <ChatSketch tone={tone} />}
            {variant === "browser" && <BrowserSketch tone={tone} />}
            {variant === "cards" && <CardsSketch tone={tone} />}
          </div>
          {note && (
            <span className="meta absolute right-4 bottom-3 text-ink/40">
              {note}
            </span>
          )}
        </div>
      )}
      {caption && (
        <figcaption className="meta mt-3 text-faint">
          {fig != null && <span className="text-night-ink/60">Fig {fig}</span>}
          {fig != null && " · "}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
