import { Col, Progress, Row } from 'antd';
import Role from '../../models/role';
import { SpotVisible } from '../../models/spot';
import Augur from '../roles/augur/augur';
import BangBang from '../roles/bangbang/bangbang';
import Citizen from '../roles/citizen/citizen';
import Copies from '../roles/copies/copies';
import Detective from '../roles/detective/detective';
import Fortune from '../roles/fortune/fortune';
import Ganster from '../roles/ganster/ganster';
import Jam from '../roles/jam/jam';
import Killer from '../roles/killer/killer';
import Reporter from '../roles/reporter/reporter';
import str2role from '../roles/roles';
import Sheriff from '../roles/sheriff/sheriff';
import Target from '../roles/target/target';
import Volunteer from '../roles/volunteer/volunteer';
import Witch from '../roles/witch/witch';
import { GameState } from './game';
import { RoleLabel } from './role';

const FoundProgress: React.FC<{ gameState: GameState }> = props => {
    const { gameState } = props;
    type RoleMap = {
        [x: string]: {
            found: number;
            total: number;
        };
    };
    let roleMap: RoleMap = {};
    for (let i = 0; i < gameState.spots.length; i++) {
        for (let j = 0; j < gameState.spots[i].length; j++) {
            let spot = gameState.spots[i][j];
            const roleId = spot.role.id;
            let isFound: number = 0;
            if (spot.visible === SpotVisible.REVEALED) {
                isFound = 1;
            }
            if (!roleMap[roleId]) {
                roleMap[roleId] = {
                    found: isFound,
                    total: 1,
                };
            } else {
                roleMap[roleId].found += isFound;
                roleMap[roleId].total += 1;
            }
        }
    }
    let res = <></>;
    //TODO fix order
    let roleMapKeysKeys = [
        Target.id,
        Citizen.id,
        Detective.id,
        Jam.id,
        Witch.id,
        Sheriff.id,
        Killer.id,
        Augur.id,
        Volunteer.id,
        Copies.id,
        Reporter.id,
        Fortune.id,
        Ganster.id,
        BangBang.id,
    ];
    for (let key of roleMapKeysKeys) {
        console.log(key);
        let value = roleMap[key];
        res = (
            <>
                {res}
                <Note
                    role={str2role(key)}
                    found={value.found}
                    total={value.total}
                />
            </>
        );
    }
    return <>{res}</>;
};

const Note: React.FC<{ role: Role; found: number; total: number }> = props => {
    const { role, found, total } = props;
    return (
        <Row
            style={{
                paddingLeft: '15px',
                paddingRight: '15px',
            }}
        >
            <Col span={6}>
                <RoleLabel role={role} />
            </Col>
            <Col span={18}>
                <Progress
                    strokeColor={role.color}
                    format={percent => `${found} / ${total}`}
                    percent={(found / total) * 100}
                    key={'found-progress' + role.id}
                ></Progress>
            </Col>
        </Row>
    );
};
export default FoundProgress;
