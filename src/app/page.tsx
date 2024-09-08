'use client';

import Citizen from '@/components/roles/citizen/citizen';
import Detective from '@/components/roles/detective/detective';
import Target from '@/components/roles/target/target';
import { BookFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Button, Col, ConfigProvider, Divider, Flex, Layout, Row } from 'antd';
import React from 'react';
import Board from '../components/public/board';
import RoleInfoCard from '../components/public/infocard';
import FoundProgress from '../components/public/progress';
import Augur from '../components/roles/augur/augur';
import BangBang from '../components/roles/bangbang/bangbang';
import Copies from '../components/roles/copies/copies';
import Fortune from '../components/roles/fortune/fortune';
import Ganster from '../components/roles/ganster/ganster';
import Jam from '../components/roles/jam/jam';
import Killer from '../components/roles/killer/killer';
import Reporter from '../components/roles/reporter/reporter';
import Sheriff from '../components/roles/sheriff/sheriff';
import Volunteer from '../components/roles/volunteer/volunteer';
import Witch from '../components/roles/witch/witch';
import * as styled from './style';
const { Header, Footer, Sider, Content } = Layout;
const alignOptions = ['flex-start', 'center', 'flex-end'];

const Chance: React.FC<{ chance: number }> = props => {
    const { chance } = props;
    return <div style={{ marginTop: 20 }}>🔍 × {chance}</div>;
};

const App: React.FC = () => {
    const [chances, setChances] = React.useState(16);
    const boardConfig = {
        rows: 8,
        cols: 8,
        roleMap: {
            [Target.id]: 1,
            [Citizen.id]: 13,
            [Detective.id]: 12,
            [Jam.id]: 5,
            [Witch.id]: 3,
            [Sheriff.id]: 5,
            [Killer.id]: 3,
            [Augur.id]: 3,
            [Volunteer.id]: 3,
            [Copies.id]: 2,
            [Reporter.id]: 5,
            [Fortune.id]: 3,
            [Ganster.id]: 3,
            [BangBang.id]: 3,
        },
    };
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        bodyBg: 'white',
                        headerBg: 'white',
                        headerColor: 'black',
                    },
                },
                token: {
                    lineWidth: 2,
                    marginLG: 8,
                    fontSize: 16,
                },
            }}
        >
            <Layout style={styled.layoutStyle}>
                <Header style={styled.headerStyle}>
                    <Flex gap="middle" align="center" justify="center" vertical>
                        <Row style={styled.rowStyle}>
                            <Col span={3} offset={3}>
                                <Button
                                    style={styled.titleIconStyle}
                                    size="large"
                                >
                                    <QuestionCircleFilled />
                                </Button>
                                <Button
                                    style={styled.titleIconStyle}
                                    size="large"
                                >
                                    <BookFilled />
                                </Button>
                            </Col>
                            <Col span={12} style={styled.colCenterStyle}>
                                <div style={styled.bigTitleStyle}>
                                    Needle v3.0
                                </div>
                            </Col>
                            <Col span={3}></Col>
                        </Row>
                    </Flex>
                </Header>

                <Content style={styled.contentStyle}>
                    <Divider />
                    <div style={styled.gameModeStyle}>{chances}</div>
                    <Divider />
                    <Row>
                        <Col span={6}>
                            <b style={styled.sideTitleStyle}>说明</b>
                            <div
                                id="description-board"
                                style={styled.sideColStyle}
                            >
                                <RoleInfoCard role={Citizen} />
                                <RoleInfoCard role={Detective} />
                                <RoleInfoCard role={Target} />
                            </div>
                        </Col>
                        <Col span={12} style={styled.midColStyle}>
                            <Board
                                config={boardConfig}
                                chances={chances}
                                setChances={setChances}
                            />
                            <Chance chance={chances} />
                        </Col>
                        <Col span={6}>
                            <b style={styled.sideTitleStyle}>笔记</b>
                            <Flex gap="small" vertical>
                                <FoundProgress config={boardConfig} />
                            </Flex>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
