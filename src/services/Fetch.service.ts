import fetch from 'isomorphic-unfetch';

import Cookies from 'universal-cookie';

class FetchService {
  public isofetch(
    url: string,
    data: Record<string, unknown>,
    type: string
  ): Promise<any> {
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
   * This request could be initiated on client or server side, so a check must be done so
   * we can know whether to use the Docker local instance (server side request) or the
   * public facing request (client side)
   * @param url
   * @param data
   * @param type
   * @param ssr
   */
  public isofetchAuthed(
    url: string,
    data: Record<string, unknown>,
    type: string,
    ssr = false
  ): Promise<any> {
    const cookies = new Cookies();
    const token = cookies.get('token');

    console.log(
      'fetchin',
      process.env.NEXT_PUBLIC_NETWORK_API_URL,
      process.env.NEXT_PUBLIC_API_URL
    );

    return fetch(
      `${
        ssr
          ? process.env.NEXT_PUBLIC_NETWORK_API_URL
          : process.env.NEXT_PUBLIC_API_URL
      }${url}`,
      {
        body: JSON.stringify({ ...data }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: type,
      }
    )
      .then((response: Response) => response.json())
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

interface APIResp {
  data: Promise<any>;
  status: boolean;
}

export default new FetchService();
