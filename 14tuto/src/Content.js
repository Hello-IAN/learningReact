import ItemList from './ItemList';

const Content = ( { items, handleCheck, handleDelete } ) => {
	/* const [count, setCount] = useState(0); */
/* 	const handleClickFunc = () => {
		setCount(count + 1);
	}
	const handleResetBtn = () => {
		setCount(0);
	} */
  return (
	<>

	{/* 	<p>
			Hello You clicked {count} times!
		</p>
		<button onClick={handleClickFunc}> click me </button> 
  		<button onClick={handleResetBtn}> Reset!</button> }*/}

	{items.length ? (
		<ItemList
			items = {items}
			handleCheck = {handleCheck}
			handleDelete = {handleDelete}
		/>
	) : (
		//아이템이 없으면 해당 메세지 보여줌
		<p style={{ margineTop : '2rem' }}> Your list is Empty.</p>
	)}
	</>
  )
}

export default Content