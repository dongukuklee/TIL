function solution(lottos, win_nums) {
  let zeroNum = 0;
  let hitNum = 0;
  let topRank;
  let lowestRank;

  const mappingLottos = lottos.filter((el) => {
    return el !== 0;
  });

  zeroNum = 6 - mappingLottos.length;

  mappingLottos.forEach((el) => {
    if (win_nums.indexOf(el) !== -1) {
      hitNum++;
    }
  });

  topRank = rankinCheck(hitNum + zeroNum);
  lowestRank = rankinCheck(hitNum);
  return [topRank, lowestRank];
  //민우가 작성한 로또 번호 중 0 번을 제외한다.
  //0이 제외된 민우의 번호 중 당첨 번호를 체크한다.
  //당첨될 때마다 hitNum 을 1 증가시킨다.
  // zeroNum +hitNum 이 최고 순위
  // hitNum 이 최저 순위이다.
  // return []
}

const rankinCheck = (hitNum) => {
  let rank;
  switch (hitNum) {
    case 6:
      rank = 1;
      break;
    case 5:
      rank = 2;
      break;
    case 4:
      rank = 3;
      break;
    case 3:
      rank = 4;
      break;
    case 2:
      rank = 5;
      break;
    default:
      rank = 6;
  }
  return rank;
};
