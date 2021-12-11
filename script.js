const startCode = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![image](https://images.unsplash.com/photo-1531278520962-fcf47a2faea2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80)\n";

// Redux:
const UPDATE = "UPDATE";
const DRAGSTART = "STARTDRAG";
const DRAGMOVE = "DRAGMOVE";
const DRAGEND = "STARTEND";

const reducer = (state = {
  code: startCode,
  position: 50,
  dragging: false },
action) => {
  switch (action.type) {
    case UPDATE:
      return { code: action.code, position: state.position, dragging: state.dragging };
    case DRAGSTART:
      return { code: state.code, position: state.position, dragging: true };
    case DRAGMOVE:
      let position = action.position < 30 ? 30 : action.position > 70 ? 70 : action.position;
      return { code: state.code, position: position, dragging: true };
    case DRAGEND:
      return { code: state.code, position: state.position, dragging: false };
    default:
      return state;}

};

function dragStart() {
  return { type: DRAGSTART };
}

function dragMove(event) {
  if (store.getState().dragging) {
    let posX = event.clientX;
    let percentage = posX / window.innerWidth * 100;
    return { type: DRAGMOVE, position: percentage };
  }
  return { type: DRAGEND };
}

function dragEnd() {
  return { type: DRAGEND };
}

const updateAction = str => {
  document.getElementById('preview').innerHTML = marked(str, { breaks: true });
  return { type: UPDATE, text: str };};

const store = Redux.createStore(reducer);

// React:
class TopLevel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container",
        onMouseMove: this.props.dragMove,
        onMouseUp: this.props.dragEnd }, /*#__PURE__*/
      React.createElement("div", {
        id: "left",
        style: { width: this.props.position.toString() + "%" } }, /*#__PURE__*/
      React.createElement("div", { className: "editor-title" }, /*#__PURE__*/
      React.createElement("i", { class: "far fa-edit" }), " Editor"), /*#__PURE__*/

      React.createElement("textarea", {
        id: "editor",
        value: this.props.code,
        onChange: this.props.update })), /*#__PURE__*/


      React.createElement("div", {
        id: "border",
        style: { left: this.props.position.toString() + "%" },
        onMouseDown: this.props.dragStart }, /*#__PURE__*/
      React.createElement("div", { className: "textbox" }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-arrows-alt-h" }), "DRAG ME")), /*#__PURE__*/


      React.createElement("div", {
        id: "right",
        style: { width: (100 - this.props.position).toString() + "%" } }, /*#__PURE__*/
      React.createElement("div", { className: "previewer-title" }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-eye" }), " Preview"), /*#__PURE__*/
      React.createElement("div", { id: "preview" }))));




  }}
;

// React-Redux
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = state => {
  return { code: state.code, position: state.position, dragging: state.dragging };
};

const mapDispatchToProps = dispatch => {
  return { update: event => dispatch(updateAction(event.target.value)),
    dragStart: () => dispatch(dragStart()),
    dragMove: event => dispatch(dragMove(event)),
    dragEnd: () => dispatch(dragEnd()) };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(TopLevel);

class AppWrapper extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));
document.getElementById('preview').innerHTML = marked(store.getState().code, { breaks: true });;