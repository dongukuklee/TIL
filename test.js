let name = "이동욱";

const outer = () => {
  let name = "이동훅";
  console.log(name);

  const inner = () => {
    // 내부함수
    console.log(name); // ?
  };

  inner();
};
outer();
console.log(name); // ?
