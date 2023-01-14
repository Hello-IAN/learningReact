
const Footer = ( {totalcount} ) => {
	
  return (
	<footer>
		<p> {totalcount} list {totalcount === 1 ? "item" : "items"} </p>
	</footer>
  )
}


export default Footer