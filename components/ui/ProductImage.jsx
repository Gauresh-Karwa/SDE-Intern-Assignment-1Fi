export default function ProductImage({ name, src, className = "" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        className={`object-contain ${className}`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-brand-50 text-brand-600 font-bold rounded-xl ${className}`}
      aria-label={`${name} image placeholder`}
    >
      <span className="text-3xl tracking-tight">{initials}</span>
    </div>
  );
}
