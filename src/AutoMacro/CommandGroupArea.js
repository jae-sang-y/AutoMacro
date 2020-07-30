import React from 'react';
import { Component } from 'react';
import { Card } from 'react-bootstrap';
import CommandBlock from './CommandBlock';
import { BsBraces } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { TiDeleteOutline } from 'react-icons/ti';

class Group extends Component {
  onDragOver(e) {
    let alien_data = this.props.getDragData();
    if (alien_data.type === 'add_command_block') {
      e.preventDefault();
      const isExist = this.props.group.command_blocks.find(
        (command_block) => command_block.uuid === alien_data.command.uuid
      );
      if (!isExist) {
        let group = this.props.getGroup(this.props.name);
        group.command_blocks.push(alien_data.command);
        this.props.setGroup(this.props.name, group);
        this.props.setDragData({
          type: 'move_command_block',
          command: alien_data.command,
          group_name: this.props.name,
        });
      }
    } else if (alien_data.type === 'move_command_block') {
      if (alien_data.group_name === this.props.name) return;
      let alien_group = this.props.getGroup(alien_data.group_name);
      let group = this.props.getGroup(this.props.name);
      alien_group.command_blocks = alien_group.command_blocks.filter(
        (command_block) => command_block.uuid !== alien_data.command.uuid
      );
      group.command_blocks.splice(0, 0, alien_data.command);
      this.props.setGroup(this.props.name, group);
      this.props.setGroup(alien_data.group_name, alien_group);
      this.props.setDragData({
        type: 'move_command_block',
        command: alien_data.command,
        group_name: this.props.name,
      });
    }
  }

  render() {
    return (
      <Card
        className='p-2 mb-2 py-4'
        border={this.props.focused ? 'primary' : 'secondary'}
        text={this.props.focused ? 'primary' : 'dark'}
        onClick={this.props.onClick}
        droppable='true'
        onDragOver={this.onDragOver.bind(this)}
      >
        <h5 className='d-flex align-items-center'>
          <BsBraces />
          {`그룹 ${this.props.name}`}
          <TiDeleteOutline
            style={{ cursor: 'pointer' }}
            className='ml-auto'
            onClick={this.props.deleteSelf}
          />
        </h5>
        {this.props.group.command_blocks.map((command_block, index) => (
          <CommandBlock
            key={command_block.uuid}
            data={command_block}
            index={index + 1}
            group_name={this.props.name}
            getGroup={this.props.getGroup}
            setGroup={this.props.setGroup}
            getDragData={this.props.getDragData}
            setDragData={this.props.setDragData}
            modCommand={this.props.modCommand}
          />
        ))}
      </Card>
    );
  }
}

class CommandGroupArea extends Component {
  render() {
    return (
      <div style={{ minWidth: '25em' }}>
        {Object.entries(this.props.groups).map((entry) => (
          <Group
            className='card p-2 mb-2'
            key={entry[0]}
            name={entry[0]}
            group={entry[1]}
            getGroup={this.props.getGroup}
            setGroup={this.props.setGroup}
            getDragData={this.props.getDragData}
            setDragData={this.props.setDragData}
            deleteSelf={() => this.props.deleteGroup(entry[0])}
            modCommand={this.props.modCommand}
          />
        ))}

        {this.props.getDragData().type === 'add_command_block' ||
        this.props.getDragData().type === 'move_command_block' ? (
          <Card
            className='border d-flex align-items-center py-2'
            droppable='true'
            onDragOver={(e) => {
              let alien_data = this.props.getDragData();
              if (alien_data.type === 'move_command_block') {
                e.preventDefault();
              }
              if (alien_data.type === 'add_command_block') e.preventDefault();
            }}
            onDrop={(e) => {
              let alien_data = this.props.getDragData();
              if (alien_data.type === 'move_command_block') {
                e.preventDefault();
                let alien_group = this.props.getGroup(alien_data.group_name);
                alien_group.command_blocks = alien_group.command_blocks.filter(
                  (command_block) =>
                    command_block.uuid !== alien_data.command.uuid
                );
                this.props.setGroup(alien_data.group_name, alien_group);
                this.props.setDragData({});
              } else if (alien_data.type === 'add_command_block') {
                e.preventDefault();
                this.props.setDragData({});
              }
            }}
          >
            <AiFillDelete />
          </Card>
        ) : (
          <Card
            className='border d-flex align-items-center py-2'
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              let new_group_name = '새 그룹';
              if (this.props.checkGroup(new_group_name)) {
                let k = 1;
                while (true) {
                  new_group_name = `새 그룹(${k})`;
                  if (!this.props.checkGroup(new_group_name)) {
                    break;
                  }
                  ++k;
                }
              }
              this.props.setGroup(new_group_name, { command_blocks: [] });
            }}
          >
            <GrAdd />
          </Card>
        )}
      </div>
    );
  }
}

export default CommandGroupArea;
