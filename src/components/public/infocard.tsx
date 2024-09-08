import { Card, Col, Row } from 'antd';
import Role from '../../models/role';
import { SpotBox, SpotStatus, SpotVisible } from '../../models/spot';
import { RoleLabel } from './role';

const RoleInfoCard: React.FC<{ role: Role }> = props => {
    const { role } = props;

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
