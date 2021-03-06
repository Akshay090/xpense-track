import Nav from '@components/Nav';
import ExpenseInput from '@components/ExpenseInput';
import { NextPage, NextPageContext } from 'next';
import TokenService from '@services/Token.service';
import React, { ReactNode } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { AiOutlineBarChart } from 'react-icons/ai';
import NavButton from '@components/NavButton';

interface IProps {
  children?: ReactNode;
  categories?: string[];
}
const IndexPage: NextPage = ({ categories }: IProps) => (
  <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
    <div className="mb-6">
      <Nav title="XpenseTrack">
        <NavButton Icon={IoIosLogOut} linkTo="/?logout=true" text="Logout" />
        <NavButton Icon={AiOutlineBarChart} linkTo="/stats" text="Stats" />
      </Nav>
      <ExpenseInput categories={categories} />
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
export default IndexPage;
