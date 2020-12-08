import React from 'react';

interface Props {
  amount: number;
  category: string;
  date_added: string;
  description: string;
}

const ExpenseBox = ({
  category,
  amount,
  date_added,
  description,
}: Props): JSX.Element => {
  const date = new Date(date_added);
  return (
    <div className="flex items-center bg-blue-200 max-w-md rounded-md mt-3">
      <div className="p-4 m-2 bg-blue-400 text-blue-100 rounded-md">
        <span className="text-blue-800 font-semibold">{category}</span>
      </div>
      <div className="flex flex-col justify-between m-2">
        <div className="font-medium text-blue-800">
          Spent Amount : <span>{amount} </span> on{' '}
          {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
        </div>
        <div className="text-blue-700">{description}</div>
      </div>
    </div>
  );
};

export default ExpenseBox;
