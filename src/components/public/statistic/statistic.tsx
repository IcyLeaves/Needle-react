// 统计存储了所有关于指标的事情，不影响游戏逻辑
// 1. 成就系统。当局成就 / 历史成就。

import { SpotBoxState } from '../../../models/spot';
import { GameState } from '../game';

// 2. 评价系统。每局结束后进行指标评价。当局指标
type Statistic = {
    historyAchievements: Map<string, Achivement>;
    currentAchievements: Map<string, Achivement>;
    currentRanks: Map<string, Rank>;
    //metrics
    mIsGameWin: boolean;
    mCompleteRatio: string;
    mRemainChances: number;
    mClickTurns: number;
    mChancesOnlyOneFrequent: number;
    mBoardAtTheEnd: SpotBoxState[][];
    mIsTargetKilled: boolean;
    mIsAddChancesByWitch: boolean;
};
type Achivement = {
    // 成就说明
    note: string;
    // 稀有度颜色
    color: Rarity;
    // 成就名称
    name: string;
    // 成就唯一 id
    id: string;
};

enum Rarity {
    FREE = '#999999',
    COMMON = '#7DAF0A',
    UNCOMMON = '#1E90FF',
    RARE = '#7D00FF',
    EPIC = '#DB3913',
    LEGEND = '#00000000',
    SPECIAL = '#DD52CF',
}

type Rank = {
    // 评价名称
    title: string;
    // 评价值
    value: string;
    // 成就唯一 id
    id: string;
};

function initStatistic(): Statistic {
    return {
        historyAchievements: new Map(),
        currentAchievements: new Map(),
        currentRanks: new Map(),
        mIsGameWin: false,
        mCompleteRatio: '',
        mRemainChances: 0,
        mClickTurns: 0,
        mChancesOnlyOneFrequent: 0,
        mBoardAtTheEnd: [],
        mIsTargetKilled: false,
        mIsAddChancesByWitch: false,
    };
}
// check whether achivement is acquired
// store achivement to current and history
function updateCurrentAndHistoryAchivement(statistic: Statistic): Statistic {
    return statistic;
}

function updateCurrentRanks(statistic: Statistic): Statistic {
    statistic.currentRanks.set('rCompleteRatio', {
        title: '完成度',
        id: 'rCompleteRatio',
        value: statistic.mCompleteRatio,
    });
    statistic.currentRanks.set('rRemainChances', {
        title: '剩余线索',
        id: 'rRemainChances',
        value: '1234',
    });
    statistic.currentRanks.set('rClickTurns', {
        title: '调查次数',
        id: 'rClickTurns',
        value: '1234',
    });
    return statistic;
}

function groupbyHistoryAchivementBySeries(
    statistic: Statistic,
): Map<string, Achivement[]> {
    return new Map();
}

function loadMetricsFromGameState(
    statistic: Statistic,
    gameState: GameState,
): Statistic {
    return statistic;
}

export { updateCurrentAndHistoryAchivement, updateCurrentRanks };
export type { Statistic };
