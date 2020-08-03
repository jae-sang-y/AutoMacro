import { CommandTypes } from './Definitions.js';
import axios from 'axios';

const RunCommand = async (groups, keep_going, setState) => {
  let program_counter = {
    group: 'main',
    line: 0,
    run: true,
  };

  const assert_ok = (result) => {
    if (result.status === 200) return result.data;
    else {
      program_counter.run = false;
      console.log(result);
      alert('네트워크 오류!');
    }
  };

  const runCommand = async (data) => {
    if (data.type === CommandTypes.keydown) {
      assert_ok(await axios.post('/macro/keydown', data));
      ++program_counter.line;
    } else if (data.type === CommandTypes.keyup) {
      assert_ok(await axios.post('/macro/keyup', data));
      ++program_counter.line;
    } else if (data.type === CommandTypes.mouse_click) {
      assert_ok(await axios.post('/macro/mouse_click', data));
      ++program_counter.line;
    } else if (data.type === CommandTypes.delay) {
      assert_ok(await axios.post('/macro/delay', data));
      ++program_counter.line;
    } else if (data.type === CommandTypes.mouse_move) {
      assert_ok(await axios.post('/macro/mouse_move', data));
      ++program_counter.line;
    } else {
      program_counter.run = false;
      console.log(data);
      alert('알 수 없는 명령어!');
    }
  };

  while (keep_going() && program_counter.run) {
    setState({
      run: { group: program_counter.group, line: program_counter.line },
    });
    if (groups[program_counter.group] === undefined) {
      alert(`존재하지 않는 그룹 ${program_counter.group}입니다!`);
      break;
    }
    if (
      program_counter.line >=
      groups[program_counter.group].command_blocks.length
    ) {
      //alert(
      //  `존재하지 않는 커맨드 ${program_counter.group}:${program_counter.line}입니다!`
      //);
      --program_counter.line;
      break;
    }
    await runCommand(
      groups[program_counter.group].command_blocks[program_counter.line]
    );
    setState({ run: program_counter });
  }
  setState({ editable: true, run: {} });
};

export default RunCommand;
