import { useEffect, useState } from "react";

export default function Typed({
  strings,
  speed = 45,
  pause = 1400,
}: {
  strings: string[];
  speed?: number;
  pause?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = strings[i % strings.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < full.length) {
      timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), speed / 2);
    } else {
      setDeleting(false);
      setI((v) => (v + 1) % strings.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, strings, speed, pause]);

  return (
    <>
      {text}
      <span className="type-cursor">▌</span>
    </>
  );
}
