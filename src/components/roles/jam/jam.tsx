import Role from '../../../models/role';
import nearFour from '../../../utils/graph';
import Jammed from '../../buffs/jam';
import { GameState } from '../../public/game';
const Jam: Role = {
    id: 'jam',
    name: '干扰者',
    description: '现身前，相邻角色需要调查两次',
    color: '#81d4fa',
    onBeforeRevealed: (gameState: GameState, x: number, y: number): void => {
        var currSpot = gameState.spots[x][y];
        var M = gameState.spots.length;
        var N = gameState.spots[0].length;
        // 检查当前spot是否有jammed
        if (currSpot.buffs.has(Jammed.id)) {
            // 如果有就干掉
            currSpot.buffs.delete(Jammed.id);
            return;
        }
        // 检查周围的四个点
        for (var near of nearFour(x, y, M, N)) {
            // 出到边界外了
            if (!near) continue;
            // 获取相邻的spot
            const nearSpot = gameState.spots[near.x][near.y];
            // 如果相邻的spot是jam，并且还在隐藏状态，就对当前spot进行干扰
            if (nearSpot.role.id == 'jam' && nearSpot.visible != 'REVEALED') {
                currSpot.buffs.set(Jammed.id, Jammed);
            }
        }
    },
};

export default Jam;
