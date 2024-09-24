import {
    SpotBoxColorCss,
    SpotBoxCss,
    SpotBoxVisibleCss,
} from '@/components/css/spot';
import { useEffect, useState } from 'react';
import {
    SpotBoxProps,
    SpotBoxState,
    SpotStatus,
    SpotVisible,
} from '../../models/spot';
import { nearEight } from '../../utils/graph';
import { Buff } from '../buffs/buffs';
import Jammed from '../buffs/jam';
import Cursing from '../buffs/witch';
import Jam from '../roles/jam/jam';
import Sheriff from '../roles/sheriff/sheriff';
import Witch from '../roles/witch/witch';
import { GameDispatches } from './game';

const isLocked = (gameDispatches: GameDispatches, state: SpotBoxState) => {
    return (
        state.status === SpotStatus.LOCKED ||
        gameDispatches.gameState === undefined ||
        gameDispatches.setGameState === undefined
    );
};

const SpotBox: React.FC<SpotBoxProps> = props => {
    const { boxState, gameDispatches } = props;
    const { x, y, role, visible, status, buffs } = boxState;
    let { gameState, setGameState } = gameDispatches;
    const [state, setState] = useState<SpotBoxState>({
        x: x,
        y: y,
        role: role,
        visible: visible,
        status: status,
        buffs: buffs,
    });
    const handleClick = (event: any) => {
        if (isLocked(gameDispatches, state)) {
            return;
        }

        // 没有线索不能点击
        if (gameState.chances === 0) {
            return;
        }

        // 已经翻过了
        if (state.visible === SpotVisible.REVEALED) {
            return;
        }

        // 消耗线索
        gameState.chances = gameState.chances - 1;

        //
        Jam().onBeforeRevealed!(gameState, x, y);
        if (!state.buffs.has(Jammed().id)) {
            // 揭露了，但翻开前先激活
            for (let i = 0; i < gameState.spots.length; i++) {
                for (let j = 0; j < gameState.spots[i].length; j++) {
                    if (gameState.spots[i][j].buffs.has(Cursing().id)) {
                        gameState = Witch().onActivating!(
                            gameState,
                            i,
                            j,
                            state,
                        );
                    }
                }
            }

            gameState.spots[state.x][state.y].visible = SpotVisible.REVEALED;
            // sheriff
            let nears = nearEight(gameState.spots, x, y);
            for (var near of nears) {
                if (!near) continue;
                gameState = Sheriff().onActivating!(
                    gameState,
                    near.x,
                    near.y,
                    state,
                );
            }
            if (role.onRevealed) {
                //揭露时
                gameState = role.onRevealed(gameState, x, y);
            }
        }

        gameState.clicks = gameState.clicks + 1;

        setGameState(gameState);
    };

    const handleMouseEnter = (event: any) => {
        if (isLocked(gameDispatches, state) || !gameDispatches.setInfoRoles) {
            return;
        }
        if (state.visible === SpotVisible.HIDDEN) {
            gameDispatches.setInfoRoles([]);
            return;
        }
        gameDispatches.setInfoRoles([state.role]);
    };

    const handleMouseLeave = (event: any) => {
        if (isLocked(gameDispatches, state) || !gameDispatches.setInfoRoles) {
            return;
        }

        gameDispatches.setInfoRoles([]);
    };

    useEffect(() => {
        let oldGameState = gameDispatches.gameState!;
        if (state.x === -1 || state.y === -1) {
            return;
        }
        oldGameState.spots[state.x][state.y] = state;
        setGameState(oldGameState);
    }, [state, gameState]);

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
