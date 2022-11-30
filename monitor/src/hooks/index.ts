import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import {
  IAuth0User,
  IChat,
  IGame,
  IRanking,
  ISession,
} from '../../../shared/types';

const url = import.meta.env.VITE_URL;

export const useGames = () =>
  useQuery<IGame[], Error>(['/games'], () =>
    fetch(`${url}/games`).then((res) => res.json())
  );

export const useSessions = () =>
  useQuery<ISession[], Error>(['/sessions'], () =>
    fetch(`${url}/sessions`).then((res) => res.json())
  );

export const useRankings = () =>
  useQuery<IRanking[], Error>(['/rankings'], () =>
    fetch(`${url}/rankings`).then((res) => res.json())
  );

export const useChats = () =>
  useQuery<IChat[], Error>(['/chats'], () =>
    fetch(`${url}/chats`).then((res) => res.json())
  );

export const usePlayers = () =>
  useQuery<IAuth0User[], Error>(['/users'], () =>
    fetch(`${url}/users`).then((res) => res.json())
  );

export const useServerStatus = () =>
  useQuery<{ message: string }, Error>(['/'], () =>
    fetch(`${url}/`).then((res) => res.json())
  );

export const useAdmin = (): boolean => {
  const { user } = useAuth0();

  if (!user) return false;

  if (user['https://hanseaticmonitor/roles'].length === 0) return false;

  return user['https://hanseaticmonitor/roles'].includes('Game Administrator');
};

export const useQueryArray = (): string[] => {
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  return Array.from(query).map((value) => value[0]);
};
