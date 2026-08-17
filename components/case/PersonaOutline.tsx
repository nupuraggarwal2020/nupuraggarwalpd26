/** 1.5px cyan-to-navy stroke. Image sits flush against the stroke. */
export function PersonaOutline({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderRadius: 16,
        padding: 1.5,
        background: "linear-gradient(to bottom, #7ec8ff, #1e4d9c)",
      }}
    >
      <div
        className="block overflow-hidden [&>*]:block [&>*]:h-auto [&>*]:w-full"
        style={{ borderRadius: 16 }}
      >
        {children}
      </div>
    </div>
  );
}
