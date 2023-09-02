import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants/baseUrl";

interface RequestHeaders {
  headers: {
    Authorization: string | null;
  };
}

interface RequestBody {
  content: string;
}

interface RequestBodyLike {
  like: boolean;
}

export interface GetPostInterface {
  id: string;
  comments: number;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  userLiked?: number;
  creator: {
    id: string;
    name: string;
  };
}
export const feedServiceGetPosts = async (headers: RequestHeaders) => {
  try {
    const response = await axios.get<GetPostInterface[]>(
      `${BASE_URL}/posts`,
      headers
    );
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

export const createAPost = async (
  headers: RequestHeaders,
  body: RequestBody
) => {
  try {
    await axios.post(`${BASE_URL}/posts`, body, headers);
    return "Post criado com sucesso";
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw error;
    }
  }
};

export const likeOrDislikeApost = async (
  headers: RequestHeaders,
  body: RequestBodyLike,
  postId: string
) => {
  try {
    await axios.put(`${BASE_URL}/posts/${postId}/like`, body, headers);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw axiosError.response.data;
    } else {
      throw error;
    }
  }
};
