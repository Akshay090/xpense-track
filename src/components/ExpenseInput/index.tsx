import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { IoIosRocket } from 'react-icons/io';
import cx from 'classnames';
import FetchService from '@services/Fetch.service';

interface IProps {
  categories: string[] | undefined;
}

const initialFormState = {
  description: '',
  amount: '',
  newCategory: '',
};

interface formState {
  description: string;
  amount: string;
  newCategory: string;
}

const ExpenseInput = ({ categories }: IProps): JSX.Element => {
  const [selCategory, setSelCategory] = useState('');
  const [realCategories, setrealCategories] = useState(categories);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage('');

    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const postData = async (form: formState, selCategory: string) => {
    try {
      const { data, status } = await FetchService.isofetchAuthed(
        '/api/v1/user/add_expense',
        {
          category: selCategory,
          amount: form.amount,
          description: form.description,
        },
        'POST'
      );
      console.log(data, status, 'postdata');
      if (status) {
        setMessage('Added to expenses');
      } else {
        setMessage(`Error ${data.message}`);
      }
    } catch (error) {
      setMessage('Failed to add');
    }
  };

  const createCategory = async (newCategoryName: string) => {
    try {
      const { data, status } = await FetchService.isofetchAuthed(
        '/api/v1/user/add_category',
        {
          name: newCategoryName,
        },
        'POST'
      );
      console.log(data, status, 'newCategory');
      if (status && realCategories) {
        setForm(initialFormState);
        setrealCategories([newCategoryName, ...realCategories]);
        setMessage('New Category Added');
      } else {
        setMessage(`Error ${data.message}`);
      }
    } catch (error) {
      setMessage('Failed to add');
    }
  };

  const formValidate = () => {
    const err: {
      description?: string;
      amount?: string;
      category?: string;
    } = {};
    if (!form.description) err.description = 'Description is required';
    if (!form.amount) err.amount = 'amount is required';
    if (selCategory === '') err.category = 'select one category';
    return err;
  };

  const handleCategoryAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (form.newCategory !== '') {
      console.log('called new cat', form.newCategory);

      createCategory(form.newCategory);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();
    console.log('called submit');

    if (Object.keys(errs).length === 0) {
      console.log('no error in form', form, selCategory);

      postData(form, selCategory);
      setForm(initialFormState);
      setSelCategory('');
      setErrors({});
    } else {
      setErrors({ errs });
    }
  };
  return (
    <section className="max-w-4xl w-full mx-auto mt-4">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
        <h1 className="font-bold font-sans break-normal text-gray-900 text-xl ">
          Keep track of your expenses.
        </h1>
        <span className="text-sm md:text-base font-normal ml-4 text-gray-600">
          Add recent expense.
        </span>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              className="block text-grey-darker text-lg font-medium mb-2"
              htmlFor="description"
            >
              Expense Description
            </label>
            <input
              className="resize-y border rounded-md w-4/5 p-2 mx-4 focus:outline-none text-gray-700 font-medium focus:ring focus:border-green-300"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
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
                name="amount"
                value={form.amount}
                onChange={handleChange}
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
                name="newCategory"
                value={form.newCategory}
                onChange={handleChange}
              />
              <button
                onClick={handleCategoryAdd}
                className="px-3 py-1 ml-2 rounded-md bg-blue-400 text-warmGray-100 font-semibold"
              >
                Add
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
              {realCategories &&
                realCategories.map((elem, idx) => (
                  <div
                    key={idx}
                    className={cx({
                      'bg-blue-300 h-9 rounded-md flex justify-center items-center text-white text-xl font-extrabold': true,
                      'bg-blue-500': selCategory === elem,
                    })}
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelCategory(elem)}
                    onKeyDown={(ev) => {
                      // check keys if you want
                      if (ev.key == 'Enter') {
                        setSelCategory(elem);
                      }
                    }}
                  >
                    {elem}
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <button
              type="submit"
              className="px-2 py-2 mx-4 rounded-md bg-blue-500 text-blue-100 text-lg font-medium"
            >
              <div className="flex items-center">
                <IoIosRocket
                  className="fill-current stroke-2 stroke-current"
                  size="20"
                />
                <span className="ml-2 text-lg font-medium">Add Expense</span>
              </div>
            </button>
            <p>{message}</p>
          </div>
        </form>
        <div>
          {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpenseInput;
