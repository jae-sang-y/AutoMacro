import React from 'react';
import { Component } from 'react';
import { CommandPushButtons } from './Definitions';
import { Card } from 'react-bootstrap';
import { v4 as uuid4 } from 'uuid';

class CommandPush extends Component {
  render() {
    return (
      <Card
        style={{
          cursor:
            this.props.editable && this.props.data.enable
              ? 'grab'
              : 'not-allowed',
        }}
        draggable={this.props.editable && this.props.data.enable}
        onDragStart={
          this.props.editable
            ? (e) =>
                this.props.setDragData({
                  type: 'add_command_block',
                  command: Object.assign({}, this.props.data.default_value, {
                    type: this.props.data.type,
                    uuid: uuid4(),
                  }),
                })
            : undefined
        }
        className={
          'mb-2 p-1 text-center drag-container text-nowrap ' +
          (this.props.data.enable && this.props.editable
            ? 'border-primary'
            : 'border-secondary text-secondary')
        }
      >
        {this.props.name}
      </Card>
    );
  }
}
class CommandPushArea extends Component {
  render() {
    return (
      <div className='d-flex flex-column'>
        {Object.entries(CommandPushButtons).map((entry) => (
          <CommandPush
            key={entry[0]}
            name={entry[0]}
            data={entry[1]}
            setDragData={this.props.setDragData}
            editable={this.props.editable}
          />
        ))}
      </div>
    );
  }
}
export default CommandPushArea;
