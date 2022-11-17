/**
 * @param {character[][]} grid
 * @return {number}
 */

var numIslands = function(grid) {
    const extendLand = (arr, i, j) => {
        arr[i][j] = '0';
        const positions = [[i-1, j], [i, j-1],[i+1, j],[i, j+1]];
        positions.forEach(item => {
            const [ni, nj] = item;
            if (arr?.[ni]?.[nj] === '1') {
                extendLand(arr, ni, nj);
            } 
        });
    };
    let result = 0;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '1') {
                extendLand(grid, i, j);
                result++;
            }
        }
    }
    return result;
};

const grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ];

console.log(numIslands(grid));

