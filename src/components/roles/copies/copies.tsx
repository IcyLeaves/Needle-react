import { SpotBoxState, SpotVisible, SwapSpots } from '../../../models/spot';
import { GameState } from '../../public/game';

import Role, { RolesType } from '../../../models/role';
import Target from '../target/target';
const Copies = (): Role => {
    return {
        id: 'copies',
        name: '替身',
        description:
            '目标将要现身时，会和目标交换位置并代替他现身。如果是这样，标出目标的方位',
        color: '#80cbc4',
        type: RolesType.DARK,
        onActivating: (
            gameState: GameState,
            x: number,
            y: number,
            revealing: SpotBoxState,
            currIdx: number,
            chosen: number,
        ): [GameState, number, SpotBoxState?] => {
            // 0. 你是替身
            let currBox = gameState.spots[x][y];
            if (currBox.role.id != 'copies') return [gameState, currIdx];
            // 1. revealing 是 target，如果不是的话，说明别的替身已经交换过了
            if (revealing.role.id != Target().id) return [gameState, currIdx];
            // 2. 如果替身已经 revealed，能力失效
            if (currBox.visible == SpotVisible.REVEALED)
                return [gameState, currIdx];
            // 3. 此时判断是否是需要交换的替身，是的话，交换
            if (currIdx != chosen) return [gameState, currIdx + 1];
            [currBox, revealing] = SwapSpots(currBox, revealing);
            return [gameState, currIdx + 1, revealing];
        },
    };
};

export default Copies;
