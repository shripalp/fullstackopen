const Notification = (props) => {
  const msgStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fortSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return props.msg.type === 'error' ? (
    <div style={errorStyle}>{props.msg.text}</div>
  ) : (
    <div style={msgStyle}>{props.msg.text}</div>
  )
}
export default Notification