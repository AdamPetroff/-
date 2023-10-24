import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { API_URL } from "../constants";
import { Property } from "../types";
import { useEffect, useState } from "react";
import PropertyItem from "./PropertyItem";
import Pagination from "./Pagination";
import { useAtom } from "@dbeining/react-atom";
import { searchAtom } from "../store";
import Button from "./Button";
import { scrollToTop } from "../utils";
import { GridLoader } from "react-spinners";

const pageSize = 12;

type PropertiesResponse = {
  items: Property[];
  totalItems: number;
  totalPages: number;
};

export default function Demo() {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  // const [usingPages, setUsingPages] = useState(false);
  const search = useAtom(searchAtom);
  const [total, setTotal] = useState({ pages: 1, items: 1 });
  const [paginationMode, setPaginationMode] = useState<
    "infiniteScroll" | "pages"
  >("pages");
  const { data: searchData, isLoading: isSearchLoading } = useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      if (search) {
        return (
          await (await fetch(`${API_URL}/search?search=${search}`)).json()
        ).items as Property[];
      }
    },
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["properties"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const data = (await (
        await fetch(
          `${API_URL}/properties?page=${pageParam}&pageSize=${pageSize}`,
        )
      ).json()) as PropertiesResponse;

      setTotal({ pages: data.totalPages, items: data.totalItems });

      return data.items;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });

  const handleScroll = () => {
    if (paginationMode !== "infiniteScroll") return;
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 10 ||
      isFetchingNextPage
    ) {
      return;
    }
    fetchNextPage();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage]);

  const handleNextPage = () => {
    setLastPage(page);
    setPage(page + 1);
    setPaginationMode("pages");
    if (!data?.pages[page]) {
      fetchNextPage();
    }
    scrollToTop();
  };
  const handlePrevPage = () => {
    setLastPage(page);
    setPage(page > 1 ? page - 1 : 1);
    setPaginationMode("pages");
    scrollToTop();
  };

  const handleLoadMore = () => {
    setPaginationMode("infiniteScroll");
    fetchNextPage();
  };

  const itemsToShow =
    search && searchData
      ? searchData
      : (paginationMode === "pages"
          ? isFetchingNextPage
            ? data?.pages[lastPage - 1]
            : data?.pages[page - 1]
          : data?.pages.flat()) || [];

  if (isSearchLoading) {
    return (
      <div className="container mx-auto mt-20 flex h-full justify-center text-primary">
        <div>
          <GridLoader color="#002349" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex h-full flex-col px-2">
      <h1 className="mt-8 font-sans text-xl font-light">
        {search
          ? `Search results for "${search}":`
          : `Viewing ${total.items} Apartments for Sale`}
      </h1>

      <div className="mt-4 grid flex-grow grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {itemsToShow.map((property) => (
          <PropertyItem property={property} key={property.id} />
        ))}
      </div>

      {!search && itemsToShow.length && paginationMode === "pages" ? (
        <div className="my-6 flex flex-col items-center justify-evenly gap-8 sm:my-8 sm:gap-12">
          <Button className="px-8" onClick={handleLoadMore}>
            Load more...
          </Button>
          <Pagination
            page={page}
            totalItems={total.items}
            totalPages={total.pages}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            itemsPerPage={pageSize}
          />
        </div>
      ) : null}
    </div>
  );
}
