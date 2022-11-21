function mergeCoverage(arr) {
    // 区间合并
    const result = [];
    function addCoverage(coverages, coverage) {
        let isMerged = -1;
        let isNull = -1;
        for (let i = 0; i < coverages.length; i++) {
            if (coverages[i] === null) {
                isNull = i;
                continue;
            }
            const isInjected = (coverages[i][0] - coverage[1]) * (coverages[i][1] - coverage[0]);
            if (isInjected <= 0) {
                
                coverages[i] = [Math.min(coverage[0], coverages[i][0]), Math.max(coverage[1], coverages[i][1])];
                isMerged = i;
                break;
            }
        }
        if (isMerged > -1) {
            // 进行整备
            const nextAdd = coverages[isMerged];
            coverages[isMerged] = null;
            addCoverage(coverages, nextAdd);
        } else {
            if (isNull > -1) {
                coverages[isNull] = coverage;
            } else {
                coverages.push(coverage);
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        // 依次放入到最终结果中
        addCoverage(result, arr[i]);
    }
    return result.filter(item => Array.isArray(item)).reduce((target, curr) => target + curr[1] - curr[0], 0);
}

console.log(mergeCoverage([[2,4], [3, 7], [4,6]]));
