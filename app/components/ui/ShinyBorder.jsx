import { cn } from "../../lib/utils";

export function ShinyBorder({ color, className, children }) {
  return (
    <div className={cn(`relative  bg-[#ffffff10]`, className)}>
      <div
        style={{
          "--border-width": `2px`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background-radial-gradient": `radial-gradient(transparent,transparent,transparent,transparent,${
            color instanceof Array ? color.join(",") : color
          },transparent,transparent)`,
        }}
        className={`before:bg-shine-size pointer-events-none before:absolute opacity-70 before:inset-0 before:size-full before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine`}
      ></div>

      {children}
    </div>
  );
}
