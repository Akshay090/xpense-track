import { APIResp } from '../types/global.types';
import { NextPageContext } from 'next/types';

import Cookies from 'universal-cookie';

import FetchService from '../services/Fetch.service';
import NavService from '../services/Nav.service';

class TokenService {
  public saveToken(token: string): Promise<void> {
    console.log('saving cookie', token);
    const cookies = new Cookies();
    cookies.set('token', token, { path: '/' });
    return Promise.resolve();
  }

  public deleteToken(): void {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    return;
  }

  // Using categories route to validate token as no validate route
  public checkAuthToken(token: string): Promise<APIResp> {
    return FetchService.isofetchAuthedGET(`/api/v1/user/categories`, token);
  }

  /**
   * Used for checking if auth from token in ssr
   */
  public async authenticateTokenSsr(
    ctx: NextPageContext
  ): Promise<void | Record<string, unknown>> {
    const ssr = ctx.req ? true : false;
    const cookies = new Cookies(ssr ? ctx.req?.headers.cookie : null);
    const token = cookies.get('token');
    console.log('token authssr', token);

    const { status, data } = await this.checkAuthToken(token);
    console.log('token respl', status, data);
    if (status && data?.message === 'Invalid Token') {
      console.log('logginout as no cookie');

      const navService = new NavService();
      this.deleteToken();
      navService.redirectUser('/?logout=true', ctx);
    } else {
      return data;
    }
  }
}

export default TokenService;
