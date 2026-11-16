const fills = {
  cream: "fill-cream",
  pink: "fill-pink",
  sky: "fill-sky",
  sage: "fill-sage",
  blush: "fill-blush",
} as const;

export type WaveColor = keyof typeof fills;

function Wave({ fill }: { fill: WaveColor }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="block h-full w-1/2 shrink-0"
      aria-hidden="true"
    >
      <path
        className={fills[fill]}
        d="M0 40C180 80 360 0 540 40C720 80 900 0 1080 40C1260 80 1440 8 1440 40V80H0Z"
      />
    </svg>
  );
}

export function WaveDivider({
  from,
  to,
}: {
  from: WaveColor;
  to: WaveColor;
}) {
  const backgrounds = {
    cream: "bg-cream",
    pink: "bg-pink",
    sky: "bg-sky",
    sage: "bg-sage",
    blush: "bg-blush",
  } as const;

  return (
    <div className={`-mt-px h-12 w-full overflow-hidden md:h-16 ${backgrounds[from]}`} aria-hidden="true">
      <div className="animate-wave flex h-full w-[200%]">
        <Wave fill={to} />
        <Wave fill={to} />
      </div>
    </div>
  );
}

export function FooterWave() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-full h-12 overflow-hidden md:h-16" aria-hidden="true">
      <div className="animate-wave flex h-full w-[200%]">
        <Wave fill="sage" />
        <Wave fill="sage" />
      </div>
    </div>
  );
}
