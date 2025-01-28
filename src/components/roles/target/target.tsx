import Role, { RolesType } from '../../../models/role';
import { GameState } from '../../public/game';

const Target = (): Role => {
    return {
        id: 'target',
        name: '目标',
        description: '这就是你要找的人',
        color: '#66bb6a',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState) => {
            gameState.isGameOver = true;
            gameState.isWin = true;
            return gameState;
        },
    };
};
export default Target;
