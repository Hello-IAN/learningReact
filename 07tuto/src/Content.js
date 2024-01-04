import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Content = () => {
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

	/* const [count, setCount] = useState(0); */
/* 	const handleClickFunc = () => {
		setCount(count + 1);
	}
	const handleResetBtn = () => {
		setCount(0);
	} */
  return (
	<main>

	{/* 	<p>
			Hello You clicked {count} times!
		</p>
		<button onClick={handleClickFunc}> click me </button> 
  		<button onClick={handleResetBtn}> Reset!</button> }*/}

	{items.length ? (
		//item이 하나라도 존재하면 아래 리스트 렌더
		<ul>
			{items.map((item) => (
				<li className='item' key={item.id}>
					<input 
						type="checkbox"
						onChange={() => handleCheck(item.id)}
						checked={item.checked}
					/>
					<label
						style={(item.checked) ? { textDecoration:
						'line-through' } : null}
						onDoubleClick={() => handleCheck(item.id)}
					>
						{item.item}
					</label>
					<FaTrashAlt 
						onClick={() => handleDelete(item.id)}
						role="button"
						tabIndex="0"
					/>
				</li>
			))}
		</ul>
	) : (
		//아이템이 없으면 해당 메세지 보여줌
		<p style={{ margineTop : '2rem' }}> Your list is Empty.</p>
	)}
	</main>
  )
}

export default Content