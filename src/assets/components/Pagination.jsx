const Pagination = ({ pageNumber, setPageNumber, maxPages }) => {
  const previousPage = pageNumber - 1;
  const nextPage = pageNumber + 1;

  return (
    <>
      <div className="pagination">
        {previousPage !== 0 && (
          <>
            <button
              onClick={() => {
                setPageNumber(previousPage);
              }}
            >
              précédent
            </button>
            <button
              onClick={() => {
                setPageNumber(previousPage);
              }}
            >
              {previousPage}
            </button>
          </>
        )}

        <button className="current-page">{pageNumber}</button>
        {nextPage <= maxPages && (
          <>
            <button
              onClick={() => {
                setPageNumber(nextPage);
              }}
            >
              {pageNumber + 1}
            </button>
            {pageNumber + 2 <= maxPages && (
              <button
                onClick={() => {
                  setPageNumber(pageNumber + 2);
                }}
              >
                {pageNumber + 2}
              </button>
            )}

            <button
              onClick={() => {
                setPageNumber(nextPage);
              }}
            >
              suivant
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
