import { Divider, Modal } from 'antd';
import { Dispatch, useState } from 'react';
import RankItems from './rank-items';
import RankMetrics from './rank-metrics';
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

export default Rank;
