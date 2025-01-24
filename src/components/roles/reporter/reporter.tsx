import Role, { RolesType } from '../../../models/role';
import { nearEight } from '../../../utils/graph';
import { Report } from '../../buffs/reporter';
import { GameState } from '../../public/game';

const Reporter = (): Role => {
    return {
        id: 'reporter',
        name: '记者',
        description: '现身时，得知周围角色中为光明势力的人数',
        color: '#0288d1',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState, x: number, y: number) => {
            let currBox = gameState.spots[x][y];
            var nears = nearEight(gameState.spots, x, y);
            let cnt = 0;
            for (var near of nears) {
                if (near?.role.type == RolesType.LIGHT) cnt++;
            }
            let report = Report(cnt);
            currBox.buffs.set(report.id, report);
            currBox.buffs.get(report.id)!.idx = cnt;
            return gameState;
        },
    };
};
export default Reporter;
