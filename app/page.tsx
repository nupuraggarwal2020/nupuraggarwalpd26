import { Hero } from "@/components/Hero";
import { CaseStack } from "@/components/CaseStack";
import { MoreProjects } from "@/components/MoreProjects";

export default function Home() {
  return (
    // The page sheet scrolls over the fixed footer (curtain reveal).
    <main className="relative z-10 mb-[560px] rounded-b-[48px] bg-night shadow-[0_24px_60px_rgba(0,0,0,0.6)] md:mb-[600px]">
      <Hero />
      <CaseStack />
      <MoreProjects />
    </main>
  );
}
