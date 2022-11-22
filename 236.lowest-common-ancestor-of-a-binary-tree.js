/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 var lowestCommonAncestor = function(root, p, q) {
    // 深度度优先遍历

    const track = (node) => {
        if (node === p || node === null || node === q) {
            return node;
        }
        const leftTrack = track(node.left);
        const rightTrack = track(node.right);
        if (leftTrack && rightTrack) {
            return node;
        } else {
            return leftTrack || rightTrack;
        }
    };
    return track(root);
};