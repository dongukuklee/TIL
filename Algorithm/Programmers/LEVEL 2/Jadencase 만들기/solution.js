function solution(s) {
  var answer = "";
  const stringArr = s.split(" ");
  for (let i = 0; i < stringArr.length; i++) {
    const toConvertArr = stringArr[i].split("");
    const convertedArr = toConvertArr.map((el, idx) => {
      if (idx === 0 && isNaN(el)) {
        return el.toUpperCase();
      }
      if (isNaN(el)) {
        return el.toLowerCase();
      }
      return el;
    });

    stringArr[i] = convertedArr.join("");
  }

  return (answer = stringArr.join(" "));
}
