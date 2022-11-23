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
 * @return {number}
 */
 var sumNumbers = function(root) {
    let sum = 0;
    const track = (node, preValue) => {
        if (!node) {
            sum += preValue;
        }
        const nextPreValue = preValue * 10 + node.val;
        if (node.left === null && node.right === null) {
            sum += nextPreValue;
        }
        node.left !== null && track(node.left, nextPreValue);
        node.right !== null && track(node.right, nextPreValue)
    }
    track(root, 0);
    return sum;
};