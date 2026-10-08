type Props = {
  src: string;
  alt: string;
  variant?: "full" | "detail";
  device?: "mobile" | "desktop";
  tilt?: "left" | "right" | "none";
  accent?: string;
  className?: string;
  url?: string;
};

export default function PhoneFrame({
  src,
  alt,
  variant = "full",
  device = "mobile",
  tilt = "none",
  accent = "#00D9B4",
  className = "",
  url,
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

  if (device === "desktop") {
    return (
      <div
        className={`browser-frame tilt-${tilt} ${className}`}
        style={{ ["--accent" as string]: accent }}
      >
        <div className="browser-bar">
          <div className="browser-dots">
            <span className="browser-dot red" />
            <span className="browser-dot yellow" />
            <span className="browser-dot green" />
          </div>
          {url && (
            <span className="browser-url-bar">
              {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          )}
        </div>
        <div className="browser-screen">
          <img src={src} alt={alt} loading="lazy" />
        </div>
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
