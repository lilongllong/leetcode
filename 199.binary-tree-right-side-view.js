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
 * @return {number[]}
 */
 var rightSideView = function(root) {
    // 右序遍历，节点存储
    const result = [];
    const track = (node, layer) => {
        if (!node) {
            return;
        }
        if (result[layer] === undefined) {
           result[layer] = node.val;
        }
        if (node.rigth !== null) {
            track(node.right, layer + 1);
        }
        if (node.left !== null) {
            track(node.left, layer + 1);
        }
    }
    track(root, 0);
    return result;
};