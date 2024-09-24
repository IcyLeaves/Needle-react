import { nearEight } from '@/utils/graph';
import Role, { RolesType } from '../../../models/role';
import { SpotBoxState } from '../../../models/spot';
import { GameState } from '../../public/game';
const Sheriff = (): Role => {
    return {
        id: 'sheriff',
        name: '警长',
        description: '周围角色全部现身后，将现在的🔍翻倍。然后🔍+2',
        color: '#5d4037',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState, x: number, y: number) => {
            var init = 8;
            var nears = nearEight(gameState.spots, x, y);
            for (var near of nears) {
                if (!near || near.visible == 'REVEALED') init--;
            }
            if (init == 0) {
                gameState.chances = gameState.chances * 2 + 2;
            } else {
                if (!gameState.spots[x][y].attrs) {
                    gameState.spots[x][y].attrs = new Map();
                }
                gameState.spots[x][y].attrs!.set('sheriffRemain', init);
            }

            return gameState;
        },
        onActivating: (
            gameState: GameState,
            x: number,
            y: number,
            revealing: SpotBoxState,
        ) => {
            if (gameState.spots[x][y].role.id != 'sheriff') return gameState;
            let sheriff = gameState.spots[x][y];
            if (!sheriff.attrs) return gameState;
            let old = sheriff.attrs.get('sheriffRemain');
            sheriff.attrs.set('sheriffRemain', old - 1);
            if (sheriff.attrs.get('sheriffRemain') == 0) {
                gameState.chances = gameState.chances * 2 + 2;
                sheriff.attrs.delete('sheriffRemain');
            }
            return gameState;
        },
    };
};
export default Sheriff;
// async function sheriffOnClick(e, context, i, j) {
//     var init = 8;
//     var nears = await COMMON.nearEight(context.boxArray, i, j);
//     for (var near of nears) {
//       if (!near || near.shown) init--;
//     }
//     context.boxArray[i][j].sheriffRemain = init;
//     if (init == 0) await context.animateChances(context.chances + 2);
//   }
//   async function sheriffCheck(context, curr) {
//     var nears = await COMMON.nearEight(context.boxArray, curr.i, curr.j);
//     for (var near of nears) {
//       if (!near) continue;
//       if (near.roleid > 0 || (near.roleid == 0 && context.copiesTeam.length > 0))
//         near.sheriffRemain--;
//       if (near.sheriffRemain == 0 && near.shown == true)
//         await context.animateChances(context.chances + 2);
//     }
//   }
