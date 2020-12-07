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

export interface APIResp {
  data: Record<string, string>;
  status: boolean;
}
