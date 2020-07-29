class CommandGroupArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }
  render() {
    return React.createElement(
      'div',
      null,
      Object.entries(this.state.groups).map(function (group_name, group) {
        return React.createElement(
          'div',
          { className: 'card p-2 mb-2', key: group_name },
          React.createElement('h5', { className: 'd-flex align-items-center' }),
          React.createElement(
            'h5',
            null,
            `그룹 ${group_name}`
          )
        );
      })
    );
  }
}

export default CommandGroupArea;