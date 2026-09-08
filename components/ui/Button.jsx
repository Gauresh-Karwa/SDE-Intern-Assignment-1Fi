export default function Button({ variant = "solid", className = "", children, ...props }) {
  const base =
    variant === "outline" ? "pill-btn-outline" : variant === "primary" ? "pill-btn-primary" : "pill-btn-solid";
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
