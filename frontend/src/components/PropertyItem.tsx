import { motion } from "framer-motion";
import { Property } from "../types";
import { formatCurrency } from "../utils";

export default function PropertyItem({ property }: { property: Property }) {
  return (
    <motion.a
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      href={property.url}
      key={property.id}
    >
      <div className="group flex h-full flex-col overflow-hidden rounded bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative">
          <img src={property.imgSrc} alt={property.name} />
          <div className="absolute left-0 top-0 grid h-full w-full place-content-center bg-black/70 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <span className="text-shadow text-md font-light text-white transition-all duration-200 group-hover:text-lg">
              View Property
            </span>
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-2 p-3">
          <div className="font-light">{property.name}</div>
          <span className="flex-grow font-light text-slate-500">
            {property.locality}
          </span>
          <span className="font-serif text-xl">
            {formatCurrency(property.priceCzk, "CZK")}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
