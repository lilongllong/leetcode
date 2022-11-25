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
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    // 前序遍历，+ 数组push
    const result = [];
    const track = (node, layer) => {
        if (!node) {
            return;
        }
        if (Array.isArray(result[layer])) {
            result[layer].push(node.val);
        } else {
            result[layer] = [node.val];
        }
        if (node.left) {
            track(node.left, layer + 1);
        }
        if (node.right) {
            track(node.right, layer + 1);
        }
    }
    track(root, 0);
    return result;
};