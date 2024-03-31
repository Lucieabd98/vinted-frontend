const SearchInput = ({ input, setInput }) => {
  console.log(input);

  return (
    <input
      type="text"
      placeholder="Recherche des articles"
      name="recherche"
      onChange={(event) => {
        setInput(event.target.value);
      }}
    ></input>
  );
};

export default SearchInput;
