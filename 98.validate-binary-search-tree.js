/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    //  row 代表上面的行数，col 代表本列的树木
    // index = Math.pow(2, row) - 1 + col - 1
    // nextLeft = Math.pow(2, row + 1) - 1 + (col - 1) * 2
    // 插入顶点
    const queue = [{ row: 0, col: 1 }];
    const rootLength = root.length;
    while(queue.length) {
        const node = queue.shift();
        const index =  Math.pow(2, node.row) - 1 + node.col - 1;
        const leftIndex = Math.pow(2, node.row + 1) - 1 + (node.col - 1) * 2
        const rightIndex = leftIndex + 1;
        const val = index < rootLength ? root[index] : 0;
        let leftValue = null;
        let rightValue = null;
        if (leftIndex < rootLength) {
            leftValue = root[leftIndex];
        }
        if (rightIndex < rootLength) {
            rightValue = root[rightIndex];
        }
        if (leftValue !== null && leftValue >= val) {
            console.log(false);
            return false;
        } else if (leftValue !== null) {
            queue.push({ row: node.row + 1, col: (node.col - 1) * 2 + 1 });
        }
        if (rightValue !== null && rightValue <= val) {
            console.log(false);
            return false;
        } else if (rightValue !== null) {
            queue.push({ row: node.row + 1, col: node.col * 2 });
        }
    }
    console.log(true);
    return true;
};
// isValidBST([5,1,4,null,null,3,6]);
// @lc code=end

