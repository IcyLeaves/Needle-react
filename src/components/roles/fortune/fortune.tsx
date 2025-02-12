import Role, { RolesType } from '../../../models/role';
import { SpotBoxState, SpotVisible } from '../../../models/spot';
import { Deck } from '../../../utils/draw';
import { nearFour } from '../../../utils/graph';
import MoneyBag from '../../buffs/fortune';
import { GameState, GameStatus, SearchAllSpots } from '../../public/game';

const Fortune = (): Role => {
    return {
        id: 'fortune',
        name: '赏金猎人',
        description: '使一个还未现身的角色获得💰',
        color: '#e64a19',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState, x: number, y: number) => {
            let currBox = gameState.spots[x][y];
            if (gameState.status === GameStatus.EARNING) {
                //1. 把相邻的人都可见
                let nears = nearFour(
                    x,
                    y,
                    gameState.spots.length,
                    gameState.spots[0].length,
                );
                for (let near of nears) {
                    if (!near) continue;
                    if (
                        gameState.spots[near.x][near.y].visible ==
                        SpotVisible.REVEALED
                    )
                        continue;
                    gameState.spots[near.x][near.y].visible =
                        SpotVisible.VISIBLE;
                }
                gameState.status = GameStatus.REVEALING;
            }
            // 钱袋子
            if (currBox.buffs.has(MoneyBag().id)) {
                gameState.status = GameStatus.EARNING;
            }
            // 赏金猎人
            if (currBox.role.id == Fortune().id) {
                // 1. 找出 hidden 的所有 spot
                let hiddens: SpotBoxState[] = SearchAllSpots(
                    gameState,
                    spot => {
                        return spot.visible != SpotVisible.REVEALED;
                    },
                );
                // 2. 随机选一个
                let deck = new Deck<SpotBoxState>(
                    hiddens,
                    gameState.seed.seed,
                    gameState.seed.random,
                );
                let chosen = deck.draw();
                while (
                    !chosen ||
                    (chosen.buffs.has(MoneyBag().id) && deck.count() > 0)
                ) {
                    chosen = deck.draw();
                }
                // 3. let him acquire money bag
                chosen.buffs.set(MoneyBag().id, MoneyBag());
                chosen.buffs.get(MoneyBag().id)!.idx = 0;
            }

            return gameState;
        },
    };
};

export default Fortune;
