/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    let pA = headA;
    let pB = headB;
    let count = 2;

    while(pA !== pB && count > 0) {
        if (pA.next) {
            pA = pA.next;
        } else {
            count--;
             pA = headB;
        }
        if (pB.next) {
            pB = pB.next;
        } else {
             pB = headA;
        }
    }
    if (count) {
        return pA;
    }
    return null;
};