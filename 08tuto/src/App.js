import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState } from 'react';

function App() {
  
	const [items, setItems] = useState([
		{
			id: 1,
			checked: false,
			item: "One half pound bag of Cocoa Covered Almonds Unsalted"
		},
		{
			id: 2,
			checked: false,
			item: "item 2"
		},
		{
			id: 3,
			checked: false,
			item: "item 3"
		}
	]);

	const handleCheck = (id) => {
		const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
		//넘어온 키랑 아이템 키 확인 -> true면 checked 변경 아니면 그대로인 New arr형성
		setItems(listItems);//checked 바뀐 newArr set
		localStorage.setItem('shoppinglist', JSON.stringify(listItems));
	}

	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);//checked 바뀐 newArr set
		localStorage.setItem('shoppinglist', JSON.stringify(listItems));
	}

  return (
    <div>
      <Header title="Groceries" />
      <Content 
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer totalcount={items.length}/>
    </div>
  );
}

export default App;
