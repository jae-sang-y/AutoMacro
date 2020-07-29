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
        y: -1
      },
      groups: {
        메인: {
          command_blocks: [{
            id: Math.random(),
            type: command_types.delay,
            second: 1
          }]
        },
        서브루틴: {
          command_blocks: [{
            id: Math.random(),
            type: command_types.delay,
            second: 1
          }]
        }
      },
      focused_group_name: null
    };
  }

  render() {
    return React.createElement(
      'div',
      { className: 'd-flex align-items-center min-vh-100 rounded' },
      React.createElement(
        'h1',
        { className: 'text-center my-3' },
        '\uB098\uB9CC\uC758 \uB9E4\uD06C\uB85C \uB9CC\uB4E4\uAE30'
      ),
      React.createElement(
        'div',
        { className: 'd-flex mb-3' },
        React.createElement(CommandPushArea, { className: 'd-flex flex-column ml-3 overflow-auto' })
      )
    );
  }
}
/*

          <CommandGroupArea
            className='flex-fill card p-2 mh-100'
            state={this.state}
          />*/