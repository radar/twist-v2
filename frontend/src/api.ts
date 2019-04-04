import axios, { AxiosInstance, AxiosResponse } from "axios"

export default class Api {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_HOST,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
  }

  finishOAuth(
    code: string,
    state: string,
    onSuccess: (value: AxiosResponse<any>) => void,
    onFailure: (value: AxiosResponse<any>) => void,
    ): void {
    this.client.get(
      "/oauth/callback", {
        params: {
          code: code,
          state: state
        }
      }
    ).then(onSuccess).catch(onFailure)
  }

  authorizationURL(callback: (value: AxiosResponse<any>) => void) {
    this.client.get(
      "/oauth/authorize", {
        params: {
          redirect_uri: process.env.REACT_APP_HOST + "/oauth/callback"
        }
      }
    ).then(callback)
  }
}
