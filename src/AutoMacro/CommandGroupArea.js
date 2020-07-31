import React from 'react';
import { Component } from 'react';
import { Card } from 'react-bootstrap';
import CommandBlock from './CommandBlock';
import { BsBraces } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { TiDeleteOutline } from 'react-icons/ti';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';

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
        className='p-2 mb-2 py-4 d-flex flex-column'
        border={this.props.focused ? 'primary' : 'secondary'}
        text={this.props.focused ? 'primary' : 'dark'}
        droppable={this.props.editable.toString()}
        onDragOver={
          this.props.editable ? this.onDragOver.bind(this) : undefined
        }
      >
        <div className='d-flex flex-row align-items-center flex-fill'>
          <div className='d-flex flex-column align-items-center'>
            <GoTriangleUp
              style={{
                cursor: this.props.editable ? 'pointer' : 'not-allowed',
              }}
              visibility={
                this.props.ableToGoUp && this.props.editable
                  ? 'visible'
                  : 'hidden'
              }
              onClick={() => this.props.moveUpGroup(this.props.name)}
            />
            <BsBraces style={{ width: '2em', height: '2em' }} />
            <GoTriangleDown
              style={{
                cursor: this.props.editable ? 'pointer' : 'not-allowed',
              }}
              visibility={
                this.props.ableToGoDown && this.props.editable
                  ? 'visible'
                  : 'hidden'
              }
              onClick={() => this.props.moveDownGroup(this.props.name)}
            />
          </div>
          <h5
            className='d-flex align-items-center flex-fill ml-2'
            onClick={
              this.props.group.edit_name
                ? () => {}
                : () => this.props.modSelf({ edit_name: true })
            }
          >
            {this.props.group.edit_name ? (
              <div>
                {`그룹 `}
                <input
                  defaultValue={`${this.props.name}`}
                  onBlur={(e) => {
                    if (this.props.name !== e.target.value) {
                      this.props.modSelf({ edit_name: false });
                      this.props.setGroup(e.target.value, this.props.group);
                      this.props.deleteSelf();
                    }
                  }}
                  className='border-none'
                  autoFocus
                />
              </div>
            ) : (
              `그룹 ${this.props.name}`
            )}
          </h5>
          {this.props.editable ? (
            <TiDeleteOutline
              style={{
                cursor: this.props.editable ? 'pointer' : 'not-allowed',
              }}
              className='ml-auto'
              onClick={this.props.deleteSelf}
            />
          ) : undefined}
        </div>
        <div className={'d-flex flex-column'}>
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
              editable={this.props.editable}
            />
          ))}
        </div>
      </Card>
    );
  }
}

class CommandGroupArea extends Component {
  render() {
    const groups_count = Object.entries(this.props.groups).length;
    return (
      <div style={{ minWidth: '25em' }}>
        {Object.entries(this.props.groups).map((entry, index) => (
          <Group
            className='card p-2 mb-2'
            key={entry[0]}
            name={entry[0]}
            group={entry[1]}
            index={index}
            getGroup={this.props.getGroup}
            setGroup={this.props.setGroup}
            getDragData={this.props.getDragData}
            setDragData={this.props.setDragData}
            moveUpGroup={this.props.moveUpGroup}
            moveDownGroup={this.props.moveDownGroup}
            modSelf={(data) => this.props.modGroup(entry[0], data)}
            deleteSelf={() => this.props.deleteGroup(entry[0])}
            modCommand={this.props.modCommand}
            ableToGoUp={index > 0}
            ableToGoDown={index < groups_count - 1}
            editable={this.props.editable}
          />
        ))}

        {this.props.editable ? (
          this.props.getDragData().type === 'add_command_block' ||
          this.props.getDragData().type === 'move_command_block' ? (
            <Card
              className='border d-flex align-items-center py-2'
              droppable={this.props.editable.toString()}
              onDragOver={
                this.props.editable
                  ? (e) => {
                      let alien_data = this.props.getDragData();
                      if (alien_data.type === 'move_command_block') {
                        e.preventDefault();
                      }
                      if (alien_data.type === 'add_command_block')
                        e.preventDefault();
                    }
                  : undefined
              }
              onDrop={
                this.props.editable
                  ? (e) => {
                      let alien_data = this.props.getDragData();
                      if (alien_data.type === 'move_command_block') {
                        e.preventDefault();
                        let alien_group = this.props.getGroup(
                          alien_data.group_name
                        );
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
                    }
                  : undefined
              }
            >
              <AiFillDelete />
            </Card>
          ) : (
            <Card
              className='border d-flex align-items-center py-2'
              style={{
                cursor: this.props.editable ? 'pointer' : 'not-allowed',
              }}
              onClick={
                this.props.editable ? () => this.props.newGroup() : undefined
              }
            >
              <GrAdd />
            </Card>
          )
        ) : undefined}
      </div>
    );
  }
}

export default CommandGroupArea;
