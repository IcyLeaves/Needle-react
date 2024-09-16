type Point = {
    x: number;
    y: number;
};

//get a new array, inside is up, right, down, left, if out of bound, put undefined
const nearFour = (
    x: number,
    y: number,
    M: number,
    N: number,
): (Point | undefined)[] => {
    var res = [];
    var dx = [-1, 0, 1, 0];
    var dy = [0, 1, 0, -1];
    for (var i = 0; i < 4; i++) {
        var nx = x + dx[i];
        var ny = y + dy[i];
        if (nx < 0 || nx >= M || ny < 0 || ny >= M) {
            res.push(undefined);
            continue;
        }
        res.push({ x: nx, y: ny });
    }
    return res;
};

// //获取一个新的数组，里面是上、右、下、左，如果越界就放入undefined
// //获取一个新的数组，里面是左上、上、右上、左、右、左下、下、右下，如果越界就放入undefined
// function nearEight(doubleArr, x, y) {
//     let M = doubleArr.length;
//     let N = doubleArr[0].length;
//     var res = [];
//     var d = [-1, 0, 1];
//     for (var i = 0; i < 3; i++) {
//         for (var j = 0; j < 3; j++) {
//             if (i == 1 && j == 1) continue;
//             var nx = x + d[i];
//             var ny = y + d[j];
//             if (nx < 0 || nx >= M || ny < 0 || ny >= M) {
//                 res.push(undefined);
//                 continue;
//             }
//             res.push(doubleArr[nx][ny]);
//         }
//     }
//     return res;
// }

export default nearFour;
