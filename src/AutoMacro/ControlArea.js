import React from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import { IoIosSave } from 'react-icons/io';

export default class ControlArea extends React.Component {
  render() {
    return (
      <div className='btn-toolbar mb-2 d-flex flex-column'>
        <div className='btn-group mb-2 d-flex ml-0 mr-0'>
          <button className='btn btn-outline-secondary readonly flex-fill d-flex flex-row'>
            <div>{'X: '}</div>
            <div className='ml-auto'>{this.props.mousePosition.x}</div>
          </button>
          <button className='btn btn-outline-secondary readonly flex-fill d-flex flex-row'>
            <div>{'Y: '}</div>
            <div className='ml-auto'>{this.props.mousePosition.y}</div>
          </button>
        </div>
        <div className='btn-group w-100'>
          <button
            className={'btn btn-outline-secondary'}
            onClick={() => this.props.runMacro()}
            disabled={!this.props.editable}
          >
            <AiFillCaretRight />
          </button>
          <button
            className='btn btn-outline-secondary'
            onClick={() => this.props.saveMacro()}
            disabled={!this.props.editable}
          >
            <IoIosSave />
          </button>
          <button className='btn btn-outline-danger' active='true'>
            비상정지 F1
          </button>
        </div>
      </div>
    );
  }
}
