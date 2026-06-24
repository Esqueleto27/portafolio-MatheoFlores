import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "default" | "compact";

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> & {
    as?: "button";
  };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonOwnProps> & {
    as: "a";
  };

// Accepts any component (e.g. next-intl Link) via passthrough
type ButtonAsOther = ButtonOwnProps & {
  as: ElementType;
  [key: string]: unknown;
};

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsOther;

export function Button({
  variant = "primary",
  size = "default",
  as: Tag = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = variant === "primary" ? "btn-primary" : "btn-secondary";
  const sizeClass = size === "compact" ? "compact" : "";
  const cls = [base, sizeClass, className].filter(Boolean).join(" ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag className={cls} {...(props as any)}>{children}</Tag>;
}
