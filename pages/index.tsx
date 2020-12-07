import TokenService from '@services/Token.service';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
      Home Page
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
