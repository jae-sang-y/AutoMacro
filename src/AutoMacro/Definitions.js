import React from 'react';

export const CommandTypes = {
  add_global_var: 0,
  image_search: 1,
  keydown: 2,
  keyup: 3,
  mouse_click: 4,
  sound_alarm: 5,
  goto_group: 6,
  delay: 7,
  mouse_move: 8,
  comment: 9,
  choice_group: 10,
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
  left: '왼쪽',
  middle: '가운데쪽',
  right: '오른쪽',
};

export const CommandPushButtons = {
  '전역 변수 추가': {
    enable: false,
    type: CommandTypes.add_global_var,
    default_value: {},
  },
  '주석 추가': {
    enable: true,
    type: CommandTypes.comment,
    default_value: { text: '' },
  },
  '이미지 서치 추가': {
    enable: true,
    type: CommandTypes.image_search,
    default_value: {
      sample: 'dummy.bmp',
      dest_group: 'main',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
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
  '마우스 이동': {
    enable: true,
    type: CommandTypes.mouse_move,
    default_value: { x: 0, y: 0, duration: 0 },
  },
  '사운드 알람': {
    enable: true,
    type: CommandTypes.sound_alarm,
    default_value: { sound: 'doorbell.mp3' },
  },
  '그룹 전환': {
    enable: true,
    type: CommandTypes.goto_group,
    default_value: { dest_group: 'main' },
  },
  '랜덤 그룹 전환': {
    enable: true,
    type: CommandTypes.choice_group,
    default_value: { dest_groups: ['main'], choice_group: 'main' },
  },
  '시간 지연': {
    enable: true,
    type: CommandTypes.delay,
    default_value: { second: 0 },
  },
};

export function SelectTemplate(props) {
  let options = undefined;
  if (props.list !== undefined) {
    options = props.list.map((e) => (
      <option key={e} value={e}>
        {e}
      </option>
    ));
  }
  if (props.dict !== undefined) {
    options = Object.entries(props.dict).map((entry) => (
      <option key={entry[0]} value={entry[0]}>
        {entry[1]}
      </option>
    ));
  }
  return (
    <select
      className={props.className}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      readOnly={!props.editable}
      disabled={!props.editable}
    >
      {options}
    </select>
  );
}
