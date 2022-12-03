import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import {
  IAuth0User,
  IBugReport,
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
export const useBugReports = () =>
  useQuery<IBugReport[], Error>(['/bugreports'], () =>
    fetch(`${url}/bugreports`).then((res) => res.json())
  );

export const useServerStatus = () =>
  useQuery<{ message: string }, Error>(['/'], () =>
    fetch(`${url}/`).then((res) => res.json())
  );

export const useMutateGamesAndChats = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteGamesAndChats = async (gameUuids: string[]) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${url}/protected/gamesandchats`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uuids: gameUuids,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };

  return useMutation({
    mutationFn: deleteGamesAndChats,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/chats'] });
      queryClient.invalidateQueries({ queryKey: ['/games'] });
    },
  });
};

export const useMutatePlayers = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deletePlayers = async (userIds: string[]) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${url}/protected/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_ids: userIds,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };

  return useMutation({
    mutationFn: deletePlayers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/players'] });
    },
  });
};

export const useMutateBugReport = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteBugreport = async (date: string) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${url}/protected/bugreport`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: date,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };

  return useMutation({
    mutationFn: deleteBugreport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/bugreports'] });
    },
  });
};

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
