import prevIcon from "../../assets/pagination/back.png";
import nextIcon from "../../assets/pagination/next.png";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  showInfo = true,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function handlePrev() {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }

  function handleNext() {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }

  return (
    <div className="flex justify-between items-center mt-4 px-6">
      {showInfo && (
        <div className="text-gray-600 text-sm">
          Show {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </div>
      )}

      <nav className="border rounded-sm flex">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-2 py-1 disabled:opacity-50"
        >
          <img src={prevIcon} alt="Previous" className="w-3 h-3" />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 border-l ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border-l disabled:opacity-50"
        >
          <img src={nextIcon} alt="Next" className="w-3 h-3" />
        </button>
      </nav>
    </div>
  );
}
