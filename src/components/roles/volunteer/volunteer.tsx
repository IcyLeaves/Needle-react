import Role, { RolesType } from '../../../models/role';
import { SpotBoxState, SpotVisible } from '../../../models/spot';
import { nearFour } from '../../../utils/graph';
import { GameState } from '../../public/game';

const Volunteer = (): Role => {
    return {
        id: 'volunteer',
        name: '志愿者',
        description: '每当使用最后一个🔍对相邻角色调查时，🔍+ 2',
        color: '#fbc02d',
        type: RolesType.LIGHT,
        onActivating: (
            gameState: GameState,
            x: number,
            y: number,
            revealing: SpotBoxState,
        ): GameState => {
            let currBox = gameState.spots[x][y];
            if (currBox.visible != SpotVisible.REVEALED) return gameState;
            if (currBox.role.id != 'volunteer') return gameState;
            var M = gameState.spots.length;
            var N = gameState.spots[0].length;
            let nears = nearFour(x, y, M, N);
            for (let near of nears) {
                // 出到边界外了
                if (!near) continue;
                // 获取相邻的spot
                if (near.x == revealing.x && near.y == revealing.y) {
                    if (gameState.chances == 1) {
                        gameState.chances = gameState.chances + 2;
                        return gameState;
                    }
                }
            }
            return gameState;
        },
    };
};
export default Volunteer;
