'use client';

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
    Row,
    Spin,
} from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import { Game, GameConfig } from '../components/public/game';
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
const App: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const seed = searchParams.get('seed');
    useEffect(() => {
        if (!seed) {
            const randomSeed = Math.floor(Math.random() * 1000000).toString();
            router.push('?seed=' + randomSeed);
        }
    }, [router]);
    if (!seed) {
        return <></>;
    }
    const boardConfig: GameConfig = {
        rows: 8,
        cols: 8,
        chances: 16,
        roleMap: {
            [Target().id]: 1,
            [Citizen().id]: 13,
            [Detective().id]: 12,
            [Jam().id]: 5,
            [Witch().id]: 3,
            [Sheriff().id]: 5,
            [Killer().id]: 3,
            [Augur().id]: 3,
            [Volunteer().id]: 3,
            [Copies().id]: 2,
            [Reporter().id]: 5,
            [Fortune().id]: 3,
            [Ganster().id]: 3,
            [BangBang().id]: 3,
        },
        seed: seed!.toString(),
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
                    fontFamily: 'normal',
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
                    <Game config={boardConfig} />
                </Content>
            </Layout>
        </ConfigProvider>
    );
};
export default function AppWrapper() {
    return (
        <Suspense fallback={<Spin />}>
            <App />
        </Suspense>
    );
}
