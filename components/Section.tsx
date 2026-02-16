import { cn } from "@/lib/utils";

export default function Section({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("py-16 sm:py-20", className)}
      {...props}
    >
      {children}
    </section>
  );
}
