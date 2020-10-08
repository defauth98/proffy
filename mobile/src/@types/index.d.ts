declare module '*.png';
declare module '*.jpeg';
declare module 'axios' {
  export interface AxiosRequestConfig {
    handlerEnabled: boolean;
  }
}
