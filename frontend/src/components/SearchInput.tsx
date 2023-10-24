import { deref } from "@dbeining/react-atom";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React, { useRef, ChangeEvent } from "react";
import { setSearch, searchAtom } from "../store";
import { scrollToTop, cn } from "../utils";

export default function SearchInput() {
  const [localSearchTerm, setLocalSearchTerm] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const onSubmit = (value: string | null) => {
    setSearch(value);
  };

  const handleSubmit = () => {
    inputRef.current?.blur();
    onSubmit(localSearchTerm);

    scrollToTop();
  };

  const resetSearch = () => {
    setLocalSearchTerm("");
    onSubmit(null);
  };

  return (
    <div className={cn(`relative overflow-hidden`)}>
      <input
        className={cn(
          "relative block w-full py-2 pl-3 pr-10 text-center leading-tight text-black focus:border-gray-500 focus:text-left focus:outline-none",
          "rounded-full",
        )}
        ref={inputRef}
        type="text"
        placeholder={'"3+1 in Prague"'}
        value={localSearchTerm}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          } else if (event.key === "Escape") {
            if (inputRef.current) {
              inputRef.current.value = deref(searchAtom) || "";
              inputRef.current?.blur();
            }
          }
        }}
      />
      <div
        onClick={localSearchTerm ? resetSearch : handleSubmit}
        className="absolute inset-y-0 right-0 flex items-center rounded-full border-2 border-white px-2 text-slate-700 transition duration-200 hover:bg-slate-200 active:bg-slate-300"
      >
        {localSearchTerm ? (
          <XMarkIcon className="h-4 w-4 transition duration-500 hover:scale-110 active:scale-90" />
        ) : (
          <MagnifyingGlassIcon className="h-4 w-4 transition duration-500 hover:scale-110 active:scale-90" />
        )}
      </div>
    </div>
  );
}
