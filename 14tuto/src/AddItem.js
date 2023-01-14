import { FaPlus } from "react-icons/fa"
import { useRef } from "react"; //특정 돔을 직접 선택할때 사용

const AddItem = ( { newItem, setNewItem, handleSubmit } ) => {
	const inputRef = useRef(); 
  return (
	<form className="addForm" onSubmit={handleSubmit}>
		<label htmlFor="addItem">Add Item</label>
		<input 
			type="text"
			autoFocus
			ref={inputRef}
			id="addItem"
			placeholder="Add Item"
			required  
			//value={newItem}
			onChange={(e) => setNewItem(e.target.value)}
		/>

		<button 
			type="submit"
			aria-label="Add Item"
			onClick={() => inputRef.current.focus()} //포커스 변경(인풋으로)
		>
			<FaPlus />
		</button>
	</form>
  )
}

export default AddItem