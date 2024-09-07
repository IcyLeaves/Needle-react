import { SpotBoxCss } from '@/components/css/component';
import { BoldCss } from '@/components/css/style';
import { Card, Col, Row } from 'antd';
import React from 'react';
import Role from '../../models/role';

const RoleColorCss = (role: Role) => {
    let res: React.CSSProperties = {
        backgroundColor: `${role.color}`,
    };
    return res;
};

const RoleBox: React.FC<{ role: Role }> = props => {
    const { role } = props;
    return <div style={Object.assign(RoleColorCss(role), SpotBoxCss)}></div>;
};

const RoleInfoCard: React.FC<{ role: Role }> = props => {
    const { role } = props;

    return (
        <>
            <Card
                style={{
                    margin: '10px',
                }}
            >
                <Row>
                    <Col span={8}>
                        <RoleBox role={role} />
                    </Col>
                    <Col span={16}>
                        <div style={BoldCss}>{role.name}</div>
                        <div>{role.description}</div>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export { RoleBox, RoleInfoCard };
