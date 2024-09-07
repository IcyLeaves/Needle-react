import { Col, Row } from 'antd';
import Role from '../../models/role';
import str2role from '../roles/roles';
import { RoleBox } from './role';
export type BoardConfig = {
    rows: number;
    cols: number;
    roleMap: Record<string, number>;
};
class RoleDeck {
    private deck: Role[];

    constructor(config: BoardConfig) {
        this.deck = [];
        for (var key in config.roleMap) {
            var value = config.roleMap[key];
            for (var i = 0; i < value; i++) {
                this.deck.push(str2role(key));
            }
        }
        this.shuffle();
    }

    private shuffle(): void {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    public draw(): Role | undefined {
        return this.deck.pop();
    }
}

const InitSpotbox = (role: Role) => {
    return <RoleBox role={role}></RoleBox>;
};

const Board: React.FC<{ config: BoardConfig }> = props => {
    const { config } = props;
    let board = <></>;
    const rows = config.rows || 8;
    const cols = config.cols || 8;
    // init RoleDeck
    const roleDeck = new RoleDeck(config);
    for (let i = 0; i < rows; i++) {
        let tempRow = <> </>;
        for (let j = 0; j < cols; j++) {
            tempRow = (
                <>
                    {tempRow}
                    <Col span={(24 - cols) / cols + 1}>
                        {InitSpotbox(roleDeck.draw()!)}
                    </Col>
                </>
            );
        }
        board = (
            <>
                <Row>{tempRow}</Row>
                {board}
            </>
        );
    }
    let boardContainerCss: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        width: `calc(${cols}* 3rem + ${cols}* 8px)`,
    };
    return <div style={boardContainerCss}>{board}</div>;
};

export default Board;
