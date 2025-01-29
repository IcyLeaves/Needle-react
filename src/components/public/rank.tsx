import { Col, Divider, Modal, Row } from 'antd';
import { Dispatch } from 'react';
import { ModalContentStyle, ModalTitleStyle } from '../../app/style';
import { AchivementTag } from './award';
import { GameState } from './game';
import { Statistic } from './statistic/statistic';
type RankProps = {
    isWin: boolean;
    open: boolean;
    setOpen: Dispatch<boolean>;
    gameState: GameState;
};

const Rank: React.FC<RankProps> = ({ isWin, open, setOpen, gameState }) => {
    return (
        <Modal
            title="评价"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <div style={{ ...ModalContentStyle }}>
                <div
                    style={{
                        ...ModalTitleStyle,
                        ...{
                            color: isWin ? 'green' : 'red',
                        },
                    }}
                >
                    {isWin ? '久别重逢' : '失之交臂'}
                </div>

                <RankMetrics statistic={gameState.statistic}></RankMetrics>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />

                <RankItems statistic={gameState.statistic} />
                {/* <Row type="flex" justify="center" style={{ width: '100%' }}>
                    <Col span={24} className="col-center flex-col">
                        <Button
                            v-show={gifStatus <= -1}
                            onClick={handleShareClick}
                            disabled={gifStatus === -2}
                        >
                            生成动图
                        </Button>
                        <div v-show={gifStatus === 0}>动图生成中...</div>
                        <div v-show={gifStatus === 1}>
                            动图分享：<a href={gifURL}>{gifURL}</a>
                        </div>
                    </Col>
                </Row> */}
            </div>
        </Modal>
    );
};
const RankItems: React.FC<{ statistic: Statistic }> = ({ statistic }) => {
    let achReact: JSX.Element[] = [];
    statistic.currentAchievements.forEach((val, key) => {
        if (val.completed === false) return;
        achReact.push(<AchivementTag key={key} value={val} legendClass="" />);
    });
    return (
        <Row justify="center" style={{ width: '100%', flexWrap: 'wrap' }}>
            {achReact}
        </Row>
    );
};

const RankMetrics: React.FC<{ statistic: Statistic }> = ({ statistic }) => {
    let rankReact: JSX.Element[] = [];
    statistic.currentRanks.forEach((val, key) => {
        rankReact.push(
            <Col
                span={6}
                key={key}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className="rank-item">
                    <div style={{ fontSize: 20 }}>{val.value}</div>
                    <div style={{ color: 'gray' }}>{val.title}</div>
                </div>
            </Col>,
        );
    });
    return (
        <Row justify="center" style={{ width: '100%' }}>
            {rankReact}
        </Row>
    );
};

export { RankItems, RankMetrics };
export default Rank;
