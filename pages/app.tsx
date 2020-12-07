import Nav from '@components/Nav';
import ExpenseInput from '@components/ExpenseInput';
import { NextPage } from 'next';
import Category from '@components/Category';
import AllExpenses from '@components/AllExpenses';

const IndexPage: NextPage = () => (
  <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
    <Nav />
    <Category />
    <ExpenseInput />
    <AllExpenses />
  </main>
);
export default IndexPage;
