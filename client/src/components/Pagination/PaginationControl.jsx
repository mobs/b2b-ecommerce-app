function PaginationControls({ currentPage, productsPerPage, totalProducts, onPageChange }) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
  
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    };
  
    return (
      <div className="flex justify-center items-center text-black">
        <button className="hidden md:block text-lg font-bold hover:text-red-500" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} className={`${
            currentPage === index + 1 ? "bg-red-400 text-white" : "" } 
            md:m-6 md:p-2 m-2 p-2 text-lg font-bold hover:text-red-500`}  
            onClick={() => handlePageChange(index + 1)}
        >
            {index + 1}
          </button>
        ))}
        <button className="hidden md:block text-lg font-bold hover:text-red-500" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>

    );
  }

  export default PaginationControls;