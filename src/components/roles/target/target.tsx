import { GameState } from '../../public/game';
import Role, { RolesType } from '../../../models/role';

const Target = (): Role => {
    return {
        id: 'target',
        name: '目标',
        description: '这就是你要找的人',
        color: '#66bb6a',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState) => {
            gameState.chances = 999;
            gameState.isGameOver = true;
            return gameState;
        },
    };
};
export default Target;
