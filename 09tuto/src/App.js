import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState } from 'react';
import AddItem from './AddItem.js';
import SearchItem from './SearchItem.js';

function App() {
  
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

	const [newItem, setNewItem] = useState('')
	const [search, setSearch] = useState('')

	const setAndSaveItems = (newItems)=> {
		setItems(newItems);//checked 바뀐 newArr set
		localStorage.setItem('shoppinglist', JSON.stringify(newItems));
	}

	const addItem = (item) => {
		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const myNewItem = { id, checked: false, item };
		const listItems = [...items, myNewItem];
		setAndSaveItems(listItems);
	}
	const handleCheck = (id) => {
		const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
		//넘어온 키랑 아이템 키 확인 -> true면 checked 변경 아니면 그대로인 New arr형성
		setAndSaveItems(listItems);
	}

	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setAndSaveItems(listItems);
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submiit");
		if (!newItem)
			return ;
		addItem(newItem);
		setNewItem('');
	}
  return (
    <div>
      <Header title="Groceries" />
	  <AddItem 
	  	newItem={newItem}
		setNewItem={setNewItem}
		handleSubmit={handleSubmit}
	  />
	  <SearchItem
	  	search={search}
		setSearch={setSearch}
	  />
      <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer totalcount={items.length}/>
    </div>
  );
}

export default App;
