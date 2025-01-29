import * as styled from '@/app/style';
import FoundProgress from '@/components/public/note';
import {
    BookFilled,
    QuestionCircleFilled,
    ThunderboltOutlined,
    TrophyOutlined,
} from '@ant-design/icons';
import { Button, Col, Divider, Dropdown, Flex, MenuProps, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useRouter } from 'next/navigation';
import React, { Dispatch, useEffect, useState } from 'react';
import { GameMode } from '../../app/page';
import Role, { DefaultSpotBoxState } from '../../models/role';
import { SpotBoxState, SpotStatus, SpotVisible } from '../../models/spot';
import { Deck, Seed } from '../../utils/draw';
import str2role from '../roles/roles';
import Awards from './award';
import Board from './board';
import { Info } from './info';
import Rank from './rank';
import {
    Statistic,
    initStatistic,
    loadMetricsFromGameState,
    updateCurrentAndHistoryAchivement,
    updateCurrentRanks,
} from './statistic/statistic';
import { Tutorial } from './tutorial';

type GameProps = {
    config: GameConfig;
};
export type AnyFunction = (...args: any[]) => any;
export type SearchSpotsFunction = (spot: SpotBoxState) => boolean;
type GameState = {
    seed: Seed;
    chances: number;
    spots: SpotBoxState[][];
    clicks: number;
    status: GameStatus;
    isGameOver: boolean;
    isWin: boolean;
    onRoundStart: AnyFunction[];
    onFlip: AnyFunction[];
    onThatFlip: AnyFunction[];
    onRevealed: AnyFunction[];
    onThatRevealed: AnyFunction[];
    //评价系统
    statistic: Statistic;
};

export enum GameStatus {
    REVEALING = 'revealing',
    SHOOTING = 'shooting',
}
const SearchAllSpots = (
    gameState: GameState,
    searchFn: SearchSpotsFunction,
): SpotBoxState[] => {
    let res: SpotBoxState[] = [];
    for (let i = 0; i < gameState.spots.length; i++) {
        for (let j = 0; j < gameState.spots[i].length; j++) {
            if (searchFn(gameState.spots[i][j])) {
                res.push(gameState.spots[i][j]);
            }
        }
    }
    return res;
};

type GameConfig = {
    rows: number;
    cols: number;
    chances: number;
    roleMap: {
        [x: string]: number;
    };
    seed: string;
    mode: GameMode;
};

type GameDispatches = {
    gameState: GameState;
    setGameState: Dispatch<GameState>;
    infoSpot: SpotBoxState;
    setinfoSpot: Dispatch<SpotBoxState>;
};
const Chance: React.FC<{ chance: number }> = props => {
    const { chance } = props;
    return <div style={{ marginTop: 20 }}>🔍 × {chance}</div>;
};

const InitSpotDeck = (config: GameConfig): Deck<Role> => {
    let deck = [];
    for (var key in config.roleMap) {
        let value = config.roleMap[key];
        for (var i = 0; i < value; i++) {
            let spot: Role = str2role(key);
            deck.push(spot);
        }
    }
    return new Deck<Role>(deck, config.seed, undefined);
};

const InitSpotStates = (
    deck: Deck<Role>,
    config: GameConfig,
): SpotBoxState[][] => {
    let res: SpotBoxState[][] = [];
    for (var i = 0; i < config.rows; i++) {
        res.push([]);
        for (var j = 0; j < config.cols; j++) {
            res[i].push({
                x: i,
                y: j,
                role: deck.draw()!,
                visible: SpotVisible.HIDDEN, // dev use VISIBLE
                status: SpotStatus.IDLE,
                buffs: new Map(),
                attrs: new Map(),
            });
        }
    }
    return res;
};

