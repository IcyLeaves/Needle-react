import Role, { RolesType } from '../../../models/role';
import { SpotBoxState } from '../../../models/spot';
import Cursing from '../../buffs/witch';
import { GameState } from '../../public/game';

const Witch = (): Role => {
    return {
        id: 'witch',
        name: '女巫',
        description: '现身后，后两次调查如果使得一名邪恶势力现身，🔍变为1',
        color: '#CE93D8',
        type: RolesType.DARK,
        onRevealed: (gameState: GameState, x, y: number) => {
            // 现身后，给当前角色加一个buff,
            let cursing = Cursing();
            cursing.idx = 0;
            gameState.spots[x][y].buffs.set(cursing.id, cursing);
            return gameState;
        },
        onActivating: (
            gameState: GameState,
            x: number,
            y: number,
            revealing: SpotBoxState,
        ): GameState => {
            // 1. 没有揭示，不能激活
            // 2. 揭示了但没有Buff，不能激活
            let cursing = Cursing();
            let currBox = gameState.spots[x][y];
            if (currBox.visible != 'REVEALED') return gameState;
            if (!currBox.buffs.has(cursing.id)) return gameState;
            // 3. 揭示了且有Buff，可以激活
            if (revealing.role.type == RolesType.DARK) {
                gameState.chances = 1;
            }
            // 3.1 如果激活了，idx加1
            currBox.buffs.get(cursing.id)!.idx =
                currBox.buffs.get(cursing.id)!.idx! + 1;
            if (currBox.buffs.get(cursing.id)!.idx! >= 2) {
                // 3.2 如果idx大于等于2，删除
                currBox.buffs.delete(cursing.id);
            }
            return gameState;
        },
    };
};
export default Witch;
