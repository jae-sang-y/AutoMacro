import React from 'react';

export const CommandTypes = {
  add_global_var: 0,
  image_search: 3,
  keydown: 4,
  keyup: 5,
  mouse_click: 6,
  sound_alarm: 8,
  goto_group: 8,
  delay: 10,
};

export const AbleKeyList = {
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
  z: 'Z',
};

export const AbleButtonList = {
  왼쪽: 'left',
  가운데쪽: 'middle',
  오른쪽: 'right',
};

export const CommandPushButtons = {
  '전역 변수 추가': {
    enable: false,
    type: CommandTypes.add_global_var,
    default_value: {},
  },
  '이미지 서치 추가': {
    enable: false,
    type: CommandTypes.image_search,
    default_value: {},
  },
  '키다운 추가': {
    enable: true,
    type: CommandTypes.keydown,
    default_value: { key: Object.keys(AbleKeyList)[0] },
  },
  '키 업 추가': {
    enable: true,
    type: CommandTypes.keyup,
    default_value: { key: Object.keys(AbleKeyList)[0] },
  },
  '마우스 클릭': {
    enable: true,
    type: CommandTypes.mouse_click,
    default_value: { button: Object.keys(AbleButtonList)[0] },
  },
  '사운드 알람': {
    enable: false,
    type: CommandTypes.sound_alarm,
    default_value: {},
  },
  '그룹 전환': {
    enable: false,
    type: CommandTypes.goto_group,
    default_value: {},
  },
  '시간 지연': {
    enable: true,
    type: CommandTypes.delay,
    default_value: { second: 0 },
  },
};

export function SelectAbleKey(props) {
  return (
    <select
      className='form-control'
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      readOnly={!props.editable}
      disabled={!props.editable}
    >
      {Object.entries(AbleKeyList).map((entry) => (
        <option key={entry[0]} value={entry[0]}>
          {entry[1]}
        </option>
      ))}
    </select>
  );
}

export function SelectAbleMouseButton(props) {
  return (
    <select
      className='form-control'
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      readOnly={!props.editable}
      disabled={!props.editable}
    >
      {Object.entries(AbleButtonList).map((entry) => (
        <option key={entry[0]} value={entry[0]}>
          {entry[1]}
        </option>
      ))}
    </select>
  );
}
