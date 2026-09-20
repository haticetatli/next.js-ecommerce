const Search = () => {
  return (
    <div className="hidden md:flex flex-1 justify-center gap-2">
      <input
        className="w-1/3 py-2 px-3 border border-gray-400 outline-none rounded-md 
                   placeholder:text-gray-600 placeholder:text-sm"
        type="text"
        placeholder="Arama Yap..."
      />
      <button
        className="px-4 py-2 bg-orange-800 text-white font-semibold text-sm rounded-md"
      >
        Ara
      </button>
    </div>
  );
};

export default Search;
