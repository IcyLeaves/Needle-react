'use client';

import { SpotBox } from '@/components/css/component';
import Citizen from '@/components/roles/citizen/citizen';
import Detective from '@/components/roles/detective/detective';
import Target from '@/components/roles/target/target';
import { BookFilled, QuestionCircleFilled } from '@ant-design/icons';
import {
    Button,
    Col,
    ConfigProvider,
    Divider,
    Flex,
    Layout,
    Progress,
    Row,
} from 'antd';
import React from 'react';
import RoleInfoCard from '../components/public/role';
import * as styled from './style';
const { Header, Footer, Sider, Content } = Layout;
const alignOptions = ['flex-start', 'center', 'flex-end'];

const Board: React.FC = () => {
    let board = <></>;
    const rows = 8;
    const cols = 8;
    const rowTpl = <Row></Row>;
    const colTpl = (
        <Col span={3}>
            <SpotBox />
        </Col>
    );
    for (let i = 0; i < rows; i++) {
        let tempRow = <> </>;
        for (let j = 0; j < cols; j++) {
            tempRow = (
                <>
                    {tempRow}
                    {colTpl}
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

const Chance: React.FC = () => {
    return <div>🔍 × 11</div>;
};

const Note: React.FC = () => {
    return (
        <Flex gap="small" vertical>
            <Row>
                <Col span={6}>目标</Col>
                <Col span={18}>
                    <Progress strokeColor={'#66bb6a'} format={() => '0 / 1'} />
                </Col>
            </Row>
            <Row>
                <Col span={6}>警长</Col>
                <Col span={18}>
                    <Progress
                        strokeColor={'#5d4037'}
                        percent={100 / 5}
                        format={() => '0 / 5'}
                    />
                </Col>
            </Row>
        </Flex>
    );
};
const App: React.FC = () => {
    const [chances, setChances] = React.useState(16);

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
                            <Board />
                            <Chance />
                        </Col>
                        <Col span={6}>
                            <b style={styled.sideTitleStyle}>笔记</b>
                            <Note />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
