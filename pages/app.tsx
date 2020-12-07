import Nav from '@components/Nav';
import ExpenseInput from '@components/ExpenseInput';
import { NextPage, NextPageContext } from 'next';
import Category from '@components/Category';
import AllExpenses from '@components/AllExpenses';
import TokenService from '@services/Token.service';

const IndexPage: NextPage = () => (
  <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
    <Nav />
    <Category />
    <ExpenseInput />
    <AllExpenses />
  </main>
);

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  await tokenService.authenticateTokenSsr(ctx);

  return {};
};
export default IndexPage;
