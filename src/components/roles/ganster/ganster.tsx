import Role, { RolesType } from '../../../models/role';
import { Deck } from '../../../utils/draw';
import { Point, nearEight, nearFour } from '../../../utils/graph';
import { Bro, Stop } from '../../buffs/ganster';
import { GameState } from '../../public/game';

const Ganster = (): Role => {
    return {
        id: 'ganster',
        name: '黑帮老大',
        description: '在原地生成一个会不断走动的🦹‍♂️',
        color: '#bcaaa4',
        type: RolesType.DARK,
        onRevealed: (gameState: GameState, x: number, y: number): GameState => {
            let currBox = gameState.spots[x][y];
            currBox.attrs?.set('next', gameState.clicks);
            return gameState;
        },
        onActivating: (
            gameState: GameState,
            x: number,
            y: number,
        ): GameState => {
            let currBox = gameState.spots[x][y];
            if (!currBox.buffs.get(Bro().id)) return gameState;
            let neighbors = nearFour(
                x,
                y,
                gameState.spots.length,
                gameState.spots[0].length,
            );
            let deck = new Deck<Point | undefined>(
                neighbors,
                gameState.seed.seed,
                gameState.seed.random,
            );
            let next = deck.draw();
            // 1. 不是已经被别的 bro 标记的地方
            let hasNext = (next: Point): boolean =>
                gameState.spots[next.x][next.y].attrs?.get('next') ===
                gameState.clicks;
            // 2. 超出边界
            // 3. 没有其他 bro
            let hasBro = (next: Point): boolean =>
                gameState.spots[next.x][next.y].buffs.has(Bro().id);
            while (
                ((next && (hasNext(next) || hasBro(next))) || !next) &&
                deck.count() > 0
            ) {
                next = deck.draw();
            }
            if (next) {
                // console.log('next', gameState.clicks, next.x, next.y);
                gameState.spots[next.x][next.y].attrs?.set(
                    'next',
                    gameState.clicks,
                );
            }
            return gameState;
        },
        onRoundOver: (gameState: GameState): GameState => {
            for (var i = 0; i < gameState.spots.length; i++) {
                for (var j = 0; j < gameState.spots[0].length; j++) {
                    gameState.spots[i][j].buffs.delete(Stop().id);
                    gameState.spots[i][j].buffs.delete(Bro().id);
                    if (
                        gameState.spots[i][j].attrs?.get('next') !==
                        gameState.clicks
                    ) {
                        gameState.spots[i][j].attrs?.delete('next');
                    }
                }
            }

            for (var i = 0; i < gameState.spots.length; i++) {
                for (var j = 0; j < gameState.spots[0].length; j++) {
                    let currBox = gameState.spots[i][j];
                    let next = currBox.attrs?.get('next');
                    if (next) {
                        gameState.spots[i][j].buffs.set(Bro().id, Bro());
                        let nears = nearEight(gameState.spots, i, j);
                        for (var near of nears) {
                            if (!near) continue;
                            gameState.spots[near.x][near.y].buffs.set(
                                Stop().id,
                                Stop(),
                            );
                        }
                        gameState.spots[i][j].attrs?.delete('next');
                    }
                }
            }
            return gameState;
        },
    };
};

export default Ganster;
