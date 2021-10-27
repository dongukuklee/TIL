function solution(s) {
  let sArr = s.split(" ").map((el) => {
    return el
      .split("")
      .map((ele, idx) => {
        return idx % 2 === 0 ? ele.toUpperCase() : ele.toLowerCase();
      })
      .join("");
  });

  return sArr.join(" ");
}
