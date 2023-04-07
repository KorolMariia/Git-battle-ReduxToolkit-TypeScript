// Popular
interface IOwner {
    login: string;
    avatar_url: string;
}

export interface IRepository {
    name: string;
    login: string;
    id: number;
    owner: IOwner;
    description: string;
    html_url: string;
    stargazers_count: number;
}

export type GetPopularReposParams = {
    selectedLanguage: string;
    searchName?: string;
};

//Battle
export interface Player {
    login: string;
    id: number;
    avatar_url: string;
    location: string;
    company: string;
    followers: number;
    following: number;
    public_repos: number;
    blog: string;
}

export type renderPlayer = {
    player: Player;
    score: number;
};


export interface PreviewPlayerProps {
    username: string;
    avatar: string;
    children: React.ReactNode;
}

export type GetPlayerParams = {
    username: string;
    id: number;
};

export interface InputPlayerProps {
    id: number;
}

// State
export interface IPopularState {
    languages: readonly string[];
    selectedLanguage: string;
    searchName: string;
    loading: boolean;
    repos: IRepository[];
    error: null | unknown;
}

export interface IBattleState {
    playersIds: number[];
    loadingPlayer: Record<number, boolean>;
    initialStatePlayers: Record<number, { username: string; avatar: string | null }>;
    errorPlayer: Record<number, string>;
    loadingBattle: boolean;
    resultsBattle: renderPlayer[];
    errorBattle: null | unknown;
}

export interface RootState {
    popular: IPopularState;
    battle: IBattleState;
}

