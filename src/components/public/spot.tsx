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

interface Props extends SpotBoxProps {}

const SpotBox: React.FC<Props> = props => {
    const [state, setState] = useState<SpotBoxState>({
        x: props.x,
        y: props.y,
        role: props.role,
        visible: props.visible,
        status: props.status,
    });

    const handleClick = (event: any) => {
        if (state.status === SpotStatus.LOCKED) {
            return;
        }

        if (props.gameState.chances === 0) {
            return;
        }

        if (state.visible === SpotVisible.REVEALED) {
            return;
        }

        const spots = props.gameState.spots;
        spots[state.x][state.y].visible = SpotVisible.REVEALED;

        props.setGameState({
            spots: spots,
            chances: props.gameState.chances - 1,
        });
    };

    useEffect(() => {
        if (state.status === SpotStatus.IDLE) {
            setState(props.gameState.spots[state.x][state.y]);
        }
    }, [state]);

    return (
        <div
            onClick={handleClick}
            style={{
                ...SpotBoxColorCss(state.role),
                ...SpotBoxVisibleCss(state.visible),
                ...SpotBoxCss,
            }}
        ></div>
    );
};

export { SpotBox };
