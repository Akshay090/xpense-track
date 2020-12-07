import Nav from '@components/Nav';
import NavButton from '@components/NavButton';
import TokenService from '@services/Token.service';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import { IoIosLogIn } from 'react-icons/io';

interface IProps {
  authStatus: string;
}

const IndexPage = ({ authStatus }: IProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (authStatus && authStatus == 'logout') {
      // Currently we don't have any details
      // for future
      // authDispatch({
      //   type: 'removeAuthDetails',
      // });
      const tokenService = new TokenService();
      tokenService.deleteToken();
      router.push('/');
    }
  }, [authStatus, router]);

  return (
    <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
      <Nav title="XpenseTrack">
        <NavButton Icon={IoIosLogIn} linkTo="/login" text="Login" />
      </Nav>
      <section className="max-w-4xl w-full mx-auto mt-4">
        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
          <h1 className="font-semibold text-2xl  text-gray-900 underline mt-2 ">
            xpenseTrack.now.sh
          </h1>
          <p className="mt-4">
            <span className="text-red-500 font-mono">xpenseTrack.now.sh</span>{' '}
            helps you track daily expenses and get detailed insights of your
            spending habits.
          </p>

          <div className="mt-4 flex ">
            <Link href="/register">
              <button
                className="transition duration-200 ease-in bg-cyan-600 border-2 hover:shadow-md transform hover:-translate-y-1 text-white active:bg-blue-600 font-semibold px-2 py-3 rounded-md outline-none focus:outline-none flex items-center"
                type="button"
              >
                <div className="">
                  <FaRocket className="" size="32" />
                </div>
                <span className="ml-2 ">Sign Up to Get Started</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = async (
  ctx: NextPageContext
): Promise<
  | {
      props: {
        authStatus: string;
      };
    }
  | {
      props: {
        authStatus?: undefined;
      };
    }
> => {
  if (ctx.query && ctx.query.logout == 'true') {
    return { props: { authStatus: 'logout' } };
  }
  return { props: {} };
};
export default IndexPage;
