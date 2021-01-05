export interface LevelRange{
    start: number;
    end?: number;
    xpPerLevel: number;
}

export interface LabelRange{
    start: number;
    end?: number;
    label: string
}

export interface UserLevel{
    level: number;
    xp: number;
}

export interface Progress{
    xp: number;
    max: number;
}