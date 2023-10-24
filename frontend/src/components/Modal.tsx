import { Atom, swap, useAtom, deref } from "@dbeining/react-atom";
import { AnimatePresence, motion } from "framer-motion";
import { cn, useDeviceType } from "../utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

export type ModalContentProps = { onClose: () => void };
export type ModalData =
  | undefined
  | {
      title: React.ReactNode;
      key?: string;
      content: (props: ModalContentProps) => React.ReactNode;
      justContent?: boolean;
      onClose?: () => void;
    };

export const modalAtom = Atom.of<ModalData>(undefined);
export const setModal = (data: ModalData) => {
  swap(modalAtom, () => data);
};

export default function Modal() {
  const modal = useAtom(modalAtom);
  function onClose() {
    if (deref(modalAtom)?.title === modal?.title) {
      setModal(undefined);
    }
    modal?.onClose?.();
  }

  const isMobile = useDeviceType("(max-width: 768px)");

  const backdrop = (
    <motion.div
      variants={{
        open: {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        close: {
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(0,0,0,0)",
        },
      }}
      initial="close"
      animate="open"
      exit="close"
      className="fixed left-0 top-0 z-30 h-full w-full"
      onClick={onClose}
    ></motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {!!modal ? (
          <>
            {backdrop}
            <motion.div
              variants={{
                closed: isMobile
                  ? {
                      opacity: 0,
                      translateY: "100%",
                    }
                  : {
                      opacity: 0,
                      scale: 0.75,
                    },
                open: isMobile
                  ? {
                      opacity: 1,
                      translateY: "0%",
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                    },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              initial="closed"
              animate="open"
              exit="closed"
              key={
                modal.key || typeof modal.title === "string"
                  ? (modal.title as string)
                  : undefined
              }
              style={{
                translate: isMobile ? "-50% 0" : "-50% -50%",
                animationName: "fadeIn",
                animationDuration: "0.4s",
                animationIterationCount: 1,
                ...(isMobile
                  ? {
                      translate: "-50% 0%",
                    }
                  : {}),
              }}
              className="sm:w-unset pointer-events-none fixed bottom-0 left-1/2 z-50 flex max-h-[100%] w-[100vw] content-center sm:top-1/2 sm:w-[unset]"
            >
              <div
                className={cn(
                  "pointer-events-auto mx-0 border border-primary-700 bg-primary-500/90 p-4 text-slate-100 backdrop-blur-sm md:mx-4 lg:my-8",
                  // "rounded-xl rounded-b-none md:rounded-b-xl",
                )}
              >
                {modal.title && (
                  <div className="mb-4 grid grid-cols-[auto_1fr_auto] items-start gap-4">
                    <div />
                    <span className="text-center text-xl font-semibold">
                      {modal.title}
                    </span>
                    <div
                      style={{ visibility: "hidden" }}
                      onClick={() => setModal(undefined)}
                    >
                      <XMarkIcon className="h4 w-4" onClick={onClose} />
                    </div>
                  </div>
                )}
                {modal.content({ onClose })}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
