const SearchBar = () => {
  return (
    <section className="flex justify-center w-8/12 mx-auto">
      <input
        type="search"
        placeholder="여행지를 검색해보세요."
        className="w-3/4 border rounded-3xl border-slate-300 px-3 py-2"
      />
    </section>
  );
};

export default SearchBar;
