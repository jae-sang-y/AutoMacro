import CommandGroupArea from './CommandGroupArea.js';
import CommandPushArea from './CommandPushArea.js';
import { command_types } from './Common.js';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      run: null,
      editable: true,
      mouse_pos: {
        x: -1,
        y: -1,
      },
      groups: {
        메인: {
          command_blocks: [
            {
              id: Math.random(),
              type: command_types.delay,
              second: 1,
            },
          ],
        },
        서브루틴: {
          command_blocks: [
            {
              id: Math.random(),
              type: command_types.delay,
              second: 1,
            },
          ],
        },
      },
      focused_group_name: null,
    };
  }

  render() {
    return (
      <div className='d-flex align-items-center min-vh-100 rounded'>
        <h1 className='text-center my-3'>나만의 매크로 만들기</h1>
        <div className='d-flex mb-3'>
          <CommandPushArea className='d-flex flex-column ml-3 overflow-auto' />
        </div>
      </div>
    );
  }
}
/*

          <CommandGroupArea
            className='flex-fill card p-2 mh-100'
            state={this.state}
          />*/
