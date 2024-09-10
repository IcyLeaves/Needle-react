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

const isLocked = (props: SpotBoxProps, state: SpotBoxState) => {
    return (
        state.status === SpotStatus.LOCKED ||
        props.gameState === undefined ||
        props.setGameState === undefined
    );
};
const SpotBox: React.FC<SpotBoxProps> = props => {
    const [state, setState] = useState<SpotBoxState>({
        x: props.x,
        y: props.y,
        role: props.role,
        visible: props.visible,
        status: props.status,
    });

    const handleClick = (event: any) => {
        if (isLocked(props, state)) {
            return;
        }
        let gameState = props.gameState!;
        if (gameState.chances === 0) {
            return;
        }

        if (state.visible === SpotVisible.REVEALED) {
            return;
        }

        const spots = gameState.spots;
        spots[state.x][state.y].visible = SpotVisible.REVEALED;

        props.setGameState!({
            spots: spots,
            chances: gameState.chances - 1,
        });
    };

    const handleMouseEnter = (event: any) => {
        if (isLocked(props, state) || !props.setInfoRoles) {
            return;
        }
        if (state.visible === SpotVisible.HIDDEN) {
            props.setInfoRoles([]);
            return;
        }
        props.setInfoRoles([state.role]);
    };

    const handleMouseLeave = (event: any) => {
        if (isLocked(props, state) || !props.setInfoRoles) {
            return;
        }

        props.setInfoRoles([]);
    };
    useEffect(() => {
        if (isLocked(props, state)) {
            return;
        }
        if (state.status === SpotStatus.IDLE) {
            setState(props.gameState!.spots[state.x][state.y]);
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
