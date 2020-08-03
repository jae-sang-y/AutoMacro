import React, { Component } from 'react';
import {
  CommandGroupArea,
  CommandPushButtonsArea,
  ControlArea,
  RunCommand,
} from './AutoMacro';
import { Card } from 'react-bootstrap';
import './App.css';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      run: {},
      drag_data: {},
      editable: true,
      emergency_stop: false,
      mouse_pos: {
        x: -1,
        y: -1,
      },
      groups: {},
    };
    this.closing = false;
  }

  getDragData = () => this.state.drag_data;
  setDragData = (data) => this.setState({ drag_data: data });

  newGroup = (new_group_name = undefined) => {
    const newGroupName = () => {
      let new_group_name = '새 그룹';
      if (this.checkGroup(new_group_name)) {
        let k = 1;
        while (true) {
          new_group_name = `새 그룹(${k})`;
          if (!this.checkGroup(new_group_name)) {
            break;
          }
          ++k;
        }
      }
      return new_group_name;
    };
    if (new_group_name === undefined) new_group_name = newGroupName();
    this.setGroup(new_group_name, {
      command_blocks: [],
      edit_name: false,
    });
  };

  getGroup = (group_name) => {
    return this.state.groups[group_name];
  };

  setGroup = (group_name, dict) => {
    this.setState({
      groups: Object.assign(this.state.groups, {
        [group_name]: dict,
      }),
    });
  };

  modGroup = (group_name, data) => {
    this.setState({
      groups: Object.assign(this.state.groups, {
        [group_name]: Object.assign(this.state.groups[group_name], data),
      }),
    });
    console.log(this.state);
  };

  checkGroup = (group_name) => {
    return this.state.groups[group_name] !== undefined;
  };

  deleteGroup = (group_name) => {
    let groups = {};
    Object.entries(this.state.groups).forEach((entry) => {
      if (entry[0] !== group_name) groups[entry[0]] = entry[1];
    });
    this.setState({ groups: groups });
  };

  moveUpGroup = (group_name) => {
    let group = this.state.groups[group_name];
    let groups_entries = Object.entries(this.state.groups);
    const group_index = groups_entries.findIndex(
      (groups_entry) => groups_entry[0] === group_name
    );
    groups_entries = groups_entries.filter(
      (groups_entry) => groups_entry[0] !== group_name
    );
    groups_entries.splice(group_index - 1, 0, [group_name, group]);
    let groups = {};
    groups_entries.forEach(
      (groups_entry) => (groups[groups_entry[0]] = groups_entry[1])
    );
    this.setState({
      groups: groups,
    });
  };

  moveDownGroup = (group_name) => {
    let group = this.state.groups[group_name];
    let groups_entries = Object.entries(this.state.groups);
    const group_index = groups_entries.findIndex(
      (groups_entry) => groups_entry[0] === group_name
    );
    groups_entries = groups_entries.filter(
      (groups_entry) => groups_entry[0] !== group_name
    );
    groups_entries.splice(group_index + 1, 0, [group_name, group]);
    let groups = {};
    groups_entries.forEach(
      (groups_entry) => (groups[groups_entry[0]] = groups_entry[1])
    );
    this.setState({
      groups: groups,
    });
  };

  modCommand = (group_name, uuid, data) => {
    let group = this.state.groups[group_name];
    const target_index = group.command_blocks.findIndex((o) => o.uuid === uuid);
    group.command_blocks[target_index] = data;
    this.setState({
      groups: Object.assign(this.state.groups, {
        [group_name]: group,
      }),
    });
  };

  runMacro = () => {
    this.saveMacro();

    this.setState({
      editable: false,
      emergency_stop: false,
    });
    RunCommand(
      this.state.groups,
      () => !this.state.emergency_stop && !this.closing,
      (dict) => this.setState(dict)
    );
  };

  stopMacro = async () => {
    this.setState({ emergency_stop: true });
  };

  assert_success = (result, func) => {
    if (result.status === 200) {
      func(result.data);
    } else {
      console.log(result);
      alert('네트워크 오류');
    }
  };

  easy_axios = (func) => {
    return (result) => this.assert_success(result, func);
  };

  loadMacro = () => {
    this.setState({ editable: false });
    axios.get('/macro_data').then(
      this.easy_axios((data) => {
        this.setState({ editable: true, groups: data });
      })
    );
  };

  saveMacro = () => {
    this.setState({ editable: false });
    axios.post('/macro_data', this.state.groups).then(
      this.easy_axios((data) => {
        this.setState({ editable: true, groups: data });
      })
    );
  };

  filterNonPureFunction(func) {
    if (this.state.editable) return func;
    return undefined;
  }

  componentDidMount() {
    document.addEventListener('dragend', (e) => this.setDragData({}));
    this.loadMacro();
    this.io = socketIOClient();
    this.io.on('mouse_pos', (mouse_pos) => {
      this.setState({ mouse_pos: mouse_pos });
    });
  }

  componentWillUnmount() {
    this.closing = true;
  }

  render() {
    return (
      <Card className='d-flex align-items-center rounded p-3 solid'>
        <h1 className='text-center my-3'>나만의 매크로 만들기</h1>
        <div className='d-flex mb-3'>
          <CommandGroupArea
            groups={this.state.groups}
            newGroup={this.filterNonPureFunction(this.newGroup)}
            getGroup={this.getGroup}
            setGroup={this.filterNonPureFunction(this.setGroup)}
            modGroup={this.filterNonPureFunction(this.modGroup)}
            checkGroup={this.checkGroup}
            deleteGroup={this.filterNonPureFunction(this.deleteGroup)}
            moveUpGroup={this.filterNonPureFunction(this.moveUpGroup)}
            moveDownGroup={this.filterNonPureFunction(this.moveDownGroup)}
            modCommand={this.filterNonPureFunction(this.modCommand)}
            getDragData={this.getDragData}
            setDragData={this.filterNonPureFunction(this.setDragData)}
            editable={this.state.editable}
            focused_group={this.state.run.group}
            focused_line={this.state.run.line}
          />
          <div className='ml-3'>
            <ControlArea
              runMacro={this.runMacro}
              stopMacro={this.stopMacro}
              saveMacro={this.saveMacro}
              editable={this.state.editable}
              mousePosition={this.state.mouse_pos}
            />
            <CommandPushButtonsArea
              setDragData={this.setDragData}
              editable={this.state.editable}
            />
          </div>
        </div>
      </Card>
    );
  }
}
