## 游戏事件

- 不断进入点击事件，直到触发游戏结束

## 轮次事件


- 花费 1 线索
- 当前 spot 现身前：OnBeforeRevealed
- SpotBox 现身
- 当xx现身时：OnThatRevealed
    - 当特定职业现身时：OnThatRevealed(role)

## Temp

### 游戏事件

- 游戏开始时：OnGameStart
- 不断进入点击事件，直到触发游戏结束
- 游戏结束时：OnGameEnd

### 轮次事件


- 花费 1 线索
- 被调查：OnFlip
- 当xx被调查时：OnThatFlip
    - 当特定职业被调查时：OnThatFlip(role)
    - 当特定位置被调查时：OnThatFlip(x,y)
- SpotBox 现身
- 现身时：OnRevealed
- 当xx现身时：OnThatRevealed
    - 当特定职业现身时：OnThatRevealed(role)
    - 当特定位置现身时：OnThatRevealed(x,y)
- 轮次结束时：OnRoundOver
    - 检查游戏结束时：OnCheckingGameEnd