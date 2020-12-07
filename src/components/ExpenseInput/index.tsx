import { AiOutlineCalculator } from 'react-icons/ai';

const ExpenseInput = (): JSX.Element => {
  return (
    <section className="max-w-3xl w-full mx-auto">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
        <h1 className="font-bold font-sans break-normal text-gray-900 text-xl ">
          Keep track of your expenses.
        </h1>
        <span className="text-sm md:text-base font-normal ml-4 text-gray-600">
          Enter recent expense.
        </span>

        <form>
          <div>
            <label htmlFor="category">Category</label>
            <input
              className="resize-y border rounded-md w-4/5 p-2 mx-4 mt-3 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
              id="category"
              placeholder="Food"
            ></input>
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              className="resize-y border rounded-md w-4/5 p-2 mx-4 mt-3 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
              id="amount"
              placeholder="200"
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              className="resize-y border rounded-md w-4/5 p-2 mx-4 mt-3 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
              id="description"
              placeholder="Lunch at canteen"
            ></input>
          </div>
        </form>

        <div className="mt-2">
          <button className="px-2 py-2 mx-4 rounded-md bg-emerald-500 text-emerald-100 text-lg font-medium">
            <div className="flex items-center">
              <AiOutlineCalculator
                className="fill-current stroke-2 stroke-current"
                size="20"
              />
              <span className="ml-2 text-lg font-medium">Add Expense</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExpenseInput;
