import React from 'react';
import { Component } from 'react';
import { BsArrowsMove, BsFillCaretRightFill } from 'react-icons/bs';
import {
  CommandTypes,
  AbleKeyList,
  AbleButtonList,
  SelectTemplate,
} from './Definitions';
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { Card } from 'react-bootstrap';

export default class CommandBlock extends Component {
  ControlLabelCSS = { width: '6rem' };
  Control = (type, data) => {
    if (type === CommandTypes.keydown) {
      return (
        <div className="d-flex">
          <label className="text-dark mr-2" style={this.ControlLabelCSS}>
            키 다운
          </label>
          <div className="form-group d-flex flex-column align-items-start">
            <SelectTemplate
              className="form-control"
              defaultValue={this.props.data.key}
              editable={this.props.editable}
              dict={AbleKeyList}
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { key: e.target.value })
                )
              }
            />
            <small className="text-muted">대상 키</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.keyup) {
      return (
        <div className="d-flex">
          <label className="text-dark mr-2" style={this.ControlLabelCSS}>
            키 업
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <SelectTemplate
              className="form-control"
              defaultValue={this.props.data.key}
              editable={this.props.editable}
              dict={AbleKeyList}
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { key: e.target.value })
                )
              }
            />
            <small className="text-muted">대상 키</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.mouse_click) {
      return (
        <div className="d-flex">
          <label className="text-dark mr-2" style={this.ControlLabelCSS}>
            마우스 클릭
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <SelectTemplate
              className="form-control"
              defaultValue={this.props.data.button}
              dict={AbleButtonList}
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
            <small className="text-muted">대상 버튼</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.delay) {
      return (
        <div className="d-flex flex-fill">
          <label className="text-dark mr-2" style={this.ControlLabelCSS}>
            시간 지연
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control flex-fill text-right"
              type="number"
              step="0.001"
              placeholder="(단위: 초)"
              defaultValue={this.props.data.second}
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { second: e.target.value })
                )
              }
            />
            <small className="text-muted">단위: 초</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.mouse_move) {
      const MouseMoveNumericInputCSS = { width: '10.67rem' };
      return (
        <div className="flex-fill d-flex">
          <label className="text-dark mr-2" style={this.ControlLabelCSS}>
            마우스 이동
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control"
              style={MouseMoveNumericInputCSS}
              type="number"
              step="1"
              placeholder="X"
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              defaultValue={this.props.data.x}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { x: e.target.value })
                )
              }
            />
            <small className="text-muted">X 좌표</small>
          </div>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control"
              style={MouseMoveNumericInputCSS}
              type="number"
              step="1"
              placeholder="Y"
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              defaultValue={this.props.data.y}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { y: e.target.value })
                )
              }
            />
            <small className="text-muted">Y 좌표</small>
          </div>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control text-right"
              style={MouseMoveNumericInputCSS}
              type="number"
              step="0.001"
              placeholder="기간"
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              defaultValue={this.props.data.duration}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { duration: e.target.value })
                )
              }
            />
            <small className="text-muted">이동 진행 시간</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.image_search) {
      const MouseMoveNumericInputCSS = { width: '10.67rem' };
      return (
        <div className="flex-fill d-flex">
          <label className="text-dark" style={this.ControlLabelCSS}>
            이미지 서치
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <SelectTemplate
              className="form-control"
              defaultValue={this.props.data.sample}
              editable={this.props.editable}
              list={this.props.sampleList}
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, {
                    sample: e.target.value,
                  })
                )
              }
            />
            <small className="text-muted">비교 이미지 샘플</small>
          </div>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control"
              style={MouseMoveNumericInputCSS}
              type="number"
              step="1"
              placeholder="X"
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              defaultValue={this.props.data.x}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { x: e.target.value })
                )
              }
            />
            <small className="text-muted">대상 X 좌표</small>
          </div>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control"
              style={MouseMoveNumericInputCSS}
              type="number"
              step="1"
              placeholder="Y"
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              defaultValue={this.props.data.y}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { y: e.target.value })
                )
              }
            />
            <small className="text-muted">대상 Y 좌표</small>
          </div>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control"
              style={MouseMoveNumericInputCSS}
              type="number"
              step="1"
              placeholder="W"
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              defaultValue={this.props.data.w}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { w: e.target.value })
                )
              }
            />
            <small className="text-muted">대상 가로 길이</small>
          </div>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              className="form-control"
              style={MouseMoveNumericInputCSS}
              type="number"
              step="1"
              placeholder="H"
              readOnly={!this.props.editable}
              disabled={!this.props.editable}
              defaultValue={this.props.data.h}
              draggable="false"
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { h: e.target.value })
                )
              }
            />
            <small className="text-muted">대상 세로 길이</small>
          </div>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <SelectTemplate
              className="form-control"
              defaultValue={this.props.data.dest_group}
              editable={this.props.editable}
              list={this.props.getGroupList()}
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { dest_group: e.target.value })
                )
              }
            />
            <small className="text-muted">일치시 이동할 그룹 이름</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.sound_alarm) {
      return (
        <div className="flex-fill d-flex">
          <label className="text-dark" style={this.ControlLabelCSS}>
            사운드 알람
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <SelectTemplate
              className="form-control"
              defaultValue={this.props.data.sound}
              editable={this.props.editable}
              list={this.props.soundList}
              onChange={(e) => {
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { sound: e.target.value })
                );
              }}
            />
            <small className="text-muted">사운드 이름</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.goto_group) {
      return (
        <div className="flex-fill d-flex">
          <label className="text-dark" style={this.ControlLabelCSS}>
            그룹 이동
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <SelectTemplate
              className="form-control"
              defaultValue={this.props.data.dest_group}
              editable={this.props.editable}
              list={this.props.getGroupList()}
              onChange={(e) => {
                console.log(e.target.value);
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, {
                    dest_group: e.target.value,
                  })
                );
              }}
            />
            <small className="text-muted">이동할 그룹 이름</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.choice_group) {
      return (
        <div className="flex-fill d-flex">
          <label className="text-dark" style={this.ControlLabelCSS}>
            랜덤 이동
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <div className="d-flex flex-row align-items-center">
              <SelectTemplate
                className="form-control"
                editable={this.props.editable}
                list={this.props.getGroupList()}
                defaultValue={this.props.data.choice_group}
                onChange={(e) => {
                  this.props.modCommand(
                    this.props.group_name,
                    this.props.data.uuid,
                    Object.assign(this.props.data, {
                      choice_group: e.target.value,
                    })
                  );
                }}
              />
              <Card className="h-100 p-auto mr-2 d-flex flex-row align-items-center">
                <GrAdd
                  onClick={(e) => {
                    this.props.data.dest_groups.push(
                      this.props.data.choice_group
                    );
                    this.props.modCommand(
                      this.props.group_name,
                      this.props.data.uuid,
                      Object.assign(this.props.data, {
                        dest_groups: this.props.data.dest_groups,
                      })
                    );
                  }}
                />
              </Card>
              {this.props.data.dest_groups.map((name, index) => (
                <Card
                  className="d-flex flex-row align-items-center h-100 px-2 mr-2"
                  key={index}
                >
                  <h6>{name}</h6>
                  <AiFillDelete
                    className="ml-2"
                    onClick={(e) => {
                      this.props.data.dest_groups.splice(index, 1);
                      this.props.modCommand(
                        this.props.group_name,
                        this.props.data.uuid,
                        Object.assign(this.props.data, {
                          dest_groups: this.props.data.dest_groups,
                        })
                      );
                    }}
                  />
                </Card>
              ))}
            </div>
            <small className="text-muted">랜덤하게 이동할 그룹들의 이름</small>
          </div>
        </div>
      );
    }
    if (type === CommandTypes.comment) {
      return (
        <div className="flex-fill d-flex">
          <label className="text-dark" style={this.ControlLabelCSS}>
            주석
          </label>
          <div className="mr-2 form-group d-flex flex-column align-items-start">
            <input
              type="text"
              className="form-control flex-fill"
              defaultValue={this.props.data.text}
              editable={this.props.editable.toString()}
              onChange={(e) =>
                this.props.modCommand(
                  this.props.group_name,
                  this.props.data.uuid,
                  Object.assign(this.props.data, { text: e.target.value })
                )
              }
            />
            <small className="text-muted">주석입니다.</small>
          </div>
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
        style={{ overflow: 'hidden' }}
      >
        {this.props.isFocused ? (
          <BsFillCaretRightFill />
        ) : this.props.editable ? (
          <label className="mx-1 font-weight-bold text-muted">
            <BsArrowsMove cursor="grab" />
          </label>
        ) : (
          <label className="mx-1 font-weight-bold text-muted">
            {this.props.index}
          </label>
        )}
        {this.Control(this.props.data.type, this.props.data)}
      </div>
    );
  }
}
