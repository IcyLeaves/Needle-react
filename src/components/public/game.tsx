import * as styled from '@/app/style';
import FoundProgress from '@/components/public/note';
import { Col, Divider, Flex, Row } from 'antd';
import React, { Dispatch, useState } from 'react';
import Role from '../../models/role';
import { SpotBoxState, SpotStatus, SpotVisible } from '../../models/spot';
import Deck from '../../utils/draw';
import str2role from '../roles/roles';
import Board from './board';
import { Info } from './info';

type GameProps = {
    config: GameConfig;
};
export type AnyFunction = (...args: any[]) => any;

type GameState = {
    chances: number;
    spots: SpotBoxState[][];
    clicks: number;
    isGameOver: boolean;
    onRoundStart: AnyFunction[];
    onFlip: AnyFunction[];
    onThatFlip: AnyFunction[];
    onRevealed: AnyFunction[];
    onThatRevealed: AnyFunction[];
};

type GameConfig = {
    rows: number;
    cols: number;
    chances: number;
    roleMap: {
        [x: string]: number;
    };
    seed: string;
};

type GameDispatches = {
    gameState: GameState;
    setGameState: Dispatch<GameState>;
    infoRoles: Role[];
    setInfoRoles: Dispatch<Role[]>;
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
    return new Deck<Role>(deck, config.seed);
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
                visible: SpotVisible.VISIBLE,
                status: SpotStatus.IDLE,
                buffs: new Map(),
            });
        }
    }
    return res;
};

const Game: React.FC<GameProps> = ({ config }) => {
    const [state, updateState] = useState<GameState>({
        chances: config.chances,
        clicks: 0,
        spots: InitSpotStates(InitSpotDeck(config), config),
        onRoundStart: [],
        onFlip: [],
        onThatFlip: [],
        onRevealed: [],
        onThatRevealed: [],
        isGameOver: false,
    });
    const [key, setKey] = useState(0);

    const setState: Dispatch<GameState> = (newState: GameState) => {
        updateState(newState);
        setKey(Math.random());
    };

    const [infoRoles, setInfoRoles] = useState<Role[]>([]);
    let gameDispatches: GameDispatches = {
        gameState: state,
        setGameState: setState,
        infoRoles: infoRoles,
        setInfoRoles: setInfoRoles,
    };
    return (
        <>
            {/* hidden */}
            <div style={{ display: 'none' }} key={key}></div>
            <div style={styled.gameModeStyle}>{state.chances}</div>
            <Divider />
            <Row>
                <Col span={6}>
                    <b style={styled.sideTitleStyle}>说明</b>
                    <div id="description-board" style={styled.sideColStyle}>
                        <Info gameDispatches={gameDispatches} />
                    </div>
                </Col>
                <Col span={12} style={styled.midColStyle}>
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
        </>
    );
};

export { Game };
export type { GameConfig, GameDispatches, GameState };
