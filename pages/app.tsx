import Nav from '@components/Nav';
import ExpenseInput from '@components/ExpenseInput';
import { NextPage, NextPageContext } from 'next';
import TokenService from '@services/Token.service';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import NavButton from '@components/NavButton';

const IndexPage: NextPage = ({ categories }) => (
  <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
    <Nav title="XpenseTrack">
      <NavButton Icon={IoIosLogOut} linkTo="/?logout=true" text="Logout" />
    </Nav>
    <ExpenseInput categories={categories} />
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
