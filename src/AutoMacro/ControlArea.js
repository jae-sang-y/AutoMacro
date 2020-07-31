import React from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import { BsStopFill } from 'react-icons/bs';
import { IoIosSave } from 'react-icons/io';

export default class ControlArea extends React.Component {
  render() {
    return (
      <div className='btn-toolbar mb-2'>
        <div className='btn-group'>
          <button
            className={'btn btn-outline-secondary'}
            onClick={() => this.props.runMacro()}
          >
            <AiFillCaretRight />
          </button>
          <button
            className='btn btn-outline-secondary'
            onClick={() => this.props.stopMacro()}
          >
            <BsStopFill />
          </button>
          <button
            className='btn btn-outline-secondary'
            onClick={() => this.props.saveMacro()}
          >
            <IoIosSave />
          </button>
        </div>
      </div>
    );
  }
}
