const Pagination = ({ pageNumber, setPageNumber }) => {
  const previousPage = pageNumber - 1;
  const nextPage = pageNumber + 1;

  return (
    <>
      <div className="pagination">
        {previousPage !== 0 && (
          <button
            onClick={() => {
              setPageNumber(previousPage);
            }}
          >
            précédent
          </button>
        )}
        <button>{pageNumber}</button>
        <button
          onClick={() => {
            setPageNumber(nextPage);
          }}
        >
          suivant
        </button>
      </div>
    </>
  );
};

export default Pagination;
