import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Button from "./Button";

export default function Pagination({
  page,
  totalItems,
  totalPages,
  handleNextPage,
  handlePrevPage,
  itemsPerPage,
}: {
  page: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-semibold text-gray-900 ">
          {(page - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 ">
          {Math.min(page * itemsPerPage, totalPages * itemsPerPage)}
        </span>{" "}
        of <span className="font-semibold text-gray-900 ">{totalItems}</span>{" "}
        Entries
      </span>

      <div className="mt-2 inline-flex gap-2">
        <Button
          disabled={page === 1}
          onClick={handlePrevPage}
          className="flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Prev
        </Button>

        <Button
          disabled={page === totalPages}
          onClick={handleNextPage}
          className="flex items-center justify-center gap-2"
        >
          Next
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
