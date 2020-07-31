import React, { Component } from 'react';
import {
  CommandGroupArea,
  CommandPushButtonsArea,
  ControlArea,
} from './AutoMacro';
import { Card } from 'react-bootstrap';
import './App.css';
import { TiThSmall } from 'react-icons/ti';

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
      groups: {},
    };
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
    this.setState({ editable: false });
  };
  stopMacro = () => {
    this.setState({ editable: true });
  };
  saveMacro = () => {};

  filterNonPureFunction(func) {
    if (this.state.editable) return func;
    return undefined;
  }

  componentDidMount() {
    this.newGroup('main');
    this.newGroup('서브루틴');
    document.addEventListener('dragend', (e) => this.setDragData({}));
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
          />
          <div className='ml-3'>
            <ControlArea
              runMacro={this.runMacro}
              stopMacro={this.stopMacro}
              saveMacro={this.saveMacro}
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
