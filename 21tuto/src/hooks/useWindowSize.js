import { useState, useEffect } from "react";

const useWindowSize = () => {
	/* 초기값 설정 */
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(()=> {
		const handleResize = () =>{
			setWindowSize({
				/* tracking current window size  */
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		handleResize();
		
		window.addEventListener("resize", handleResize);
		
		return () => window.removeEventListener("resize", handleResize);
	}, [])
	return (windowSize);
}

export default useWindowSize