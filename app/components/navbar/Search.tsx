const Search = () => {
  return (
    <div className="hidden md:flex flex-1 max-w-md mx-auto items-center relative">
      <input
        className="w-full py-2.5 pl-4 pr-20 bg-gray-50 border border-gray-200 outline-none rounded-full text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
        type="text"
        placeholder="Ürün, marka veya kategori ara..."
      />
      <button
        className="absolute right-1.5 px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs rounded-full transition-colors shadow-sm cursor-pointer"
      >
        Ara
      </button>
    </div>
  );
};

export default Search;
