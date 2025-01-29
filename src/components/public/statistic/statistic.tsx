// 统计存储了所有关于指标的事情，不影响游戏逻辑
// 1. 成就系统。当局成就 / 历史成就。

import { SpotBoxState, SpotVisible } from '../../../models/spot';
import { getStorage, setStorage } from '../../../utils/cookie';
import { nearEight, nearFour } from '../../../utils/graph';
import Target from '../../roles/target/target';
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
    // 系列名
    series: string;
    // 成就已解锁？
    unlocked: boolean;
    // 成就已完成？
    completed: boolean;
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
    let storage = getStorage<Statistic>('statistic');
    if (!storage || !storage.historyAchievements) {
        let initial = {
            historyAchievements: new Map(),
            currentAchievements: new Map(),
            currentRanks: new Map(),
            mIsGameWin: false,
            mCompleteRatio: '0%',
            mRemainChances: 0,
            mClickTurns: 0,
            mChancesOnlyOneFrequent: 0,
            mBoardAtTheEnd: [],
            mIsTargetKilled: false,
            mIsAddChancesByWitch: false,
        };
        storage = updateCurrentAndHistoryAchivement(initial, true);
    }
    return {
        historyAchievements: storage.historyAchievements,
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
function updateCurrentAndHistoryAchivement(
    statistic: Statistic,
    ...init: boolean[]
): Statistic {
    let ach: Map<string, Achivement> = new Map();
    let p2n = (s: string): number => {
        // percent to number
        return parseInt(s.substring(0, s.length - 1));
    };

    let nXr = (id: string): boolean => {
        if (
            statistic.mIsGameWin == false &&
            p2n(statistic.mCompleteRatio) < 90
        ) {
            var cnt = 0;
            for (var i = 0; i < statistic.mBoardAtTheEnd.length; i++) {
                for (var j = 0; j < statistic.mBoardAtTheEnd[0].length; j++) {
                    if (statistic.mBoardAtTheEnd[i][j].role.id == Target().id) {
                        for (var near of nearEight(
                            statistic.mBoardAtTheEnd,
                            i,
                            j,
                        )) {
                            if (near && near.visible == SpotVisible.REVEALED)
                                cnt++;
                        }
                        if (cnt == 8 && id === '3-3') return true;
                        if (cnt == 8 && id === '3-4') return true;
                        else {
                            cnt = 0;
                            for (var near2 of nearFour(
                                i,
                                j,
                                statistic.mBoardAtTheEnd.length,
                                statistic.mBoardAtTheEnd[0].length,
                            )) {
                                if (!near2) continue;
                                let n =
                                    statistic.mBoardAtTheEnd[near2.x][near2.y];

                                if (n && n.visible == SpotVisible.REVEALED)
                                    cnt++;
                            }
                            if (
                                cnt === 1 &&
                                p2n(statistic.mCompleteRatio) < 90 &&
                                id === '3-0'
                            )
                                return true;
                            if (
                                cnt === 2 &&
                                p2n(statistic.mCompleteRatio) < 90 &&
                                id === '3-1'
                            )
                                return true;
                            if (
                                cnt === 3 &&
                                p2n(statistic.mCompleteRatio) < 90 &&
                                id === '3-2'
                            )
                                return true;
                        }
                    }
                }
            }
        }
        if (statistic.mIsTargetKilled == true && id === '3-5') return true;
        return false;
    };

    // 0-0
    {
        ach.set('0-0', {
            id: '0-0',
            name: '火烧眉毛',
            color: Rarity.RARE,
            note: '剩余线索为0的情况下获胜',
            series: '剩余线索',
            unlocked: true,
            completed: statistic.mIsGameWin && statistic.mRemainChances === 0,
        });
    }
    // 0-1
    {
        ach.set('0-1', {
            id: '0-1',
            name: '虚惊一场',
            color: Rarity.UNCOMMON,
            note: '剩余线索为1-5个的情况下获胜',
            series: '剩余线索',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                statistic.mRemainChances <= 5 &&
                statistic.mRemainChances > 0,
        });
    }
    // 0-2
    {
        ach.set('0-2', {
            id: '0-2',
            name: '意料之中',
            color: Rarity.FREE,
            note: '剩余线索为6-10个的情况下获胜',
            series: '剩余线索',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                statistic.mRemainChances <= 10 &&
                statistic.mRemainChances > 5,
        });
    }
    // 0-3
    {
        ach.set('0-3', {
            id: '0-3',
            name: '顺藤摸瓜',
            color: Rarity.COMMON,
            note: '剩余线索为11-20个的情况下获胜',
            series: '剩余线索',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                statistic.mRemainChances <= 20 &&
                statistic.mRemainChances > 10,
        });
    }
    // 0-4
    {
        ach.set('0-4', {
            id: '0-4',
            name: '心思缜密',
            color: Rarity.UNCOMMON,
            note: '剩余线索为40-99个的情况下获胜',
            series: '剩余线索',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                statistic.mRemainChances <= 99 &&
                statistic.mRemainChances > 20,
        });
    }
    // 0-5
    {
        ach.set('0-5', {
            id: '0-5',
            name: '明察秋毫',
            color: Rarity.RARE,
            note: '剩余线索为100-199个的情况下获胜',
            series: '剩余线索',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                statistic.mRemainChances > 99 &&
                statistic.mRemainChances <= 199,
        });
    }
    // 0-6
    {
        ach.set('0-6', {
            id: '0-6',
            name: '滑铁卢',
            color: Rarity.UNCOMMON,
            note: '剩余线索为20-99个的情况下失败',
            series: '剩余线索',
            unlocked: true,
            completed:
                !statistic.mIsGameWin &&
                statistic.mRemainChances > 19 &&
                statistic.mRemainChances <= 99,
        });
    }
    // 0-7
    {
        ach.set('0-7', {
            id: '0-7',
            name: '今天就到这里吧',
            color: Rarity.RARE,
            note: '剩余线索至少100个的情况下失败',
            series: '剩余线索',
            unlocked: true,
            completed: !statistic.mIsGameWin && statistic.mRemainChances > 99,
        });
    }
    // 0-8
    {
        ach.set('0-8', {
            id: '0-8',
            name: '大数据',
            color: Rarity.EPIC,
            note: '剩余线索至少200个的情况下获胜',
            series: '剩余线索',
            unlocked: true,
            completed: statistic.mIsGameWin && statistic.mRemainChances >= 200,
        });
    }

    // 1-0
    {
        ach.set('1-0', {
            id: '1-0',
            name: '惊鸿一瞥',
            color: Rarity.EPIC,
            note: '完成度为1%-10%的情况下获胜',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 10 &&
                p2n(statistic.mCompleteRatio) > 0,
        });
    }
    // 1-1
    {
        ach.set('1-1', {
            id: '1-1',
            name: '永不加班',
            color: Rarity.RARE,
            note: '完成度为11%-20%的情况下获胜',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 20 &&
                p2n(statistic.mCompleteRatio) > 10,
        });
    }
    // 1-2
    {
        ach.set('1-2', {
            id: '1-2',
            name: '心有灵犀',
            color: Rarity.UNCOMMON,
            note: '完成度为21%-30%的情况下获胜',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 30 &&
                p2n(statistic.mCompleteRatio) > 20,
        });
    }
    // 1-3
    {
        ach.set('1-3', {
            id: '1-3',
            name: '小幸运',
            color: Rarity.COMMON,
            note: '完成度为31%-40%的情况下获胜',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 40 &&
                p2n(statistic.mCompleteRatio) > 30,
        });
    }
    // 1-4
    {
        ach.set('1-4', {
            id: '1-4',
            name: '不费力气',
            color: Rarity.FREE,
            note: '完成度为41%-50%的情况下获胜',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 50 &&
                p2n(statistic.mCompleteRatio) > 40,
        });
    }
    // 1-5
    {
        ach.set('1-5', {
            id: '1-5',
            name: '你在干什么',
            color: Rarity.EPIC,
            note: '完成度为1%-10%的情况下失败',
            series: '完成度',
            unlocked: true,
            completed:
                !statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 10 &&
                p2n(statistic.mCompleteRatio) > 0,
        });
    }
    // 1-6
    {
        ach.set('1-6', {
            id: '1-6',
            name: '不知所措',
            color: Rarity.RARE,
            note: '完成度为11%-20%的情况下失败',
            series: '完成度',
            unlocked: true,
            completed:
                !statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 20 &&
                p2n(statistic.mCompleteRatio) > 10,
        });
    }
    // 1-7
    {
        ach.set('1-7', {
            id: '1-7',
            name: '盲人摸象',
            color: Rarity.RARE,
            note: '完成度为80%-89%的情况下失败',
            series: '完成度',
            unlocked: true,
            completed:
                !statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) <= 90 &&
                p2n(statistic.mCompleteRatio) > 80,
        });
    }
    // 1-8
    {
        ach.set('1-8', {
            id: '1-8',
            name: '无力回天',
            color: Rarity.RARE,
            note: '完成度为90%-99%的情况下失败',
            series: '完成度',
            unlocked: true,
            completed:
                !statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) >= 90 &&
                p2n(statistic.mCompleteRatio) < 100,
        });
    }
    // 1-9
    {
        ach.set('1-9', {
            id: '1-9',
            name: '万人迷',
            color: Rarity.EPIC,
            note: '完成度为100%的情况下成功',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin && p2n(statistic.mCompleteRatio) == 100,
        });
    }
    // 1-10
    {
        ach.set('1-10', {
            id: '1-10',
            name: '功亏一篑',
            color: Rarity.LEGEND,
            note: '完成度为100%的情况下失败',
            series: '完成度',
            unlocked: true,
            completed:
                !statistic.mIsGameWin && p2n(statistic.mCompleteRatio) == 100,
        });
    }
    // 1-11
    {
        ach.set('1-11', {
            id: '1-11',
            name: '苦尽甘来',
            color: Rarity.UNCOMMON,
            note: '完成度为80%-89%的情况下成功',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) >= 80 &&
                p2n(statistic.mCompleteRatio) < 90,
        });
    }
    // 1-12
    {
        ach.set('1-12', {
            id: '1-12',
            name: '蓦然回首',
            color: Rarity.RARE,
            note: '完成度为90%-99%的情况下成功',
            series: '完成度',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                p2n(statistic.mCompleteRatio) >= 90 &&
                p2n(statistic.mCompleteRatio) < 100,
        });
    }
    // 1-13
    {
        ach.set('1-13', {
            id: '1-13',
            name: '输在起跑线',
            color: Rarity.LEGEND,
            note: '完成度为0%的情况下失败',
            series: '完成度',
            unlocked: true,
            completed:
                !statistic.mIsGameWin && p2n(statistic.mCompleteRatio) == 0,
        });
    }
    // 2-0
    {
        ach.set('2-0', {
            id: '2-0',
            name: '坚持不懈',
            color: Rarity.COMMON,
            note: '剩余线索为1的情况出现3-6次，最后获胜',
            series: '技巧',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                statistic.mChancesOnlyOneFrequent >= 3 &&
                statistic.mChancesOnlyOneFrequent <= 6,
        });
    }
    // 2-1
    {
        ach.set('2-1', {
            id: '2-1',
            name: '穷追不舍',
            color: Rarity.UNCOMMON,
            note: '剩余线索为1的情况出现7-9次，最后获胜',
            series: '技巧',
            unlocked: true,
            completed:
                statistic.mIsGameWin &&
                statistic.mChancesOnlyOneFrequent >= 7 &&
                statistic.mChancesOnlyOneFrequent <= 9,
        });
    }
    // 2-2
    {
        ach.set('2-2', {
            id: '2-2',
            name: '苟延残喘',
            color: Rarity.RARE,
            note: '剩余线索为1的情况至少出现10次，最后获胜',
            series: '技巧',
            unlocked: true,
            completed:
                statistic.mIsGameWin && statistic.mChancesOnlyOneFrequent >= 10,
        });
    }
    // 2-3
    {
        ach.set('2-3', {
            id: '2-3',
            name: '坏心办好事',
            color: Rarity.RARE,
            note: '【女巫】的效果拯救了你',
            series: '技巧',
            unlocked: true,
            completed: statistic.mIsAddChancesByWitch,
        });
    }
    // 3-0
    {
        ach.set('3-0', {
            id: '3-0',
            name: '擦肩而过',
            color: Rarity.FREE,
            note: '失败且完成度<90%时，与目标相邻的角色有1个已经现身',
            series: '意外',
            unlocked: true,
            completed: nXr('3-0'),
        });
    }
    // 3-1
    {
        ach.set('3-1', {
            id: '3-1',
            name: '近在眼前',
            color: Rarity.COMMON,
            note: '失败且完成度<90%时，与目标相邻的角色有2个已经现身',
            series: '意外',
            unlocked: true,
            completed: nXr('3-1'),
        });
    }
    // 3-2
    {
        ach.set('3-2', {
            id: '3-2',
            name: '素不相识',
            color: Rarity.UNCOMMON,
            note: '失败且完成度<90%时，与目标相邻的角色有3个已经现身',
            series: '意外',
            unlocked: true,
            completed: nXr('3-2'),
        });
    }
    // 3-3
    {
        ach.set('3-3', {
            id: '3-3',
            name: '熟视无睹',
            color: Rarity.RARE,
            note: '失败且完成度<90%时，与目标相邻的角色有4个已经现身',
            series: '意外',
            unlocked: true,
            completed: nXr('3-3'),
        });
    }
    // 3-4
    {
        ach.set('3-4', {
            id: '3-4',
            name: '最后的拼图',
            color: Rarity.EPIC,
            note: '失败且完成度<90%时，在目标周围的角色有8个已经现身',
            series: '意外',
            unlocked: true,
            completed: nXr('3-4'),
        });
    }
    // 3-5
    {
        ach.set('3-5', {
            id: '3-5',
            name: '好心办坏事',
            color: Rarity.UNCOMMON,
            note: '因目标被【杀手】干掉而失败',
            series: '意外',
            unlocked: true,
            completed: nXr('3-5'),
        });
    }
    // 100-0
    {
        ach.set('100-0', {
            id: '100-0',
            name: '“泥斗”',
            color: Rarity.SPECIAL,
            note: '感谢一位玩家在2022/04/23发现的成就系统巨大漏洞',
            series: '特别感谢',
            unlocked: true,
            completed: true,
        });
    }
    ach.forEach((value, key) => {
        if (init.length > 0) {
            value.completed = false;
        }
        statistic.currentAchievements.set(key, value);
        if (!statistic.historyAchievements.has(key)) {
            statistic.historyAchievements.set(key, value);
        } else {
            if (
                statistic.historyAchievements.get(key)?.completed === false &&
                value.completed
            ) {
                statistic.historyAchievements.set(key, value);
            }
        }
    });
    setStorage('statistic', statistic);
    return statistic;
}

