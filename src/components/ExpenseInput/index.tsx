import React from 'react';
import { IoIosRocket } from 'react-icons/io';

const ExpenseInput = (): JSX.Element => {
  return (
    <section className="max-w-4xl w-full mx-auto mt-4">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
        <h1 className="font-bold font-sans break-normal text-gray-900 text-xl ">
          Keep track of your expenses.
        </h1>
        <span className="text-sm md:text-base font-normal ml-4 text-gray-600">
          Add recent expense.
        </span>

        <form>
          <div className="mt-4">
            <label
              className="block text-grey-darker text-lg font-medium mb-2"
              htmlFor="description"
            >
              Expense Description
            </label>
            <input
              className="resize-y border rounded-md w-4/5 p-2 mx-4 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
              id="category"
              placeholder="Food"
            ></input>
          </div>
          <div className="mt-2 ">
            <div>
              <label
                className="block text-grey-darker text-lg font-medium mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="resize-y border rounded-md w-1/4 p-2 mx-4 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
                type="number"
                id="amount"
                placeholder="20"
              ></input>
            </div>
          </div>
          <div className="mt-2 md:mt-0  rounded-t-xl overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 bg-white p-8">
            <span className="block text-grey-darker text-lg font-medium mb-2">
              Select Category
            </span>
            <div className="flex items-center">
              <input
                className="py-1 border rounded-md w-56 px-2 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
                type="text"
              />
              <button className="px-3 py-1 ml-2 rounded-md bg-blue-400 text-warmGray-100 font-semibold">
                Add
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
              <div className="bg-blue-300 h-9 rounded-md flex justify-center items-center text-white text-xl font-extrabold">
                Education
              </div>
              <div className="bg-blue-300 h-9 rounded-md flex justify-center items-center text-white text-xl font-extrabold">
                Education
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button className="px-2 py-2 mx-4 rounded-md bg-blue-500 text-blue-100 text-lg font-medium">
              <div className="flex items-center">
                <IoIosRocket
                  className="fill-current stroke-2 stroke-current"
                  size="20"
                />
                <span className="ml-2 text-lg font-medium">Add Expense</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ExpenseInput;
