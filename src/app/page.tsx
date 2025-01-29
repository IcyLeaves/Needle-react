'use client';

import '@/components/css/raw.css';
import Citizen from '@/components/roles/citizen/citizen';
import Detective from '@/components/roles/detective/detective';
import Target from '@/components/roles/target/target';
import { ConfigProvider, Layout, Spin } from 'antd';
import {
    ReadonlyURLSearchParams,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import { Game, GameConfig, GameMode } from '../components/public/game';
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
    const mode = searchParams.get('mode');
    let initGameModeAndSeed = (
        urlParams: ReadonlyURLSearchParams,
    ): { mode: GameMode; seed: string } => {
        const mode = urlParams.get('mode');
        const seed = urlParams.get('seed');
        const nowSeed = generateTimeBasedString();
        const randomSeed = Math.floor(Math.random() * 1000000).toString();

        switch (mode) {
            case GameMode.QUICKPLAY:
                if (!seed) {
                    return { mode: mode, seed: randomSeed };
                }
                return { mode: mode, seed: seed };
            case GameMode.STANDARD:
                return { mode: mode, seed: nowSeed };
            default:
                if (!seed) {
                    return { mode: GameMode.QUICKPLAY, seed: randomSeed };
                } else if (seed === nowSeed) {
                    return { mode: GameMode.STANDARD, seed: seed };
                }
                return { mode: GameMode.QUICKPLAY, seed: randomSeed };
        }
    };

    useEffect(() => {
        let params = initGameModeAndSeed(searchParams);
        router.push(`?seed=${params.seed}&mode=${params.mode}`);
    }, [router, searchParams]);

    if (!seed || !mode) {
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
        mode: mode as GameMode,
    };
    // setStorage('statistic', null); // dev

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
                <Game config={boardConfig} />
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

function generateTimeBasedString() {
    const currentTime = new Date();
    const timeZoneOffset = currentTime.getTimezoneOffset();
    const unixTimestamp = currentTime.getTime() / 1000 + timeZoneOffset * 60;
    const twoHourBlock = Math.floor(unixTimestamp / 7200);
    const hexString = twoHourBlock.toString(16).padStart(16, '0');
    const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let base32String = '';
    for (let i = 0; i < hexString.length; i += 2) {
        const hexPair = hexString.slice(i, i + 2);
        const decimalValue = parseInt(hexPair, 16);
        const base32Index = decimalValue % 32;
        base32String += base32Alphabet[base32Index];
    }
    return base32String;
}
