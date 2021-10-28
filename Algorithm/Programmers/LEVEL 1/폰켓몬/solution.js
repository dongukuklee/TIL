function solution(nums) {
  let set = new Set(nums);
  let ArrayWithoutDuplicateValues = [...set];

  return ArrayWithoutDuplicateValues.length > nums.length / 2
    ? nums.length / 2
    : ArrayWithoutDuplicateValues.length;
}
