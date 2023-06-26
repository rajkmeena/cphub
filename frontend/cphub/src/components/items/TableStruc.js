import React from 'react'
// import { Table } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import validator from 'validator';
import './TableStruc.css'
// import 'json'
// import datetime from 'datetime'
// import 'dateparser'


// function checkDate(ans){
//   const json_data = JSON.stringify(ans); // Convert ans[] to JSON string
//   const data = JSON.parse(json_data); // Parse JSON string to object

//   const current_date = new Date(); // Get current date and time

//   const filtered_objects = [];
//   for (const sublist of data) {
//     const filtered_sublist = [];
//     for (const obj of sublist) {
//       for (let [index, [key, value]] of Object.entries(Object.entries(obj))) {
//         index = parseInt(index);
//         if (index === 0 && /^\d+$/.test(value)) {
//           continue;
//         }
//         if (typeof value === "string") {
//           const parsed_date = dateparser.parse(value);
//           if (parsed_date && parsed_date > current_date) {
//             filtered_sublist.push(obj);
//             break;
//           }
//         }
//       }
//     }
//     filtered_objects.push(filtered_sublist);
//   }
//   const filtered_json = JSON.stringify(filtered_objects, null, 2); // Convert filtered_objects to formatted JSON string
//   console.log(filtered_json); // Print filtered_json to the console

//   // Return the modified ans[] or filtered_objects if needed
//   return ans;
// }

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isValidUrl(arr) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
      if(validator.isURL(element)){return element}
  }
  return null
};



const objMap=(obj)=>{
  let ans=[]
  let string = null
  let flag=false
  let ss=""
  Object.keys(obj).forEach(function(key, index) {
    ss+=`  ${obj[key]}`
    if (key==="links") {
      const str=isValidUrl(obj[key])
      // console.log(str);
      if(str!==null){ans.push((<td><a href={str} target="_blank"><button class="button_link">Link</button></a></td>));}
    }
    else if(obj[key]!==""&&!isNumeric(obj[key])&&obj[key].length>=20&&!flag){ans.push(<td>{obj[key]}</td>);flag=true;string = obj[key]}

  });
  //  console.log(ss);
  if(ans.length<2){
    if(ans.length==0)return []
    else{
      if(string!=null&&string.length<40)return []
      else if(string ==null)return []
      else if(string!=null&&string.length>=40)ans.push(<td>N.A.</td>)
    }
    
  }
  return ans
}



const TableStruc = () => {
  const [data, setData] = useState([]);
const getData = () => {
  fetch( 'http://127.0.0.1:8001/file', {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  .then(function (response) {
    // console.log(response);
    return response.json();
  })
  .then(function (myJson) {
      // console.log(myJson);
      setData(myJson);
    });
  };
  let num=1
  useEffect(() => {
    getData();
 }, []);

 
  return (
    
    <div>
      {/* <h1>hello</h1> */}
      <br></br>
      <br></br>
      <div className="DataTable">
        <table>
          <thead>
            <tr>
                {/* {   
                  data.length > 0 && Object.keys(data[0]).map((item) => {
                        return <th>{item}</th>
                      }
                      )
                   
                    } */}
                <th>#</th>
                <th>Title for Call For Proposals</th>
                <th>Links</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <>{item.map((i)=>{
                  if (Object.keys(i).length !== 0) {
                    const objm=objMap(i)
                      if (objm.length>1) {
                        return (<tr><td>{num++}</td>{objm}</tr>)
            
                      }
                    }
                })}</>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableStruc



// const checkDates=async(url,s)=> {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({string:s}), // body data type must match "Content-Type" header
//     });
//      console.log(await response.json()); // parses JSON response into native JavaScript objects
//   }