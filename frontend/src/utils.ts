import clsx, { ClassValue } from "clsx";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(amount);
  return `${formattedAmount} ${currency}`;
}

export function scrollToTop() {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 300);
}

export const useDeviceType = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      window?.addEventListener("resize", () => setMatches(media.matches));
      return () => {
        window?.removeEventListener("resize", () => setMatches(media.matches));
      };
    }
  }, [matches, query]);

  return matches;
};
