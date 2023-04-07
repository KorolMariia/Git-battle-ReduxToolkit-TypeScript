import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ACCESS_KEY } from '../config';
import { IRepository, Player, renderPlayer } from '../types';

const handleError = (error: AxiosError<unknown>) => console.error(error);

const gitHubAxios: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${ACCESS_KEY}`,
  },
});

export const fetchPopularRepos = async (lang: string, name: string = ''): Promise<IRepository[]> => {
  const {
    data: { items },
  }: AxiosResponse<{ items: IRepository[] }> = await gitHubAxios.get(
    window.encodeURI(
      `/search/repositories?q=stars:>1+language:${lang}+${name}&sort=stars&order=desc&type=Repositories`,
    ),
  );
  return items;
};

export const fetchPlayer = async (username: string): Promise<Player> => {
  const { data }: AxiosResponse<Player> = await gitHubAxios.get(window.encodeURI(`users/${username}`));
  return data;
};

const fetchRepos = async (username: string): Promise<IRepository[]> => {
  try {
    const { data } = await gitHubAxios.get(
      `/users/${username}/repos?per_page=100`,
    );
    return data;
  } catch (error) {
    handleError(error as AxiosError<unknown>);
    return [];
  }
};

const getStarCount = (repos: IRepository[]): number => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
};

const calculateScore = (player: Player, repos: IRepository[]): number => {
  const followers: number = player.followers;
  const totalScore: number = getStarCount(repos);
  return followers + totalScore;
};

const fetchUserData = async (username: string): Promise<{ player: Player; score: number; }> => {
  try {
    const [player, repos] = await Promise.all([
      fetchPlayer(username),
      fetchRepos(username),
    ]);
    return {
      player: player,
      score: calculateScore(player, repos),
    };
  } catch (error) {
    handleError(error as AxiosError<unknown>);
    return { player: {} as Player, score: 0 };
  }
};

const sortPlayers = (players: renderPlayer[]): renderPlayer[] => {
  const filteredPlayers = players.filter(player => player !== undefined && player !== null);
  return filteredPlayers.sort((a: renderPlayer, b: renderPlayer) => b.score - a.score);
};

export const fetchBattle = async (players: string[]) => {
  const battlePlayers = await Promise.all(players.map(fetchUserData));
  return sortPlayers(battlePlayers);
};


