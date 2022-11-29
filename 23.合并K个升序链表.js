/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
    let header = null;
    let currentNode = null;

    let index = 0;

    const stepNext = (node) => {
        if (node.next) {
            node = node.next;
        } else {
            endNodes++;
        }
    };

    const swap = (nodes, i, j) => {
        const temp = nodes[i];
        nodes[i] = nodes[j];
        nodes[j] = temp;
    }

    const sort = (nodes, index) => {
        for(let i = (index + 1); i < nodes.length; i++) {
            if (nodes[index]?.val > nodes[i]?.val) {
                swap(nodes, i, index);
            }
        }
    };

    sort(lists, index);

    while(index < lists.length) {
        if (!lists[index]) {
            index++;
            sort(lists, index);
            continue;
        }
        if (!header) {
            header = new ListNode(lists[index].val);
            currentNode = header;
        } else {
            currentNode.next = new ListNode(lists[index].val);
            currentNode = currentNode.next;
        }
        if (lists[index].next) {
            lists[index] = lists[index].next;
        } else {
            index++;
        }
        sort(lists, index);
    }
    return header;
};