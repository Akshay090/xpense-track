import { NextPage, NextPageContext } from 'next';
import React, { ReactNode } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import Nav from '@components/Nav';
import NavButton from '@components/NavButton';
import TokenService from '@services/Token.service';
import CategoryExpense from '@components/CategoryExpense';

interface IProps {
  children?: ReactNode;
  categories?: string[];
}
const StatsPage: NextPage = ({ categories }: IProps) => (
  <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
    <div className="mb-6">
      <Nav title="XpenseTrack">
        <NavButton Icon={IoIosLogOut} linkTo="/?logout=true" text="Logout" />
        <NavButton
          Icon={AiOutlineAppstoreAdd}
          linkTo="/app"
          text="Add Expenses"
        />
      </Nav>
      <CategoryExpense categories={categories} />
    </div>
  </main>
);

export const getServerSideProps = async (
  ctx: NextPageContext
): Promise<{
  props: {
    categories: void | string[];
  };
}> => {
  const tokenService = new TokenService();
  const data = await tokenService.authenticateTokenSsr(ctx);
  const categories = data && (data.categories as string[]);
  return { props: { categories } };
};
export default StatsPage;
