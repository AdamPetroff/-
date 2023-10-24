import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "../utils";
import Logo from "./Logo";
import { setModal } from "./Modal";
import SearchInput from "./SearchInput";

function SearchBar() {
  return (
    <div
      className={cn(
        "group after:pointer-events-none after:fixed after:left-0 after:top-0 after:z-10 after:block after:h-full after:w-full after:opacity-50 focus-within:after:bg-black",
      )}
    >
      <div
        className={cn(
          "relative z-20 rounded-bl-[20px] rounded-br-[20px] rounded-tl-[20px] rounded-tr-[20px] bg-white focus-within:rounded-b-none",
        )}
      >
        <SearchInput />
        <div className="relative">
          <div className="absolute hidden rounded-bl-[20px] rounded-br-[20px] bg-white p-4 pt-0 group-focus-within:block">
            <div className="mb-4 h-[1px] w-full bg-slate-300" />
            <h3 className="mb-2 font-semibold text-black">
              How to use the search feature
            </h3>
            <p className="text-black">
              The search feature is powered by machine learning. You can use
              natural language queries like "3+1 in Prague" or "2+kk in Brno" to
              find what you're looking for.
            </p>
            <h3 className="mb-2 mt-4 font-semibold text-red-500">
              Please note
            </h3>
            <p className="text-red-500">
              The search is an experimental feature. Results may (will) be
              inaccurate or not as expected. I'm still figuring it out.
            </p>
            <p className="text-red-500">
              If you didn't include your own OpenAI API key in the backend .env
              file, the search feature will default to a simple keyword search.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = React.useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.nav
      variants={{
        var1: {
          top: "0px",
        },
        var2: {
          top: "-100px",
        },
      }}
      animate={isVisible ? "var1" : "var2"}
      className={`sticky top-0 z-30 bg-primary py-6 text-slate-100 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between px-2">
        <div className="block flex-1 sm:hidden" />
        <div className="flex-2 contents sm:mr-6 sm:block sm:flex-1">
          <Logo />
        </div>
        <div className="block flex-1 pr-2 sm:hidden">
          <div
            onClick={() => {
              setModal({
                title: "Search",
                content: () => (
                  <>
                    <div className="mb-4">
                      <SearchInput />
                    </div>
                    <div className="font-thin text-white">
                      <h3 className="mb-2 font-semibold">
                        How to use the search feature
                      </h3>
                      <p>
                        The search feature is powered by machine learning. You
                        can use natural language queries like "3+1 in Prague" or
                        "2+kk in Brno" to find what you're looking for.
                      </p>
                      <h3 className="mb-2 mt-4 font-semibold text-red-500">
                        Please note
                      </h3>
                      <p className="text-red-500">
                        The search is an experimental feature. Results may
                        (will) be inaccurate or not as expected. I'm still
                        figuring it out.
                      </p>
                      <p className="text-red-500">
                        If you didn't include your own OpenAI API key in the
                        backend .env file, the search feature will default to a
                        simple keyword search.
                      </p>
                    </div>
                  </>
                ),
              });
            }}
            className="ml-auto h-6 w-6 text-slate-100 hover:text-slate-200 active:text-slate-500"
          >
            <MagnifyingGlassIcon />
          </div>
        </div>
        <div className="hidden flex-[2] sm:block">
          <motion.div
            variants={{
              var1: {
                top: "0px",
              },
              var2: {
                top: "100px",
              },
            }}
            transition={!isVisible ? { delay: 0.5 } : {}}
            animate={isVisible ? "var1" : "var2"}
            className={cn(
              `relative`,
              isVisible
                ? "shadow-none"
                : "rounded-full border-2 border-primary-100 shadow-xl",
            )}
          >
            <SearchBar />
          </motion.div>
        </div>
        <div className="hidden flex-1 md:block" />
      </div>
    </motion.nav>
  );
}
