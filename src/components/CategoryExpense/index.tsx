import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import FetchService from '@services/Fetch.service';
import ExpenseBox from '@components/ExoenseBox';

interface IProps {
  categories: string[] | undefined;
}
interface ApiResp {
  amount: string;
  category: string;
  date_added: string;
  description: string;
}
const CategoryExpense = ({ categories }: IProps): JSX.Element => {
  const [selCategory, setSelCategory] = useState('');
  const [realCategories] = useState(categories);
  const [detailedExp, setDetailedExp] = useState<Record<
    string,
    string[]
  > | null>(null);

  const postData = async (category: string) => {
    try {
      const { data, status } = await FetchService.isofetchAuthed(
        `/api/v1/user/expense_details/${category}`,
        {},
        'POST'
      );
      console.log(data, status, 'postdata');
      /* @ts-expect-error: API res not consistent*/
      setDetailedExp(data as ApiResp);
      if (status) {
        // setMessage('Added to expenses');
      } else {
        // setMessage(`Error ${data.message}`);
      }
    } catch (error) {
      //   setMessage('Failed to add');
      console.log(`Error ${error}`);
    }
  };

  useEffect(() => {
    if (selCategory !== '') {
      postData(selCategory);
    }
  }, [selCategory]);

  const renderBox = () => {
    console.log('in box', detailedExp);

    if (detailedExp) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: API Rsp is not consistent
      return detailedExp.map((elem, idx) => {
        console.log('in exp loop', elem);

        return (
          <ExpenseBox
            key={idx}
            amount={elem.amount}
            category={elem.category}
            date_added={elem.date_added}
            description={elem.description}
          />
        );
      });
    } else {
      return null;
    }
  };
  return (
    <section className="max-w-4xl w-full mx-auto mt-4">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
        <h1 className="font-bold font-sans break-normal text-gray-900 text-xl ">
          Get Detailed View of Expenses.
        </h1>
        <span className="text-sm md:text-base font-normal ml-4 text-gray-600">
          Select Category to know more
        </span>
        <div>
          <div className="mt-2 md:mt-0  rounded-t-xl overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 bg-white p-8">
            <span className="block text-grey-darker text-lg font-medium mb-2">
              Select Category
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
              {realCategories &&
                realCategories.map((elem, idx) => (
                  <div
                    key={idx}
                    className={cx({
                      'bg-blue-300 h-9 rounded-md flex justify-center items-center text-white text-sm md:text-xl font-extrabold': true,
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
        </div>
        <div className="mt-4">{renderBox()}</div>
      </div>
    </section>
  );
};

export default CategoryExpense;
