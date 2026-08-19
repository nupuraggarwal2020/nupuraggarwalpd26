import { HeroParticles } from "@/components/HeroParticles";
import { HeroText } from "@/components/HeroText";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden bg-night px-6 text-center text-night-ink">
      <HeroParticles />
      <HeroText />
      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <span className="meta text-night-ink/60">Projects</span>
        </div>
      </div>
    </section>
  );
}
