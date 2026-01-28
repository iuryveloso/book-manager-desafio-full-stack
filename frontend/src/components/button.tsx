import { Button as UiButton } from "@/components/ui/button";

interface Button {
  className?: string;
  onClick?: () => void;
  borderless?: boolean;
  underline?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}

export default function Button({
  onClick,
  className,
  borderless,
  underline,
  disabled,
  children,
  variant,
}: Button) {
  const border = !borderless ? "border border-gray-300" : "";
  return (
    <div className={"flex"}>
      <UiButton
        className={`w-full ${underline ? "underline" : ""} ${border} ${className}`}
        variant={variant ?? "default"}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </UiButton>
    </div>
  );
}
