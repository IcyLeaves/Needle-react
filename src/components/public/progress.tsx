import { Col, Flex, Progress, Row } from 'antd';
import str2role from '../roles/roles';
import { BoardConfig } from './board';
import { RoleLabel } from './role';
const Note: React.FC = () => {
    return (
        <Flex gap="small" vertical>
            <Row>
                <Col span={6}>目标</Col>
                <Col span={18}>
                    <Progress />
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

const FoundProgress: React.FC<{ config: BoardConfig }> = props => {
    const { config } = props;
    let res = <></>;
    for (var key in config.roleMap) {
        let value = config.roleMap[key];
        res = (
            <>
                {res}
                <Row
                    style={{
                        paddingLeft: '15px',
                        paddingRight: '15px',
                    }}
                >
                    <Col span={6}>
                        <RoleLabel role={str2role(key)} />
                    </Col>
                    <Col span={18}>
                        <Progress
                            strokeColor={str2role(key).color}
                            format={percent => `0 / ${value}`}
                            percent={0}
                            key={'found-progress' + key}
                        >
                            ${value}
                        </Progress>
                    </Col>
                </Row>
            </>
        );
    }
    return <>{res}</>;
};

export default FoundProgress;
