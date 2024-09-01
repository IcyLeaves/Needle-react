import { SpotBoxCss } from '@/components/css/component';
import { BoldCss } from '@/components/css/style';
import { Card, Col, Row } from 'antd';

const CitizenColorCss: React.CSSProperties = {
    backgroundColor: '#898989',
};

const CitizenBox: React.FC = () => {
    return <div style={Object.assign(CitizenColorCss, SpotBoxCss)}></div>;
};
const CitizenInfo: React.FC = () => {
    return (
        <>
            <Card>
                <Row>
                    <Col span={8}>
                        <CitizenBox />
                    </Col>
                    <Col span={16}>
                        <div style={BoldCss}>市民</div>
                        <div>
                            没有任何效果没有任何效果没有任何效果没有任何效果没有任何效果
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default CitizenInfo;
