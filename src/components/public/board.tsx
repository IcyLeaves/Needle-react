import { Col, Row } from 'antd';
import { Dispatch } from 'react';
import Role from '../../models/role';
import { SpotBoxState } from '../../models/spot';
import { GameDispatches, GameState } from './game';
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
    infoRoles: Role[],
    setInfoRoles: Dispatch<Role[]>,
): JSX.Element => {
    return (
        <>
            {Array.from({ length: rows }, (_, i) => (
                <Row key={i}>
                    {Array.from({ length: cols }, (_, j) => (
                        <Col span={(24 - cols) / cols + 1} key={j}>
                            <SpotBox
                                role={spots[i][j].role}
                                x={i}
                                y={j}
                                visible={spots[i][j].visible}
                                status={spots[i][j].status}
                                gameState={gameState}
                                setGameState={setGameState}
                                infoRoles={infoRoles}
                                setInfoRoles={setInfoRoles}
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
    const { gameState, setGameState, infoRoles, setInfoRoles } = gameDispatches;

    let rows = gameState.spots.length;
    let cols = gameState.spots[0].length;
    // init
    let board = renderSpotBoard(
        rows,
        cols,
        gameState.spots,
        gameState,
        setGameState,
        infoRoles,
        setInfoRoles,
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
