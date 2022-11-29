import 'dotenv/config';
import axios, { AxiosRequestConfig } from 'axios';
import { IAuth0User } from '../../../shared/types';

const CLIENT_ID = process.env.AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
const DOMAIN = process.env.AUTH_DOMAIN;
const AUDIENCE = process.env.AUTH_AUDIENCE;

const getAuthToken = async (): Promise<string | null> => {
  const options: AxiosRequestConfig = {
    baseURL: DOMAIN,
    url: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience: AUDIENCE,
      grant_type: 'client_credentials',
    },
  };

  try {
    const response = await axios(options);

    console.log(response);

    if (response.status === 200 && response.data.access_token) {
      return response.data.access_token;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const resendVerificationEmail = async (
  user_id: string
): Promise<boolean> => {
  console.log('Requesting email verification email for user ' + user_id);

  const token = await getAuthToken();

  if (!token) return false;

  const options: AxiosRequestConfig = {
    baseURL: DOMAIN,
    url: '/api/v2/jobs/verification-email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: { user_id: user_id },
  };

  try {
    const response = await axios(options);

    if (response.status !== 201) return false;
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAllUsers = async (): Promise<IAuth0User[]> => {
  const token = await getAuthToken();

  if (!token) return [];

  const options: AxiosRequestConfig = {
    baseURL: DOMAIN,
    url: '/api/v2/users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const response = await axios<IAuth0User[]>(options);

    if (response.status !== 200) return [];
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
