import Role from '../../../models/role';
import { GameState } from '../../public/game';

const Target: Role = {
    id: 'target',
    name: '目标',
    description: '这就是你要找的人',
    color: '#66bb6a',
    onRevealed: (gameState: GameState) => {
        gameState.chances = 999;
        gameState.isGameOver = true;
        return gameState;
    },
};
export default Target;
