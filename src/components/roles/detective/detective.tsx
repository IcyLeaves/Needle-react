import { GameState } from '../../public/game';
import Role, { RolesType } from '../../../models/role';

const Detective = (): Role => {
    return {
        id: 'detective',
        name: '侦探',
        description: '🔍 + 2',
        color: '#512da8',
        type: RolesType.LIGHT,
        onRevealed: (gameState: GameState) => {
            gameState.chances = gameState.chances + 2;
            console.log('Detective onRevealed');
            return gameState;
        },
    };
};
export default Detective;
