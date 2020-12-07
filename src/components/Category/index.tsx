const Category = (): JSX.Element => {
  return (
    <section className="max-w-4xl w-full mx-auto mt-4">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
        <div>Create Category</div>
        <input
          type="text"
          className="resize-y border rounded-md w-4/5 p-2 mx-4 mt-3 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
        />
        <div className="mt-2">
          <button className="px-2 py-2 mx-4 rounded-md bg-emerald-500 text-emerald-100 text-lg font-medium">
            Create category
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;
