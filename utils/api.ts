import axios, { AxiosResponse } from "axios";
import config from "./config/global-config";
import { getStorageItemAsync } from "@/hooks/useStorageState";

const token = getStorageItemAsync(config.STORAGE_KEY).then((value) => {
  return value;
});

let api;

api = axios.create({
  baseURL: config.API_URL,
});

type PostDataRequest = {
  [key: string]: any;
};

type PostDataResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const postData = async (endpoint: string, data: PostDataRequest, useToken: boolean = true): Promise<PostDataResponse> => {
  try {
    if (useToken) {
      const token = await getStorageItemAsync(config.STORAGE_KEY);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response: AxiosResponse<any> = await api.post(endpoint, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error posting data:", error);
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { success: false, error: errorMessage };
  }
};

type GetDataResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

type GetDataRequest = {
  [key: string]: any;
};

export const getData = async (endpoint: string, body?: GetDataRequest, useToken: boolean = true): Promise<GetDataResponse> => {
  try {
    if (useToken) {
      const token = await getStorageItemAsync(config.STORAGE_KEY);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response: AxiosResponse<any> = await api.get(endpoint, {
      params: body,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error getting data:", error);
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { success: false, error: errorMessage };
  }
};

export const putData = async (endpoint: string, data: PostDataRequest, useToken: boolean = true): Promise<PostDataResponse> => {
  try {
    if (useToken) {
      const token = await getStorageItemAsync(config.STORAGE_KEY);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response: AxiosResponse<any> = await api.put(endpoint, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error putting data:", error);
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { success: false, error: errorMessage };
  }
};

type DeleteDataRequest = {
  [key: string]: any;
};

type DeleteDataResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const deleteData = async (endpoint: string, useToken: boolean = true): Promise<DeleteDataResponse> => {
  try {
    if (useToken) {
      const token = await getStorageItemAsync(config.STORAGE_KEY);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response: AxiosResponse<any> = await api.delete(endpoint);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error deleting data:", error);
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { success: false, error: errorMessage };
  }
};
