"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  src?: string;
}

export function PreviewModal({ open, onClose, title, src }: PreviewModalProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [open, src]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="mx-auto w-full max-w-4xl rounded-2xl bg-[var(--color-surface)] shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <h3 className="text-sm font-semibold text-[var(--color-primary)]">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close preview"
                className="rounded-md p-1 text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-b-2xl bg-black">
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
                </div>
              )}

              {src ? (
                // sandbox iframe for live demos
                <iframe
                  src={src}
                  title={title}
                  className="h-full w-full border-0"
                  loading="lazy"
                  sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
                  onLoad={() => setLoading(false)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[var(--color-secondary)]">No preview available</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
