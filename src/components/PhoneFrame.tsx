type Props = {
  src: string;
  alt: string;
  variant?: "full" | "detail";
  tilt?: "left" | "right" | "none";
  accent?: string;
  className?: string;
};

export default function PhoneFrame({
  src,
  alt,
  variant = "full",
  tilt = "none",
  accent = "#00D9B4",
  className = "",
}: Props) {
  if (variant === "detail") {
    return (
      <div
        className={`detail-frame ${className}`}
        style={{ ["--accent" as string]: accent }}
      >
        <img src={src} alt={alt} loading="lazy" />
      </div>
    );
  }

  return (
    <div
      className={`phone-frame tilt-${tilt} ${className}`}
      style={{ ["--accent" as string]: accent }}
    >
      <div className="phone-notch" />
      <div className="phone-screen">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
