function solution(n) {
  var src = [4, 1, 2];

  var result = "";
  while (n) {
    result = src[n % 3] + result;
    n = Math.floor((n - 1) / 3);
  }
  return result;
}
