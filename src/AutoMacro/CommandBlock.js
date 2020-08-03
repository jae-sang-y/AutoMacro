import React from 'react';
import { Component } from 'react';
import { BsArrowsMove, BsFillCaretRightFill } from 'react-icons/bs';
import {
  CommandTypes,
  SelectAbleKey,
  SelectAbleMouseButton,
  AbleButtonList,
} from './Definitions';

export default class CommandBlock extends Component {
  Control = (type, data) => {
    if (type === CommandTypes.keydown) {
      return (
        <div className='d-flex'>
          <label className='text-dark mr-2'>키 다운</label>
          <SelectAbleKey
            defaultValue={this.props.data.key}
            editable={this.props.editable}
            onChange={(e) =>
              this.props.modCommand(
                this.props.group_name,
                this.props.data.uuid,
                Object.assign(this.props.data, { key: e.target.value })
              )
            }
          />
        </div>
      );
    }
    if (type === CommandTypes.keyup) {
      return (
        <div className='d-flex'>
          <label className='text-dark mr-2'>키 업</label>
          <SelectAbleKey
            defaultValue={this.props.data.key}
            editable={this.props.editable}
            onChange={(e) =>
              this.props.modCommand(
                this.props.group_name,
                this.props.data.uuid,
                Object.assign(this.props.data, { key: e.target.value })
              )
            }
          />
        </div>
      );
    }
    if (type === CommandTypes.mouse_click) {
      return (
        <div className='d-flex'>
          <label className='text-dark mr-2'>마우스 클릭</label>
          <SelectAbleMouseButton
            defaultValue={this.props.data.button}
            editable={this.props.editable}
            onChange={(e) => {
              this.props.modCommand(
                this.props.group_name,
                this.props.data.uuid,
                Object.assign(this.props.data, {
                  button: e.target.value,
                })
              );
            }}
          />
        </div>
      );
    }
    if (type === CommandTypes.delay) {
      return (
        <div className='d-flex'>
          <label className='text-dark mr-2'>시간 지연</label>
          <input
            className='form-control'
            type='number'
            step='0.001'
            placeholder='(단위: 초)'
            defaultValue={this.props.data.second}
            readOnly={!this.props.editable}
            disabled={!this.props.editable}
            draggable='false'
            onChange={(e) =>
              this.props.modCommand(
                this.props.group_name,
                this.props.data.uuid,
                Object.assign(this.props.data, { second: e.target.value })
              )
            }
          />
        </div>
      );
    }
    if (type === CommandTypes.mouse_move) {
      const input_number_css = { width: '5em' };
      return (
        <div className='flex-fill d-flex justify-content-between'>
          <label className='text-dark mr-2'>마우스 이동</label>
          <input
            className='form-control'
            style={input_number_css}
            type='number'
            step='1'
            placeholder='X'
            readOnly={!this.props.editable}
            disabled={!this.props.editable}
            defaultValue={this.props.data.x}
            draggable='false'
            onChange={(e) =>
              this.props.modCommand(
                this.props.group_name,
                this.props.data.uuid,
                Object.assign(this.props.data, { x: e.target.value })
              )
            }
          />
          <input
            className='form-control'
            style={input_number_css}
            type='number'
            step='1'
            placeholder='Y'
            readOnly={!this.props.editable}
            disabled={!this.props.editable}
            defaultValue={this.props.data.y}
            draggable='false'
            onChange={(e) =>
              this.props.modCommand(
                this.props.group_name,
                this.props.data.uuid,
                Object.assign(this.props.data, { y: e.target.value })
              )
            }
          />
          <input
            className='form-control'
            style={input_number_css}
            type='number'
            step='0.001'
            placeholder='기간'
            readOnly={!this.props.editable}
            disabled={!this.props.editable}
            defaultValue={this.props.data.duration}
            draggable='false'
            onChange={(e) =>
              this.props.modCommand(
                this.props.group_name,
                this.props.data.uuid,
                Object.assign(this.props.data, { duration: e.target.value })
              )
            }
          />
        </div>
      );
    }
  };

  onDragOver(e) {
    let alien_data = this.props.getDragData();
    if (alien_data.type === 'move_command_block') {
      e.preventDefault();
      if (this.props.data.uuid !== alien_data.command.uuid) {
        let group = this.props.getGroup(this.props.group_name);
        const target_index = group.command_blocks.findIndex(
          (o) => o.uuid === this.props.data.uuid
        );
        if (alien_data.group_name === this.props.group_name) {
          group.command_blocks = group.command_blocks.filter(
            (command_block) => command_block.uuid !== alien_data.command.uuid
          );
        } else {
          let alien_group = this.props.getGroup(alien_data.group_name);
          alien_group.command_blocks = alien_group.command_blocks.filter(
            (command_block) => command_block.uuid !== alien_data.command.uuid
          );
          this.props.setGroup(alien_data.group_name, alien_group);
        }

        group.command_blocks.splice(target_index, 0, alien_data.command);

        this.props.setGroup(this.props.group_name, group);
        this.props.setDragData({
          type: 'move_command_block',
          command: alien_data.command,
          group_name: this.props.group_name,
        });
      }
    }
  }

  render() {
    return (
      <div
        className={
          'border mt-2 form-inline py-2 pr-2 d-flex' +
          (this.props.isFocused ? ' border border-primary' : '')
        }
        droppable={this.props.editable.toString()}
        onDragOver={
          this.props.editable ? this.onDragOver.bind(this) : undefined
        }
        draggable={this.props.editable.toString()}
        onDragStart={(e) =>
          this.props.setDragData({
            type: 'move_command_block',
            command: this.props.data,
            group_name: this.props.group_name,
          })
        }
      >
        {this.props.isFocused ? (
          <BsFillCaretRightFill />
        ) : this.props.editable ? (
          <label className='mx-1 font-weight-bold text-muted'>
            <BsArrowsMove cursor='grab' />
          </label>
        ) : (
          <label className='mx-1 font-weight-bold text-muted'>
            {this.props.index}
          </label>
        )}
        {this.Control(this.props.data.type, this.props.data)}
      </div>
    );
  }
}
