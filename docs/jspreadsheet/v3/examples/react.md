title: Jspreadsheet with React
keywords: Jexcel, javascript, using Jspreadsheet and react
description: A full example on how to integrate Jspreadsheet with React

[Back to Examples](/jspreadsheet/v3/examples "Back to the examples section")

# The Javascript spreadsheet with React

Integrating Jspreadsheet with React

[React with jspreadsheet sample project](https://codesandbox.io/s/jexcel-and-react-hmx0k)

### Source code

{.ignore}

```javascript
class Jspreadsheet extends React.Component {
  constructor(props) {
    super(props);
    this.options = props.options;
  }

  componentDidMount = function () {
    this.el = jexcel(ReactDOM.findDOMNode(this).children[0], this.options);
  };

  addRow = function () {
    this.el.insertRow();
  };

  render() {
    return (
      <div>
        <div></div>
        <br />
        <br />
        <input
          type="button"
          value="Add new row"
          onClick={() => this.addRow()}
        ></input>
      </div>
    );
  }
}

var options = {
  data: [[]],
  minDimensions: [10, 10],
};

ReactDOM.render(
  <Jspreadsheet options={options} />,
  document.getElementById("spreadsheet")
);
```
