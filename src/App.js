import React from 'react';
import {
  CommandGroupArea,
  CommandPushButtonsArea,
  ControlArea,
} from './AutoMacro';
import { Card } from 'react-bootstrap';
import { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      run: null,
      drag_data: {},
      editable: true,
      mouse_pos: {
        x: -1,
        y: -1,
      },
      groups: {
        메인: {
          command_blocks: [],
        },
        서브루틴: {
          command_blocks: [],
        },
      },
    };
  }

  setDragData = (data) => this.setState({ drag_data: data });

  componentDidMount() {
    document.addEventListener('dragend', (e) => this.setDragData({}));
  }

  render() {
    console.log(this.state);
    return (
      <Card className='d-flex align-items-center rounded p-3 solid'>
        <h1 className='text-center my-3'>나만의 매크로 만들기</h1>
        <div className='d-flex mb-3'>
          <CommandGroupArea
            groups={this.state.groups}
            getGroup={(group_name) => this.state.groups[group_name]}
            setGroup={(group_name, dict) =>
              this.setState({
                groups: Object.assign(this.state.groups, {
                  [group_name]: dict,
                }),
              })
            }
            checkGroup={(group_name) =>
              this.state.groups[group_name] !== undefined
            }
            deleteGroup={(group_name) => {
              let groups = {};
              Object.entries(this.state.groups).forEach((entry) => {
                if (entry[0] !== group_name) groups[entry[0]] = entry[1];
              });
              this.setState({ groups: groups });
            }}
            modCommand={(group_name, uuid, data) => {
              let group = this.state.groups[group_name];
              const target_index = group.command_blocks.findIndex(
                (o) => o.uuid === uuid
              );
              group.command_blocks[target_index] = data;
              this.setState({
                groups: Object.assign(this.state.groups, {
                  [group_name]: group,
                }),
              });
            }}
            getDragData={() => this.state.drag_data}
            setDragData={this.setDragData}
          />
          <div>
            <ControlArea />
            <CommandPushButtonsArea setDragData={this.setDragData} />
          </div>
        </div>
      </Card>
    );
  }
}
