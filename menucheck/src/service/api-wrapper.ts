import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

type AxiosRequestConfigWithHideToast = AxiosRequestConfig & {
  hideToast?: boolean
}

export interface ApiConfiguration {
  baseURL?: string
  withCredentials: boolean
}

export interface IApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse>
  patch<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse>
  put<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse>
  get<TResponse>(
    path: string,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse>
  delete<TResponse>(
    path: string,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse>
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance

  protected createAxiosClient(
    apiConfiguration: ApiConfiguration
  ): AxiosInstance {
    return Axios.create(apiConfiguration)
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration)
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse> {
    return await this.client
      .post<TResponse>(path, payload, config)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err))
  }

  async delete<TResponse>(
    path: string,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse> {
    return await this.client
      .delete<TResponse>(path, config)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err))
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse> {
    return await this.client
      .patch<TResponse>(path, payload, config)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err))
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: AxiosRequestConfigWithHideToast
  ): Promise<TResponse> {
    return await this.client
      .put<TResponse>(path, payload, config)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err))
  }

  async get<TResponse>(
    path: string,
    config?: AxiosRequestConfigWithHideToast  
  ): Promise<TResponse> {
    return await this.client
      .get<TResponse>(path, config)
      .then((res) => res.data)
      .catch((err) => Promise.reject(err))
  }
}