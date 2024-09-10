import * as styled from '@/app/style';
import FoundProgress from '@/components/public/note';
import Citizen from '@/components/roles/citizen/citizen';
import Detective from '@/components/roles/detective/detective';
import Target from '@/components/roles/target/target';
import { Col, Divider, Flex, Row } from 'antd';
import React, { useState } from 'react';
import Role from '../../models/role';
import { SpotBoxState, SpotStatus, SpotVisible } from '../../models/spot';
import Deck from '../../utils/draw';
import str2role from '../roles/roles';
import Board from './board';
import RoleInfoCard from './infocard';

type GameProps = {
    config: GameConfig;
};

type GameState = {
    chances: number;
    spots: SpotBoxState[][];
};

type GameConfig = {
    rows: number;
    cols: number;
    chances: number;
    roleMap: {
        [x: string]: number;
    };
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
    return new Deck<Role>(deck);
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
                visible: SpotVisible.HIDDEN,
                status: SpotStatus.IDLE,
            });
        }
    }
    return res;
};

const Game: React.FC<GameProps> = ({ config }) => {
    const [state, setState] = useState<GameState>({
        chances: config.chances,
        spots: InitSpotStates(InitSpotDeck(config), config),
    });

    const { chances } = state;

    return (
        <>
            <div style={styled.gameModeStyle}>{chances}</div>
            <Divider />
            <Row>
                <Col span={6}>
                    <b style={styled.sideTitleStyle}>说明</b>
                    <div id="description-board" style={styled.sideColStyle}>
                        <RoleInfoCard
                            role={Citizen}
                            gameState={state}
                            setGameState={setState}
                        />
                        <RoleInfoCard
                            role={Detective}
                            gameState={state}
                            setGameState={setState}
                        />
                        <RoleInfoCard
                            role={Target}
                            gameState={state}
                            setGameState={setState}
                        />
                    </div>
                </Col>
                <Col span={12} style={styled.midColStyle}>
                    <Board gameState={state} setGameState={setState} />
                    <Chance chance={chances} />
                </Col>
                <Col span={6}>
                    <b style={styled.sideTitleStyle}>笔记</b>
                    <Flex gap="small" vertical>
                        <FoundProgress gameState={state} />
                    </Flex>
                </Col>
            </Row>
        </>
    );
};

export { Game };
export type { GameState };
