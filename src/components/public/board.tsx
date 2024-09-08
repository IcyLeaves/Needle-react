import { Col, Row } from 'antd';
import Role from '../../models/role';
import { SpotBox, SpotStatus, SpotVisible } from '../../models/spot';
import Deck from '../../utils/draw';
import str2role from '../roles/roles';
export type BoardConfig = {
    rows: number;
    cols: number;
    roleMap: Record<string, number>;
};

const InitSpotBoard = (
    rows: number,
    cols: number,
    deck: Deck<Role>,
    chances: any,
    setChances: any,
): JSX.Element => {
    let board = <> </>;
    for (let i = 0; i < rows; i++) {
        let tempRow = <> </>;
        for (let j = 0; j < cols; j++) {
            tempRow = (
                <>
                    {tempRow}
                    <Col span={(24 - cols) / cols + 1}>
                        <SpotBox
                            role={deck.draw()!}
                            x={i}
                            y={j}
                            visible={SpotVisible.HIDDEN}
                            status={SpotStatus.IDLE}
                            chances={chances}
                            fnSetChances={setChances}
                        />
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
    return board;
};

const InitSpotDeck = (config: BoardConfig): Deck<Role> => {
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

const Board: React.FC<{
    config: BoardConfig;
    chances: any;
    setChances: any;
}> = props => {
    const { config, chances, setChances } = props;
    // params
    const rows = config.rows || 8;
    const cols = config.cols || 8;
    // init
    const spotDeck = InitSpotDeck(config);
    let board = InitSpotBoard(rows, cols, spotDeck, chances, setChances);

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
