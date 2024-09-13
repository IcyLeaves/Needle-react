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
import { GameDispatches } from './game';

const isLocked = (gameDispatches: GameDispatches, state: SpotBoxState) => {
    return (
        state.status === SpotStatus.LOCKED ||
        gameDispatches.gameState === undefined ||
        gameDispatches.setGameState === undefined
    );
};

const SpotBox: React.FC<SpotBoxProps> = props => {
    const { x, y, role, visible, status, gameDispatches } = props;
    const { gameState, setGameState } = gameDispatches;
    const [state, setState] = useState<SpotBoxState>({
        x: x,
        y: y,
        role: role,
        visible: visible,
        status: status,
    });

    const handleClick = (event: any) => {
        if (isLocked(gameDispatches, state)) {
            return;
        }
        let gameState = gameDispatches.gameState!;

        if (gameState.chances === 0) {
            return;
        }

        if (state.visible === SpotVisible.REVEALED) {
            return;
        }

        gameState.chances = gameState.chances - 1;

        gameState.spots[state.x][state.y].visible = SpotVisible.REVEALED;
        if (role.onRevealed) {
            gameState = role.onRevealed(gameState);
        }
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
        if (isLocked(gameDispatches, state)) {
            return;
        }
        if (state.status === SpotStatus.IDLE) {
            setState(gameDispatches.gameState!.spots[state.x][state.y]);
        }
    }, [state]);

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
        ></div>
    );
};

export { SpotBox };
