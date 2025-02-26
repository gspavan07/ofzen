import { cn } from "../../lib/utils";

export function Window({ color, className, children }) {
  return (
    <>
      <div className="absolute bottom-32 md:bottom-24 blur-xl md:blur-3xl rounded-full w-[70%] md:w-[1000px] h-[100px] md:h-[300px] bg-[#206C47] z-0" />
      <div
        className={cn(
          "relative min-h-[50px] sm:min-h-[60px] w-full sm:w-fit min-w-[250px] sm:min-w-[300px] place-items-center rounded-b-none rounded-t-xl p-2 sm:p-3 bg-background border",
          className
        )}
      >
        <div
          style={{
            "--border-width": `2px`,
            "--border-radius": `20px`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient( transparent,transparent,transparent,${
              color instanceof Array ? color.join(",") : color
            })`,
          }}
          className={`before:bg-shine-size pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine`}
        ></div>

        {children}
      </div>
    </>
  );
}
