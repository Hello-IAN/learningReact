import ItemList from './ItemList';

const Content = ( { items, handleCheck, handleDelete } ) => {

  return (
	<main>
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
	</main>
  )
}

export default Content