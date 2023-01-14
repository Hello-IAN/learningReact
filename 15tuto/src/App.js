import { useState, useEffect } from "react";
import './index.css'
import Form from './Form.js';
//import List from "./List";
import Table from "./Table";


function App() {
  const API_URL = 'https://jsonplaceholder.typicode.com/'; /* //basic url  */
  const [reqType, setReqType] = useState('users');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        const data = await response.json();

        setItems(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchItems();

  }, [reqType]) 
  
  /* //reqType바뀌면 재렌더 */
  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType}/>
     {/*  <List items={items} /> */}
     <Table items={items} />
    </div>
  );
}

export default App;
