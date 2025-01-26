import { Col, Row } from 'antd';

type RankMetricsProps = {
    metrics: string[];
};
const metricsMap = ['完成度', '剩余线索', '调查次数'];
const RankMetrics: React.FC<RankMetricsProps> = ({ metrics }) => {
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

export default RankMetrics;
