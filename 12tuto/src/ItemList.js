import LineItem from "./LineItem"

const ItemList = ({ items, handleCheck, handleDelete  }) => {
  return (
	//item이 하나라도 존재하면 아래 리스트 렌더
	<ul>
		{items.map((item) => (
			<LineItem
				key = {item.id}
				item = {item}
				handleCheck = {handleCheck}
				handleDelete = {handleDelete}
			/>
		))}
	</ul>
  )
}

export default ItemList