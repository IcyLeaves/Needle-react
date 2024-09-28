import Role, { RolesType } from '../../../models/role';
import Deck from '../../../utils/draw';
import { MOON, SUN } from '../../buffs/augur';
import { GameState } from '../../public/game';

const Augur = (): Role => {
    return {
        id: 'augur',
        name: '占卜师',
        description: '现身时，随机占卜一个2x2的区域，得知每个人的势力',
        color: '#303f9f',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState): GameState => {
            let M = gameState.spots.length;
            let N = gameState.spots[0].length;
            let pointers = [];
            for (let i = 0; i < M - 1; i++) {
                for (let j = 0; j < N - 1; j++) {
                    pointers.push({ x: i, y: j });
                }
            }
            let deck = new Deck<{ x: number; y: number }>(
                pointers,
                gameState.seed,
            );
            let pointer = deck.draw();
            while (pointer) {
                let p1 = gameState.spots[pointer.x][pointer.y];
                let p2 = gameState.spots[pointer.x + 1][pointer.y];
                let p3 = gameState.spots[pointer.x][pointer.y + 1];
                let p4 = gameState.spots[pointer.x + 1][pointer.y + 1];
                let arr = [p1, p2, p3, p4];
                let redraw = false;
                for (let i = 0; i < arr.length; i++) {
                    if (
                        arr[i].buffs.get(SUN().id) ||
                        arr[i].buffs.get(MOON().id)
                    ) {
                        pointer = deck.draw();
                        redraw = true;
                        break;
                    }
                }
                if (redraw) {
                    continue;
                }
                for (let i = 0; i < arr.length; i++) {
                    switch (arr[i].role.type) {
                        case RolesType.LIGHT:
                            arr[i].buffs.set(SUN().id, SUN());
                            break;
                        case RolesType.DARK:
                            arr[i].buffs.set(MOON().id, MOON());
                            break;
                    }
                }
                return gameState;
            }
            return gameState;
        },
    };
};
export default Augur;
