/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
    if (!(root instanceof TreeNode)) {
        return [];
    }
    let queue = [root];
    const result = [];
    let direction = 'left'
    
    while(queue.length) {
        if (direction === 'left') {
            const nextQueue = [];
            result.push(queue.map(item => {
                if (item.left !== null) {
                    nextQueue.push(item.left);
                }
                if (item.right !== null) {
                    nextQueue.push(item.right);
                }
                return item.val;
            }));
            direction = 'right';
            queue = nextQueue;
        } else {
            const nextQueue = [];
            const subRes = [];
            for(let i = (queue.length - 1); i >= 0; i--) {
                subRes.push(queue[i].val);
                if (queue[queue.length - i - 1].left !== null) {
                    nextQueue.push(queue[queue.length - i - 1].left);
                }
                if (queue[queue.length - i - 1].right !== null) {
                    nextQueue.push(queue[queue.length - i - 1].right);
                }
            }
            result.push(subRes);
            direction = 'left';
            queue = nextQueue;
        }
    }
    return result;
};


const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(zigzagLevelOrder(root));
