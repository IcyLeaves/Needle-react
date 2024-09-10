import {
    SpotBoxColorCss,
    SpotBoxCss,
    SpotBoxVisibleCss,
} from '@/components/css/spot';
import { Component, MouseEventHandler } from 'react';
import {
    SpotBoxProps,
    SpotBoxState,
    SpotStatus,
    SpotVisible,
} from '../../models/spot';
class SpotBox extends Component<SpotBoxProps, SpotBoxState> {
    constructor(props: SpotBoxProps) {
        super(props);
        const { role, x, y, visible, status } = props;

        this.state = {
            x: x,
            y: y,
            role: role,
            visible: visible,
            status: status,
        };
    }

    handleClick: MouseEventHandler<HTMLElement> | undefined = (event: any) => {
        if (this.state.status === SpotStatus.LOCKED) {
            return;
        }

        if (this.props.gameState.chances === 0) {
            return;
        }

        if (this.state.visible === SpotVisible.REVEALED) {
            return;
        }
        let spots = this.props.gameState.spots;
        spots[this.state.x][this.state.y].visible = SpotVisible.REVEALED;

        this.props.setGameState({
            spots: spots,
            chances: this.props.gameState.chances - 1,
        });
    };

    render() {
        const { x, y } = this.state;
        if (this.state.status === SpotStatus.IDLE) {
            this.setState(this.props.gameState.spots[x][y]);
        }
        return (
            <div
                onClick={this.handleClick}
                style={Object.assign(
                    SpotBoxColorCss(this.state.role),
                    SpotBoxVisibleCss(this.state.visible),
                    SpotBoxCss,
                )}
            ></div>
        );
    }
}
export { SpotBox };
