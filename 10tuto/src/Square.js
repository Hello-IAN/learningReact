const Square = ( { colorValue, hexValue, isDarkText } ) => {
  return (
	<section 
		className="square"
		style={{ backgroundColor: colorValue,
			color: isDarkText ? "#000" : "#FFF"
		}}
	>
		<p> {colorValue ? colorValue : "Empty Value" } </p> {/* 컬러값 있으면 컬러값 아니면 엠프티 */}
		<p>{hexValue ? hexValue : null}</p>
	</section>
  )
}
Square.defaultProps = {
	colorValue: "Empty Color Value"
}
export default Square