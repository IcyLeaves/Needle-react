import Role, { RolesType } from '../../../models/role';
import { nearFour } from '../../../utils/graph';
import Jammed from '../../buffs/jam';
import { GameState } from '../../public/game';

const Jam = (): Role => {
    return {
        id: 'jam',
        name: '干扰者',
        description: '现身前，相邻角色需要调查两次',
        color: '#81d4fa',
        type: RolesType.DARK,
        onBeforeRevealed: (
            gameState: GameState,
            x: number,
            y: number,
        ): void => {
            var currSpot = gameState.spots[x][y];
            var M = gameState.spots.length;
            var N = gameState.spots[0].length;
            let jammed = Jammed();
            // 检查当前spot是否有jammed
            if (currSpot.buffs.has(jammed.id)) {
                // 如果有就干掉
                currSpot.buffs.delete(jammed.id);
                return;
            }
            // 检查周围的四个点
            for (var near of nearFour(x, y, M, N)) {
                // 出到边界外了
                if (!near) continue;
                // 获取相邻的spot
                const nearSpot = gameState.spots[near.x][near.y];
                // 如果相邻的spot是jam，并且还在隐藏状态，就对当前spot进行干扰
                if (
                    nearSpot.role.id == 'jam' &&
                    nearSpot.visible != 'REVEALED'
                ) {
                    currSpot.buffs.set(jammed.id, jammed);
                }
            }
        },
    };
};
export default Jam;
