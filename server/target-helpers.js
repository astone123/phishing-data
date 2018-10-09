/* Helper functions to derive target counts from Phish data. */
const getTargetCountFromArray = (targetCounts, target) =>
  targetCounts.find(targetCount => targetCount.target == target);

const getTargetCounts = data => {
  const targetCounts = [];
  data.forEach(phish => {
    const targetCount = getTargetCountFromArray(targetCounts, phish.target);
    if (targetCount) {
      targetCount.count = targetCount.count + 1;
    } else {
      targetCounts.push({
        target: phish.target,
        count: 1
      });
    }
  });

  return targetCounts;
};

module.exports = getTargetCounts;
