import Role from '../../../models/role';
import { GameState } from '../../public/game';

const Detective: Role = {
    id: 'detective',
    name: '侦探',
    description: '🔍 + 2',
    color: '#512da8',
    onRevealed: (gameState: GameState) => {
        gameState.chances = gameState.chances + 2;
        return gameState;
    },
};

export default Detective;
