import { Col, Divider, Modal, Row, Tag, Tooltip } from 'antd';
import { Dispatch } from 'react';
type RankProps = {
    isWin: boolean;
    open: boolean;
    setOpen: Dispatch<boolean>;
};

const Rank: React.FC<RankProps> = ({ isWin, open, setOpen }) => {
    // type Item = {
    //     title: string;
    //     color: string;
    //     note: string;
    //     id: string;
    // };
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
            <div className={`modal-title ${isWin ? 'win' : 'lose'}`}>
                {isWin ? '久别重逢' : '失之交臂'}
            </div>
            <RankMetrics metrics={['0', '0', '0']}></RankMetrics>
            <RankItems
                items={[
                    {
                        title: '🔍',
                        color: 'red',
                        note: '你的🔍',
                        id: 'dee',
                    },
                ]}
            />
            <Divider />
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
        </Modal>
    );
};
const RankItems: React.FC<{ items: any[] }> = ({ items }) => {
    return (
        <Row justify="center" style={{ width: '100%', flexWrap: 'wrap' }}>
            {items.map((item, i) => (
                <div
                    key={item.id}
                    // className="award-item"
                >
                    <Tooltip title={item.note}>
                        <Tag
                            // className={setCurrAwardClass(item)}
                            color={item.color}
                            style={{ border: 'none' }}
                        >
                            {item.title}
                        </Tag>
                    </Tooltip>
                </div>
            ))}
        </Row>
    );
};

const RankMetrics: React.FC<{ metrics: string[] }> = ({ metrics }) => {
    return (
        <Row justify="center" style={{ width: '100%' }}>
            {metrics.map((val, i) => (
                <Col span={6} key={i} className="col-center flex-col">
                    <div className="modal-item-value">{val}</div>
                    <div className="modal-item-name">{metricsMap[i]}</div>
                </Col>
            ))}
        </Row>
    );
};

export { RankItems, RankMetrics };
export default Rank;
