import { Atom, swap } from "@dbeining/react-atom";
export const searchAtom = Atom.of<string | null>(null);

export const setSearch = (data: string | null) => {
  swap(searchAtom, () => data);
};
