import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants/baseUrl";

interface AxiosBody {
  content: string;
}

interface AxiosHeaders {
  headers: {
    Authorization: string | null;
  };
}

interface RequestBodyLike {
  like: boolean;
}

export const createComment = async (
  body: AxiosBody,
  headers: AxiosHeaders,
  postId: string
) => {
  try {
    await axios.post(`${BASE_URL}/comments/${postId}`, body, headers);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw error;
    }
  }
};

export const getComments = async (headers: AxiosHeaders, postId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments/${postId}`, headers);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw error;
    }
  }
};

export const getPostById = async (headers: AxiosHeaders, postId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`, headers);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw error;
    }
  }
};

export const likeOrDislikeComment = async (
  headers: AxiosHeaders,
  body: RequestBodyLike,
  postId: string,
  commentId: string
) => {
  try {
    await axios.put(
      `${BASE_URL}/comments/${postId}/${commentId}/like`,
      body,
      headers
    );
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw error;
    }
  }
};
