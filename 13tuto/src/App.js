import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';
import AddItem from './AddItem.js';
import SearchItem from './SearchItem.js';

function App() {
	const API_URL = 'http://localhost:3500/itemss';

	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState('');
	const [search, setSearch] = useState('');
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(()=> {
		const fetchItemReq = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) throw Error ('Did not Receive expected data');//response 상태가 이상하면 에러에 메세지를 던짐
				const listItems = await response.json();
				console.log(listItems);
				setItems(listItems);
				setFetchError(null);
			} catch (err) {
				setFetchError(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		setTimeout(() => {
			fetchItemReq();
		}, 2000)
		
	}, []) /* 최초 로딩때에만 렌더 */

	const addItem = (item) => {
		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const myNewItem = { id, checked: false, item };
		const listItems = [...items, myNewItem];
		setItems(listItems);
	}
	const handleCheck = (id) => {
		const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
		//넘어온 키랑 아이템 키 확인 -> true면 checked 변경 아니면 그대로인 New arr형성
		setItems(listItems);
	}

	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
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
	  <main>
		{isLoading && <p>Loading Items..</p>}
		{fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
		{!fetchError && !isLoading && <Content 
			items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
			handleCheck={handleCheck}
			handleDelete={handleDelete}
		/>}
	  </main>
      <Footer totalcount={items.length}/>
    </div>
  );
}

export default App;
