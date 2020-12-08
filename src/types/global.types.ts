import { NextPageContext } from 'next';

export interface IGlobalStatus {
  message: string;
}

export interface IAppContext {
  Component: any;
  ctx: NextPageContext;
}

export interface IRedirectOptions {
  ctx: NextPageContext;
  status: number;
}

// interface ExpDataRes {
//   amount: string;
//   category: string;
//   date_added: string;
//   description: string;
// }

export interface APIResp {
  data: Record<string, string>;
  status: boolean;
}