function updateCurrentRanks(statistic: Statistic): Statistic {
    // rCompleteRatio
    {
        statistic.currentRanks.set('rCompleteRatio', {
            title: '完成度',
            id: 'rCompleteRatio',
            value: statistic.mCompleteRatio,
        });
    }
    // rRemainChances
    {
        statistic.currentRanks.set('rRemainChances', {
            title: '剩余线索',
            id: 'rRemainChances',
            value: statistic.mRemainChances.toString(),
        });
    }
    // rClickTurns
    {
        statistic.currentRanks.set('rClickTurns', {
            title: '调查次数',
            id: 'rClickTurns',
            value: statistic.mClickTurns.toString(),
        });
    }

    return statistic;
}

function groupbyHistoryAchivementBySeries(
    statistic: Statistic,
): Map<string, Achivement[]> {
    const map = new Map<string, Achivement[]>();
    statistic.historyAchievements.forEach((value, key) => {
        if (!map.has(value.series)) {
            map.set(value.series, []);
        }
        map.get(value.series)?.push(value);
    });
    return map;
}

function loadMetricsFromGameState(gameState: GameState): Statistic {
    gameState.statistic.mClickTurns = gameState.clicks;
    gameState.statistic.mRemainChances = gameState.chances;
    // mCompleteRatio
    let revealed = 0;
    for (let i = 0; i < gameState.spots.length; i++) {
        for (let j = 0; j < gameState.spots[i].length; j++) {
            if (gameState.spots[i][j].visible === SpotVisible.REVEALED) {
                revealed++;
            }
        }
    }
    gameState.statistic.mCompleteRatio =
        Math.floor(
            (revealed / (gameState.spots[0].length * gameState.spots.length)) *
                100,
        ) + '%';
    return gameState.statistic;
}

export {
    Rarity,
    groupbyHistoryAchivementBySeries,
    initStatistic,
    loadMetricsFromGameState,
    updateCurrentAndHistoryAchivement,
    updateCurrentRanks,
};
export type { Achivement, Statistic };
