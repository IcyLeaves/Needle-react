import { Component, MouseEventHandler } from 'react';
import {
    SpotBoxColorCss,
    SpotBoxCss,
    SpotBoxVisibleCss,
} from '../components/css/spot';
import Role from './role';

enum SpotVisible {
    HIDDEN = 'HIDDEN',
    VISIBLE = 'VISIBLE',
    REVEALED = 'REVEALED',
}

enum SpotStatus {
    IDLE = 'IDLE',
    LOCKED = 'LOCKED',
}

type SpotBoxState = {
    // x: row id
    x: number;
    // y: col id
    y: number;
    // role: Role
    role: Role;
    // visible: HIDDEN, VISIBLE, REVEALED
    visible: SpotVisible;
    // status: IDLE, LOCKED
    status: SpotStatus;
};

type SpotBoxProps = {
    // x: row id
    x: number;
    // y: col id
    y: number;
    // role: Role
    role: Role;
    // visible: HIDDEN, VISIBLE, REVEALED
    visible: SpotVisible;
    // status: IDLE, LOCKED
    status: SpotStatus;

    // From Board
    chances: number;
    fnSetChances: any;
};
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
        this.setState({
            visible: SpotVisible.REVEALED,
        });
        this.props.fnSetChances(this.props.chances - 1);
    };

    render() {
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

export { SpotBox, SpotStatus, SpotVisible };
