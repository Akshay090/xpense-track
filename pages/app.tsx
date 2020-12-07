import Nav from '@components/Nav';
import ExpenseInput from '@components/ExpenseInput';
import { NextPage, NextPageContext } from 'next';
import TokenService from '@services/Token.service';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import NavButton from '@components/NavButton';

const IndexPage: NextPage = () => (
  <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
    <Nav title="XpenseTrack">
      <NavButton Icon={IoIosLogOut} linkTo="/?logout=true" text="Logout" />
    </Nav>
    <ExpenseInput />
  </main>
);

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  await tokenService.authenticateTokenSsr(ctx);

  return {};
};
export default IndexPage;
