import { Col, Row } from 'antd';
import { SpotBoxState } from '../../models/spot';
import { GameDispatches } from './game';
import { SpotBox } from './spot';
export type BoardConfig = {
    rows: number;
    cols: number;
    roleMap: Record<string, number>;
};

const renderSpotBoard = (
    rows: number,
    cols: number,
    spots: SpotBoxState[][],
    gameDispatches: GameDispatches,
): JSX.Element => {
    return (
        <>
            {Array.from({ length: rows }, (_, i) => (
                <Row key={i}>
                    {Array.from({ length: cols }, (_, j) => (
                        <Col span={(24 - cols) / cols + 1} key={j}>
                            <SpotBox
                                key={`spotbox-${i}-${j}`}
                                boxState={spots[i][j]}
                                gameDispatches={gameDispatches}
                            />
                        </Col>
                    ))}
                </Row>
            ))}
        </>
    );
};

const Board: React.FC<{
    gameDispatches: GameDispatches;
}> = props => {
    const { gameDispatches } = props;
    const { gameState } = gameDispatches;

    let rows = gameState.spots.length;
    let cols = gameState.spots[0].length;
    // init
    let board = renderSpotBoard(rows, cols, gameState.spots, gameDispatches);

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
