class CommandGroupArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }
  render() {
    return (
      <div>
        {Object.entries(this.state.groups).map((group_name, group) => (
          <div className='card p-2 mb-2' key={group_name}>
            <h5 className='d-flex align-items-center'></h5>
            <h5>{`그룹 ${group_name}`}</h5>
          </div>
        ))}
      </div>
    );
  }
}

export default CommandGroupArea;
