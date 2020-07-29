export const command_types = {
  add_global_var: 0,
  image_search: 3,
  keydown: 4,
  keyup: 5,
  mouse_click: 6,
  sound_alarm: 8,
  goto_group: 8,
  delay: 10
};

export const command_push = {
  '전역 변수 추가': {
    enable: false,
    type: command_types.add_global_var
  },
  '이미지 서치 추가': {
    enable: false,
    type: command_types.image_search
  },
  '키다운 추가': {
    enable: true,
    type: command_types.keydown
  },
  '키 업 추가': {
    enable: true,
    type: command_types.keyup
  },
  '마우스 클릭': {
    enable: true,
    type: command_types.mouse_click
  },
  '사운드 알람': {
    enable: false,
    type: command_types.sound_alarm
  },
  '그룹 전환': {
    enable: false,
    type: command_types.goto_group
  },
  '시간 지연': {
    enable: true,
    type: command_types.delay
  }
};

export const able_key_list = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  e: 'E',
  f: 'F',
  g: 'G',
  h: 'H',
  i: 'I',
  j: 'J',
  k: 'K',
  l: 'L',
  m: 'M',
  n: 'N',
  o: 'O',
  p: 'P',
  q: 'Q',
  r: 'R',
  s: 'S',
  t: 'T',
  u: 'U',
  v: 'V',
  w: 'W',
  x: 'X',
  y: 'Y',
  z: 'Z'
};

export const able_mouse_button_list = {
  왼쪽: 'left',
  가운데쪽: 'middle',
  오른쪽: 'right'
};

export const SelectAbleKey = function (default_key = null) {
  let select = $('<select class="form-control" />');
  for (const key in able_key_list) {
    option = $('<option></option>').attr({
      value: key
    }).text(able_key_list[key]);
    if (default_key === key) option.attr('selected', '');
    select.append(option);
  }
  return select;
};

export const SelectAbleMouseButton = function (default_button = null) {
  let select = $('<select class="form-control"/>');
  for (const key in able_mouse_button_list) {
    option = $('<option></option>').attr({
      value: key
    }).text(able_mouse_button_list[key]);
    if (default_button === key) option.attr('selected', '');
    select.append(option);
  }
  return select;
};