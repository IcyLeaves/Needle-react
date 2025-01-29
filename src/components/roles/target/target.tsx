import Role, { RolesType } from '../../../models/role';
import { Killed } from '../../buffs/killer';
import { GameState } from '../../public/game';

const Target = (): Role => {
    return {
        id: 'target',
        name: '目标',
        description: '这就是你要找的人',
        color: '#66bb6a',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState, x: number, y: number) => {
            gameState.isGameOver = true;
            if (!gameState.spots[x][y].buffs.has(Killed().id)) {
                gameState.isWin = true;
                gameState.statistic.mIsGameWin = true;
            }
            return gameState;
        },
    };
};
export default Target;
