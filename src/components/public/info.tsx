import Role from '@/models/role';
import { SpotStatus, SpotVisible } from '@/models/spot';
import { Card, Col, Row } from 'antd';
import { GameDispatches } from './game';
import { RoleLabel } from './role';
import { SpotBox } from './spot';

const Info: React.FC<{
    gameDispatches: GameDispatches;
}> = props => {
    const { gameDispatches } = props;
    const { infoRoles } = gameDispatches;
    return (
        <>
            {infoRoles.map(role => (
                <RoleInfoCard
                    key={role.id}
                    role={role}
                    gameDispatches={gameDispatches}
                />
            ))}
        </>
    );
};
const RoleInfoCard: React.FC<{
    role: Role;
    gameDispatches: GameDispatches;
}> = props => {
    const { role, gameDispatches } = props;

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
                                    boxState={{
                                        role: role,
                                        visible: SpotVisible.REVEALED,
                                        status: SpotStatus.LOCKED,
                                        buffs: new Map(),
                                        x: -1,
                                        y: -1,
                                    }}
                                    gameDispatches={gameDispatches}
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

export { Info };
