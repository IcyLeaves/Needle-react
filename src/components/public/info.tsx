import Role, { DefaultLightRole, DefaultSpotBoxState } from '@/models/role';
import { SpotStatus, SpotVisible } from '@/models/spot';
import { Card, Col, Row } from 'antd';
import { Buff } from '../buffs/buffs';
import { GameDispatches } from './game';
import { RoleLabel } from './role';
import { SpotBox } from './spot';

const Info: React.FC<{
    gameDispatches: GameDispatches;
}> = props => {
    const { gameDispatches } = props;
    const { infoSpot } = gameDispatches;
    if (infoSpot === DefaultSpotBoxState) {
        return <></>;
    }
    var buffReact: JSX.Element[] = [];
    var keywordsReact: JSX.Element[] = [];
    var content: string = '';
    if (infoSpot.buffs.size > 0) {
        infoSpot.buffs.forEach((buff, key) => {
            buffReact.push(
                <BuffInfoCard
                    key={buff.id}
                    buff={buff}
                    gameDispatches={gameDispatches}
                />,
            );
            content += buff.description;
        });
    }
    content += infoSpot.role.description;
    genKeywords(content).forEach((value, idx) => {
        keywordsReact.push(<KeywordInfoCard key={value} keyword={value} />);
    });
    return (
        <>
            {
                <RoleInfoCard
                    key={infoSpot.role.id}
                    role={infoSpot.role}
                    gameDispatches={gameDispatches}
                />
            }
            {buffReact}
            {keywordsReact}
        </>
    );
};

const RoleInfoCard: React.FC<{
    role: Role;
    gameDispatches: GameDispatches;
}> = ({ role, gameDispatches }) => {
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
                                        attrs: new Map(),
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

const BuffInfoCard: React.FC<{
    buff: Buff;
    gameDispatches: GameDispatches;
}> = ({ buff, gameDispatches }) => {
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
                                        role: DefaultLightRole,
                                        visible: SpotVisible.REVEALED,
                                        status: SpotStatus.LOCKED,
                                        buffs: new Map([[buff.id, buff]]),
                                        attrs: new Map(),
                                        x: -1,
                                        y: -1,
                                    }}
                                    gameDispatches={gameDispatches}
                                />
                            </Col>
                            <Col span={18}>
                                <div>{buff.name}</div>

                                <div>{buff.description}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

const Keywords: Map<string, string> = new Map([
    ['现身', '角色显示出自己的身份'],
    ['调查', '耗费一个🔍使角色【现身】'],
    ['光明势力', '技能说明背景为白色的角色'],
    ['黑暗势力', '技能说明背景为黑色的角色'],
    ['周围', '特指角色周围8格的区域'],
    ['相邻', '特指角色相邻4格的区域'],
    ['暗杀', '不耗费🔍。使一个角色【现身】且失去效果。暗杀目标视为失败'],
]);

const genKeywords = (content: string): string[] => {
    let res: string[] = [];
    Keywords.forEach((value, key) => {
        if (content.includes(key)) {
            res.push(key);
        }
    });
    return res;
};
const KeywordInfoCard: React.FC<{
    keyword: string;
}> = ({ keyword }) => {
    return (
        <>
            <Row>
                <Col span={20} offset={2}>
                    <Card
                        style={{
                            margin: '10px',
                        }}
                    >
                        <div>
                            <b>{keyword}</b>：{Keywords.get(keyword)}
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export { Info };
