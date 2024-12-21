title: Jspreadsheet with React
keywords: Jexcel, javascript, using jspreadsheet and react
description: A full example on how to integrate Jspreadsheet with React

# The Javascript spreadsheet with React


### 1\. Integrating Jspreadsheet with React

[React with Jspreadsheet sample project](https://codesandbox.io/s/jexcel-and-react-k7nf0)

{.ignore}
```jsx
import React from "react";
import ReactDOM from "react-dom";
import jexcel from "jexcel";

import "./styles.css";
import "../node_modules/jexcel/dist/jexcel.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.options = props.options;
    this.wrapper = React.createRef();
  }

  componentDidMount = function() {
    this.el = jexcel(this.wrapper.current, this.options);
  };

  addRow = function() {
    this.el.insertRow();
  };

  render() {
    return (
      <div>
        <div ref={this.wrapper} />
        <br />
        <input
          type="button"
          value="Add new row"
          onClick={() => this.addRow()}
        />
      </div>
    );
  }
}

let options = {
  data: [[]],
  minDimensions: [10, 10]
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App options={options} />, rootElement);
```


### 2\. React component implementation

{.ignore}
```javascript
class Jspreadsheet extends React.Component {
    constructor(props) {
        super(props);
        this.options = props.options;
        this.wrapper = React.createRef();
    }

    componentDidMount = function() {
        this.el = jspreadsheet(this.wrapper.current, this.options);
    }

    addRow = function() {
        this.el.insertRow();
    }

    render() {
        return (
            <div>
                <div></div><br/><br/>
                <input type='button' value='Add new row' onClick={() => this.addRow()}></input>
            </div>
        );
    }
}

let options = {
    data:[[]],
    minDimensions:[10,10],
};

ReactDOM.render(<Jspreadsheet options={options} />, document.getElementById('spreadsheet'))
```  
  

### 3\. Jspreadsheet implementation with react component with hooks

[Working example](https://codesandbox.io/s/jspreadsheet-ce-and-react-dzpqj)

{.ignore}
```jsx
import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";

import "../node_modules/jspreadsheet-ce/dist/jexcel.css";

export default function App() {
  const jRef = useRef(null);
  const options = {
    data: [[]],
    minDimensions: [10, 10]
  };

  useEffect(() => {
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    }
  }, [options]);

  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };

  return (
    <div>
      <div ref={jRef} />
      <br />
      <input type="button" onClick={addRow} value="Add new row">
    </div>
  );
}
```

