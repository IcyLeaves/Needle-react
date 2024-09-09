import { Col, Row } from 'antd';
import { Dispatch } from 'react';
import { SpotBoxState } from '../../models/spot';
import { GameState } from './game';
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
    gameState: GameState,
    setGameState: Dispatch<GameState>,
): JSX.Element => {
    let board = <> </>;
    for (let i = 0; i < rows; i++) {
        let tempRow = <> </>;
        for (let j = 0; j < cols; j++) {
            let spot = spots[i][j];

            tempRow = (
                <>
                    {tempRow}
                    <Col span={(24 - cols) / cols + 1}>
                        <SpotBox
                            role={spot.role}
                            x={i}
                            y={j}
                            visible={spot.visible}
                            status={spot.status}
                            gameState={gameState}
                            setGameState={setGameState}
                        />
                    </Col>
                </>
            );
        }
        board = (
            <>
                {board}
                <Row>{tempRow}</Row>
            </>
        );
    }

    return board;
};

const Board: React.FC<{
    gameState: GameState;
    setGameState: Dispatch<GameState>;
}> = props => {
    const { gameState, setGameState } = props;

    let rows = gameState.spots.length;
    let cols = gameState.spots[0].length;
    // init
    let board = renderSpotBoard(
        rows,
        cols,
        gameState.spots,
        gameState,
        setGameState,
    );

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
