import { useMemo } from "react";

const PHONE = "+254788672917";

const FloatingWhatsApp = () => {
  const waLink = useMemo(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(`Hi Adix Plastics, I'd like to place an order. Page: ${url}`);
    const phone = PHONE.replace(/[^\d]/g, "");
    return `https://wa.me/${phone}?text=${text}`;
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* pulse ring */}
      <span className="absolute inset-0 -m-1 rounded-full bg-green-500/30 blur-md animate-ping" aria-hidden="true" />

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-xl bg-gradient-to-br from-green-500 via-green-500 to-emerald-600 text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Order on WhatsApp"
      >
        {/* WhatsApp logo */}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 fill-current">
            <path d="M19.11 17.03c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.62.14-.19.28-.71.9-.87 1.09-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47l-.53-.01c-.19 0-.49.07-.75.35-.25.28-.98.96-.98 2.35s1.01 2.73 1.15 2.92c.14.19 1.99 3.04 4.82 4.26.67.29 1.2.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
            <path d="M26.76 5.25A12.88 12.88 0 0 0 3.74 22.88L2 30l7.28-1.91A12.86 12.86 0 0 0 16 29c7.13 0 12.93-5.8 12.93-12.93 0-3.45-1.35-6.69-3.77-9.12zM16 27.23c-2.23 0-4.4-.59-6.31-1.7l-.45-.27-4.31 1.13 1.15-4.2-.29-.43a10.97 10.97 0 1 1 10.22 5.47z"/>
          </svg>
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-xs uppercase tracking-wide text-white/80">Order now</span>
          <span className="font-semibold">WhatsApp</span>
        </div>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
