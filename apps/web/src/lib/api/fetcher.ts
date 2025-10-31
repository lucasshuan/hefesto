import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.hefesto.felsen.io',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const customAxios = async <TData>(
  config: AxiosRequestConfig
): Promise<TData> => {
  const response = await instance.request<TData>(config)
  return response.data
}
