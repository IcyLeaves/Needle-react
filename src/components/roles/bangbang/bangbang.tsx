import Role, { RolesType } from '../../../models/role';
import { SpotVisible } from '../../../models/spot';
import { Wasted } from '../../buffs/bangbang';
import { GameState, GameStatus } from '../../public/game';

const BangBang = (): Role => {
    return {
        id: 'bangbang',
        name: 'Bang-Bang',
        description: '你的后三次调查变为三次暗杀',
        color: '#f48fb1',
        type: RolesType.DARK,
        onRevealed: (gameState: GameState, x: number, y: number): GameState => {
            gameState.status = GameStatus.SHOOTING;
            gameState.spots[x][y].attrs?.set(BangBang().id, 3);
            return gameState;
        },
        onActivating: (
            gameState: GameState,
            x: number,
            y: number,
            shootx: number,
            shooty: number,
        ): GameState => {
            let currBox = gameState.spots[x][y];
            if (!currBox.attrs.get(BangBang().id)) return gameState;
            currBox.attrs.set(
                BangBang().id,
                currBox.attrs.get(BangBang().id)! - 1,
            );
            if (currBox.attrs.get(BangBang().id)! == 0) {
                gameState.spots[x][y].attrs?.delete(BangBang().id);
                gameState.status = GameStatus.REVEALING;
            }
            gameState.spots[shootx][shooty].visible = SpotVisible.REVEALED;
            gameState.spots[shootx][shooty].buffs?.set(Wasted().id, Wasted());

            return gameState;
        },
    };
};

export default BangBang;
