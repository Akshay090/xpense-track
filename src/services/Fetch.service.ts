import { APIResp } from '../types/global.types';
import fetch from 'isomorphic-unfetch';

import Cookies from 'universal-cookie';

class FetchService {
  public isofetch(
    url: string,
    data: Record<string, unknown>,
    type: string
  ): Promise<APIResp> {
    console.log('to call api ', data);
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      body: JSON.stringify({ ...data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: type,
    })
      .then(async (response: Response) => {
        const data = await response.json();
        return {
          data,
          status: response.ok,
        };
      })
      .then(this.handleErrors)
      .catch((error: Error) => {
        throw error;
      });
  }

  /**
   * Fetch auth route from client
   */
  public isofetchAuthed(
    url: string,
    data: Record<string, unknown>,
    type: string
  ): Promise<APIResp> {
    const cookies = new Cookies();
    const token = cookies.get('token');

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      body: JSON.stringify({ ...data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: type,
    })
      .then(async (response: Response) => {
        const data = await response.json();
        return {
          data,
          status: response.ok,
        };
      })
      .then(this.handleErrors)
      .catch((error) => {
        throw error;
      });
  }

  public isofetchAuthedGET(url: string, ssrToken: string): Promise<APIResp> {
    const cookies = new Cookies();
    const token = ssrToken ? ssrToken : cookies.get('token');

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'GET',
    })
      .then(async (response: Response) => {
        const data = await response.json();
        return {
          data,
          status: response.ok,
        };
      })
      .then(this.handleErrors)
      .catch((error) => {
        throw error;
      });
  }

  public handleErrors({ status, data }: APIResp): APIResp {
    // if (status !== true) {
    //   throw new Error('Server error.');
    // }
    // Add proper handler future
    return { data, status };
  }
}

export default new FetchService();
