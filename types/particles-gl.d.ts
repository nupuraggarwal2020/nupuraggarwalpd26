declare module "particles-gl" {
  export type ParticlesGLInstance = {
    init: () => void;
    cleanup: () => void;
    updateOptions: (options: Record<string, unknown>) => void;
    options: Record<string, unknown>;
  };

  export type ParticlesGLOptions = {
    target: string;
    character?: string;
    particleSize?: number;
    particleSpacing?: number;
    particleColor?: string;
    sampling?: number;
    tilt?: boolean;
    tiltFactor?: number;
    tiltSpeed?: number;
    displaceStrength?: number;
    displaceRadius?: number;
    velocityInfluence?: number;
    returnSpeed?: number;
    fontSize?: number;
    fontFamily?: string;
    videoUpdateRate?: number;
    modelScale?: number;
    geometry?: Array<[number, number, number]> | null;
    on?: {
      init?: (instance: ParticlesGLInstance) => void;
    };
  };

  const particlesGL: (options: ParticlesGLOptions) => ParticlesGLInstance;
  export default particlesGL;
}
