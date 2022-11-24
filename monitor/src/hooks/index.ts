import { useQuery } from '@tanstack/react-query';
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
