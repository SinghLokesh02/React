import React from "react";
import ReactDOM from "react-dom/client";

let div = React.createElement(
  "div",
  { id: "outer" },
  React.createElement(
    "div",
    { id: "inner" },
    React.createElement("h1", { id: "heading" }, "Heading from React")
  )
);

console.log(div);

// JSX React
let heading = <h1 className="First">My name is Lokesh Singh</h1>;

// The Above code is not Valid code as Javasrcipt so How is It working??

// Here the is parcel bundler which is converting the above code to below code before rendering it to the browser the code is Transpiled to below code

// let heading = React.createElement("h1", { className: "First" }, "My name is Lokesh Singh");

// The above code is valid javascript code and it is working fine

// The below code is the code which is transpiled by the parcel bundler (Babel)

// Babel Transpiled Code of JSX

// React.createElement => React Element Object => Virtual DOM Object => Real DOM Object => Browser

console.log(heading);

// JSX React

// If You code is One liner then write like this
let heading2 = <h1 className="head">This is Another heading of JSX</h1>;

// Other wise

let dabba = (
  <div className="box">
    <div className="box2">
      <h1>"I'm a Heading"</h1>
    </div>
  </div>
);

// React Element

let NavBar = (
  <>
    <h1 className="nav">I'm Navbar of Page</h1>
    <nav>
      <ul>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
        <li>List Item 4</li>
      </ul>
    </nav>
  </>
);

// React Component
// 1) Class based component -> OLD
// 2) Functional based component -> NEW

// React Functional Component
// Write the First Letter capital otherwise you will get Error

let fn1 = () => {
  return true;
};

// The Above one and the Below is Same Code If Your Code is One Liner

let fn2 = () => true;

let ReactComponent1 = () => {
  return <h1 className="head">Hello I'm First Component</h1>;
};

let Name = "Lokesh Singh Checking";
let ReactComponent2 = () => (
  <div id="container">
    <h1 className="return">
      This is Another Return statement From React Functional Component
    </h1>
    {/* Component Inside Component -> Component Composition */}
    {/* Ways to Execute of Include React Component inside element or Component */}
    {/* 1 */}
    <ReactComponent1></ReactComponent1>
    {/* 2 */}
    <ReactComponent1 />
    {/* 3 */}
    {ReactComponent1()}

    {/* If Your Write any Javasrcipt Code Inside the {} it will Execute below is the Example */}
    <h1 className="sum">{(100 + 300) * 2}</h1>
    <h1>{1000 + 100 + 20}</h1>
    <h1>{Name}</h1>

    {/* To include Any React Element use {} and for React Component <comp/> */}
    {NavBar}
  </div>
);

let root = ReactDOM.createRoot(document.querySelector("#root"));

// For Rendering React Element
root.render(NavBar);

// For Rendering React Component
root.render(<ReactComponent2 />);
