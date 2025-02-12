import {
    SpotBoxColorCss,
    SpotBoxCss,
    SpotBoxVisibleCss,
} from '@/components/css/spot';
import { useEffect, useState } from 'react';
import { DefaultSpotBoxState } from '../../models/role';
import {
    SpotBoxProps,
    SpotBoxState,
    SpotStatus,
    SpotVisible,
} from '../../models/spot';
import { Buff } from '../buffs/buffs';
import MoneyBag from '../buffs/fortune';
import { Bro, Stop } from '../buffs/ganster';
import Jammed from '../buffs/jam';
import BangBang from '../roles/bangbang/bangbang';
import Copies from '../roles/copies/copies';
import Fortune from '../roles/fortune/fortune';
import Ganster from '../roles/ganster/ganster';
import Jam from '../roles/jam/jam';
import Killer from '../roles/killer/killer';
import Sheriff from '../roles/sheriff/sheriff';
import Volunteer from '../roles/volunteer/volunteer';
import Witch from '../roles/witch/witch';
import {
    GameDispatches,
    GameStatus,
    SearchAllSpots,
    onGameOver,
    onRoundOver,
} from './game';

const isLocked = (gameDispatches: GameDispatches, state: SpotBoxState) => {
    return (
        state.status === SpotStatus.LOCKED ||
        gameDispatches.gameState === undefined ||
        gameDispatches.setGameState === undefined ||
        state.buffs.get(Stop().id) !== undefined ||
        state.buffs.get(Bro().id) !== undefined
    );
};

const SpotBox: React.FC<SpotBoxProps> = props => {
    const { boxState, gameDispatches } = props;
    let { x, y, role, visible, status, buffs, attrs } = boxState;
    let { gameState, setGameState } = gameDispatches;
    let [state, setState] = useState<SpotBoxState>({
        x: x,
        y: y,
        role: role,
        visible: visible,
        status: status,
        buffs: buffs,
        attrs: attrs,
    });
    const handleClick = (event: any) => {
        if (isLocked(gameDispatches, state)) {
            return;
        }

        // 游戏结束不能点击
        if (gameState.isGameOver) {
            return;
        }

        // 已经翻过了
        if (state.visible === SpotVisible.REVEALED) {
            return;
        }
        //可以正常进入点击吗？
        switch (gameState.status) {
            case GameStatus.REVEALING:
            case GameStatus.EARNING:
                // 进入点击
                for (let i = 0; i < gameState.spots.length; i++) {
                    for (let j = 0; j < gameState.spots[i].length; j++) {
                        gameState = Witch().onFlip!(gameState, i, j);
                    }
                }
                for (let i = 0; i < gameState.spots.length; i++) {
                    for (let j = 0; j < gameState.spots[i].length; j++) {
                        gameState = Volunteer().onActivating!(
                            gameState,
                            i,
                            j,
                            state,
                        );
                    }
                }

                // 消耗线索
                gameState.chances = gameState.chances - 1;

                Jam().onBeforeRevealed!(gameState, x, y);
                if (!state.buffs.has(Jammed().id)) {
                    // 揭露了，但翻开前先激活
                    // 随机一个替身

                    var chosenCopyIdx = gameState.seed.intVal(
                        SearchAllSpots(gameState, box => {
                            return (
                                box.role.id == Copies().id &&
                                box.visible != SpotVisible.REVEALED
                            );
                        }).length - 1,
                    );
                    let newBoxState: SpotBoxState;

                    for (
                        let i = 0, copyIdx = 0;
                        i < gameState.spots.length;
                        i++
                    ) {
                        for (let j = 0; j < gameState.spots[i].length; j++) {
                            gameState = Witch().onActivating!(
                                gameState,
                                i,
                                j,
                                state,
                            );

                            [gameState, copyIdx, newBoxState] = Copies()
                                .onActivating!(
                                gameState,
                                i,
                                j,
                                state,
                                copyIdx,
                                chosenCopyIdx,
                            );
                            if (newBoxState) {
                                role = newBoxState.role;
                                visible = newBoxState.visible;
                                status = newBoxState.status;
                                buffs = newBoxState.buffs;
                            }
                        }
                    }

                    gameState.spots[state.x][state.y].visible =
                        SpotVisible.REVEALED;
                    for (let i = 0; i < gameState.spots.length; i++) {
                        for (let j = 0; j < gameState.spots[i].length; j++) {
                            gameState = Killer().onActivating!(
                                gameState,
                                i,
                                j,
                                state,
                            );
                        }
                    }
                    gameState = Fortune().onRevealed!(gameState, x, y);
                    if (role.onRevealed) {
                        //揭露时
                        gameState = role.onRevealed(gameState, x, y);
                    }
                }
                break;
            case GameStatus.SHOOTING:
                // 进入射击, TODO OnShooting
                for (let i = 0; i < gameState.spots.length; i++) {
                    for (let j = 0; j < gameState.spots[i].length; j++) {
                        gameState = BangBang().onActivating!(
                            gameState,
                            i,
                            j,
                            x,
                            y,
                        );
                    }
                }
                break;
        }

        gameState = Ganster().onRoundOver!(gameState);
        gameState = Witch().onRoundOver!(gameState);
        gameState = Sheriff().onRoundOver!(gameState);
        gameState.clicks = gameState.clicks + 1;
        if (gameState.chances <= 0) {
            gameState.isGameOver = true;
        }
        onRoundOver(gameState);
        onGameOver(gameState);
        setGameState(gameState);
    };

    const handleMouseEnter = (event: any) => {
        if (
            (isLocked(gameDispatches, state) && (state.x < 0 || state.y < 0)) ||
            !gameDispatches.setinfoSpot
        ) {
            return;
        }
        if (state.visible === SpotVisible.HIDDEN) {
            gameDispatches.setinfoSpot(DefaultSpotBoxState);
            return;
        }
        gameDispatches.setinfoSpot(state);
    };

    const handleMouseLeave = (event: any) => {
        if (
            (isLocked(gameDispatches, state) && (state.x < 0 || state.y < 0)) ||
            !gameDispatches.setinfoSpot
        ) {
            return;
        }

        gameDispatches.setinfoSpot(DefaultSpotBoxState);
    };

    useEffect(() => {
        let oldGameState = gameDispatches.gameState!;
        if (state.x === -1 || state.y === -1) {
            return;
        }
        oldGameState.spots[state.x][state.y] = state;
        setGameState(oldGameState);
    }, [state, gameState, gameDispatches.gameState]);

    return (
        <div
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                ...SpotBoxColorCss(state.role),
                ...SpotBoxVisibleCss(state.visible),
                ...SpotBoxCss,
            }}
        >
            {Array.from(state.buffs.values()).map((buff: Buff): JSX.Element => {
                if (
                    buff.id === MoneyBag().id &&
                    state.visible === SpotVisible.HIDDEN
                ) {
                    return <></>;
                }
                let buffIcon = buff.icon[0];
                if (buff.idx) {
                    buffIcon = buff.icon[buff.idx];
                }
                return (
                    <div style={{ pointerEvents: 'none' }} key={buff.id}>
                        {buffIcon}
                    </div>
                );
            })}
        </div>
    );
};

export { SpotBox };
