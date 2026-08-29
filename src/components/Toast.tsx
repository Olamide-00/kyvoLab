import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ToastCtx = (msg: string) => void;
const Ctx = createContext<ToastCtx>(() => {});

export function useToast() {
  return useContext(Ctx);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 3400);
  }, []);

  return (
    <Ctx.Provider value={show}>
      {children}
      {msg && <div className="toast">{msg}</div>}
    </Ctx.Provider>
  );
}
