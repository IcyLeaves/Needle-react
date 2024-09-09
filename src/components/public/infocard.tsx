import Role from '@/models/role';
import { SpotStatus, SpotVisible } from '@/models/spot';
import { Card, Col, Row } from 'antd';
import { Dispatch } from 'react';
import { GameState } from './game';
import { RoleLabel } from './role';
import { SpotBox } from './spot';
const RoleInfoCard: React.FC<{
    role: Role;
    gameState: GameState;
    setGameState: Dispatch<GameState>;
}> = props => {
    const { role, gameState, setGameState } = props;

    return (
        <>
            <Row>
                <Col span={20} offset={2}>
                    <Card
                        style={{
                            margin: '10px',
                        }}
                    >
                        <Row>
                            <Col
                                span={6}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <SpotBox
                                    role={role}
                                    x={0}
                                    y={0}
                                    visible={SpotVisible.REVEALED}
                                    status={SpotStatus.LOCKED}
                                    gameState={gameState}
                                    setGameState={setGameState}
                                />
                            </Col>
                            <Col span={18}>
                                <RoleLabel role={role} />
                                <div>{role.description}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default RoleInfoCard;
