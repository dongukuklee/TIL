function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function _map(list, mapper) {
  let new_list = [];
  _each(list, function (val) {
    new_list.push(mapper(val));
  });

  return new_list;
}

function a() {
  console.log(
    _map(arguments, function (val) {
      return val ** 2;
    })
  );
}

a(1, 2, 3);