const Game: React.FC<GameProps> = ({ config }) => {
    const router = useRouter();
    const [state, updateState] = useState<GameState>({
        seed: new Seed(config.seed),
        chances: config.chances,
        clicks: 0,
        spots: InitSpotStates(InitSpotDeck(config), config),
        status: GameStatus.REVEALING,
        onRoundStart: [],
        onFlip: [],
        onThatFlip: [],
        onRevealed: [],
        onThatRevealed: [],
        isGameOver: false,
        isWin: false,
        statistic: initStatistic(),
    });
    const [key, setKey] = useState(0);
    const [rankOpen, setRankOpen] = useState(false);

    const [tutorialOpened, setTutorialOpened] = React.useState(false);
    const [AwardsOpened, setAwardsOpened] = React.useState(false);

    useEffect(() => {
        if (state.isGameOver) {
            setRankOpen(true);
        }
    }, [state.isGameOver]);

    const setState: Dispatch<GameState> = (newState: GameState) => {
        updateState(newState);
        setKey(Math.random());
    };

    const [infoSpot, setinfoSpot] = useState<SpotBoxState>(DefaultSpotBoxState);
    let gameDispatches: GameDispatches = {
        gameState: state,
        setGameState: setState,
        infoSpot: infoSpot,
        setinfoSpot: setinfoSpot,
    };
    const startQuickplay = () => {
        router.push(`/?mode=${GameMode.QUICKPLAY}`);
    };
    const startStandard = () => {
        router.push(`/?mode=${GameMode.STANDARD}`);
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <div onClick={startQuickplay}>快速模式</div>,
            icon: <ThunderboltOutlined onClick={startQuickplay} />,
        },
        {
            key: '2',
            label: <div onClick={startStandard}>标准模式</div>,
            icon: <TrophyOutlined onClick={startStandard} />,
        },
    ];
    return (
        <>
            <Header style={styled.headerStyle}>
                <Flex gap="middle" align="center" justify="center" vertical>
                    <Row style={styled.rowStyle}>
                        <Col span={3} offset={3}>
                            <Button
                                style={styled.titleIconStyle}
                                size="large"
                                onClick={() => {
                                    setTutorialOpened(true);
                                }}
                            >
                                <QuestionCircleFilled />
                            </Button>
                            <Button
                                style={styled.titleIconStyle}
                                size="large"
                                onClick={() => {
                                    setAwardsOpened(true);
                                }}
                            >
                                <BookFilled />
                            </Button>
                        </Col>
                        <Col span={12} style={styled.colCenterStyle}>
                            <div style={styled.bigTitleStyle}>Needle v3.1</div>
                        </Col>
                        <Col span={3}>
                            <Dropdown menu={{ items }}>
                                <Button
                                    style={{
                                        ...styled.titleIconStyle,
                                    }}
                                    size="large"
                                    onClick={e => {
                                        if (
                                            config.mode === GameMode.QUICKPLAY
                                        ) {
                                            startQuickplay();
                                        } else {
                                            startStandard();
                                        }
                                    }}
                                    className="success-btn"
                                >
                                    {config.mode === GameMode.STANDARD ? (
                                        <TrophyOutlined />
                                    ) : (
                                        <ThunderboltOutlined />
                                    )}
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </Flex>
            </Header>

            <Content style={styled.contentStyle}>
                <Divider />
                {/* hidden */}
                <div style={{ display: 'none' }} key={key}></div>
                <div style={styled.gameModeStyle}>{state.chances}</div>
                <Divider />
                <Row
                    style={{
                        height: 1000,
                    }}
                >
                    <Col span={6}>
                        <b style={styled.sideTitleStyle}>说明</b>
                        <div id="description-board" style={styled.sideColStyle}>
                            <Info gameDispatches={gameDispatches} />
                        </div>
                    </Col>
                    <Col
                        span={12}
                        style={{
                            ...styled.midtopColStyle,
                            ...(state.status === GameStatus.SHOOTING
                                ? styled.BangCursorStyle
                                : {}),
                        }}
                    >
                        <Board gameDispatches={gameDispatches} />
                        <Chance chance={state.chances} />
                    </Col>
                    <Col span={6}>
                        <b style={styled.sideTitleStyle}>笔记</b>
                        <Flex gap="small" vertical>
                            <FoundProgress gameDispatches={gameDispatches} />
                        </Flex>
                    </Col>
                </Row>
                <Rank
                    isWin={state.isWin}
                    open={rankOpen}
                    setOpen={setRankOpen}
                    gameState={state}
                ></Rank>
            </Content>

            <Tutorial
                open={tutorialOpened}
                setOpen={setTutorialOpened}
            ></Tutorial>
            <Awards
                open={AwardsOpened}
                setOpen={setAwardsOpened}
                gameState={state}
            ></Awards>
        </>
    );
};

const onGameOver = (gameState: GameState): GameState => {
    gameState.statistic = loadMetricsFromGameState(gameState);
    gameState.statistic = updateCurrentAndHistoryAchivement(
        gameState.statistic,
    );
    gameState.statistic = updateCurrentRanks(gameState.statistic);
    return gameState;
};

const onRoundOver = (gameState: GameState): GameState => {
    if (gameState.chances === 1) gameState.statistic.mChancesOnlyOneFrequent++;
    return gameState;
};
export { Game, SearchAllSpots, onGameOver, onRoundOver };
export type { GameConfig, GameDispatches, GameState };
