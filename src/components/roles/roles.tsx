import Augur from './augur/augur';
import BangBang from './bangbang/bangbang';
import Citizen from './citizen/citizen';
import Copies from './copies/copies';
import Detective from './detective/detective';
import Fortune from './fortune/fortune';
import Ganster from './ganster/ganster';
import Jam from './jam/jam';
import Killer from './killer/killer';
import Reporter from './reporter/reporter';
import Sheriff from './sheriff/sheriff';
import Target from './target/target';
import Volunteer from './volunteer/volunteer';
import Witch from './witch/witch';

const ROLES_MAP = {
    [Augur.id]: Augur,
    [BangBang.id]: BangBang,
    [Citizen.id]: Citizen,
    [Detective.id]: Detective,
    [Fortune.id]: Fortune,
    [Ganster.id]: Ganster,
    [Jam.id]: Jam,
    [Killer.id]: Killer,
    [Reporter.id]: Reporter,
    [Sheriff.id]: Sheriff,
    [Target.id]: Target,
    [Volunteer.id]: Volunteer,
    [Witch.id]: Witch,
    [Copies.id]: Copies,
};

const str2role = (str: string) => {
    return ROLES_MAP[str];
};

export default str2role;
