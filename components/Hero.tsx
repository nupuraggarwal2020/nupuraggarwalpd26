import { HeroParticles } from "@/components/HeroParticles";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden bg-night px-6 text-center text-night-ink">
      <HeroParticles />
      <h1 className="display relative z-10 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)]">
        I design how complex technical systems become{" "}
        <em className="italic">usable</em> products.
      </h1>
      <p className="absolute inset-x-0 bottom-20 z-10 mx-auto max-w-xl px-6 text-base leading-relaxed text-pretty text-night-ink/70 md:text-lg">
        I bring systems thinking to develop and ship innovative products.
        Currently focused on AI-powered workflows and developer ecosystems at{" "}
        <strong className="font-semibold text-night-ink">Canva</strong>.
      </p>
      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <span className="meta text-night-ink/60">Projects</span>
        </div>
      </div>
    </section>
  );
}
