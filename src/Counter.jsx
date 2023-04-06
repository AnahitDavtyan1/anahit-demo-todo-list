// // import { Component } from "react";

// // class Counter extends Component {
// //   state = {
// //     count: 0,
// //     test: "hello",
// //   };

// //   changeCounter = () => {
// //     this.setState({
// //       count: this.state.count + 1,
// //     });
// //   };

// //   render() {
// //     return (
// //       <div>
// //         Count: {this.state.count}
// //         <button onClick={this.changeCounter}>+</button>
// //       </div>
// //     );
// //   }
// // }

// // export default Counter;

// import { useState, useEffect, useMemo } from "react";

// function Counter() {
//   const [values, setValues] = useState({
//     value: 0,
//   });

//   // if ({ values } > 0) {
//   //   console.log("Positive");
//   // } else if ({ values } < 0) {
//   //   console.log("Negative");
//   // } else if (({ values } = 0)) {
//   //   console.log("Zero");
//   // }

//   const [number, setNumber] = useState(0);
//   console.log("numbers", number);

//   // useEffect(() => {
//   //   console.log("useEffect componentDidUpdate");
//   // }, [values]);

//   return (
//     <div>
//       <h4>Counter</h4>
//       {/* <input */}
//       {/* type="text" */}
//       {/* // value = {this.state.value} */}
//       {/* ={(event) => { */}
//       {/* setonChangeValues({ */}
//       {/* ...values, */}
//       {/* value: event.target.value, */}
//       {/* }); */}
//       {/* }} */}
//       {/* /> */}
//       <button
//         className="btn btn-primary m-1"
//         onClick={() => {
//           setNumber(number + 1);
//         }}
//       >
//         Add{" "}
//       </button>
//       <p>{values.value}</p>
//       <button
//         className="btn btn-primary m-1"
//         onClick={() => {
//           setNumber(number - 1);
//         }}
//       >
//         Reduce
//       </button>
//     </div>
//   );
// }
// export default Counter;
