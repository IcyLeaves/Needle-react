import Role, { RolesType } from '../../../models/role';
import { SpotBoxState } from '../../../models/spot';
import { Killed, Killing } from '../../buffs/killer';
import { GameState } from '../../public/game';
import Target from '../target/target';

const Killer = (): Role => {
    return {
        id: 'killer',
        name: '杀手',
        description: '现身后，后三次调查如果使目标现身，反而输掉游戏',
        color: '#ffe082',
        type: RolesType.DARK,
        onRevealed: (gameState: GameState, x, y: number) => {
            // 现身后，给当前角色加一个buff,
            let killing = Killing();
            killing.idx = 0;
            gameState.spots[x][y].buffs.set(killing.id, killing);
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
            let killing = Killing();
            let currBox = gameState.spots[x][y];
            if (currBox.visible != 'REVEALED') return gameState;
            if (!currBox.buffs.has(killing.id)) return gameState;
            // 3. 揭示了且有Buff，可以激活
            if (revealing.role.id == Target().id) {
                gameState.chances = 0;
                revealing.buffs.set(Killed().id, Killed());
            }
            // 3.1 如果激活了，idx加1
            currBox.buffs.set(
                killing.id,
                Killing(currBox.buffs.get(killing.id)!.idx! + 1),
            );
            if (currBox.buffs.get(killing.id)!.idx! >= 3) {
                // 3.2 如果idx大于等于3，删除
                currBox.buffs.delete(killing.id);
            }
            return gameState;
        },
    };
};

export default Killer;
