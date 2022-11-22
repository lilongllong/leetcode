var longestPalindrome = function(s) {
    function getMaxStr(s, index, isTwo) {
        let i = isTwo ? index : index - 1;
        let j = index + 1;
        while(i >= 0 && j < s.length) {
            if (s[i] === s[j]) {
                i--;
                j++;
            } else {
                break;
            }
        }
        return s.slice(i + 1, j);
    }
    let maxStr = '';
    for(let i = 0; i < s.length; i++) {
        const singleMid = getMaxStr(s, i, false);
        const twoMid = getMaxStr(s, i, true);
        const res = singleMid.length > twoMid.length ? singleMid : twoMid;
        maxStr = res.length > maxStr.length ? res : maxStr;
    }
    return maxStr;
};