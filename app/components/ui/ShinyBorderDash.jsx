import { cn } from "../../lib/utils";

export function ShinyBorderDash({ color, className, children }) {
  return (
    <div
      className={cn(
        "relative w-full sm:min-w-[300px] place-items-center bg-background rounded-tl-[70px] rounded-br-[70px] lg:rounded-tl-[100px] lg:rounded-br-[100px]",
        className
      )}
    >
      <div
        style={{
          "--border-width": `2px`,
          "--border-radius": `150px`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background-radial-gradient": `radial-gradient(transparent,transparent,${
            color instanceof Array ? color.join(",") : color
          },transparent)`,
        }}
        className={`before:absolute before:inset-0 before:size-full before:rounded-tl-[70px] opacity-70 before:rounded-br-[70px] lg:before:rounded-tl-[100px] lg:before:rounded-br-[100px] before:p-[--border-width] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine`}
      ></div>

      {children}
    </div>
  );
}
