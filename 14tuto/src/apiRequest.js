//컴포넌트가 아니라 GET, POST, UPDATE, DELETE를 위한 API

const apitREquest = async (url = '', optionsObj = null, errMsg = null)  => {
	try {
		const response = await fetch(url, optionsObj);
		if (!response.ok) throw Error('Please reload the app')
	} catch (err) {
		errMsg = err.message;
	} finally {
		return errMsg;
	}
}// default 인수 사용

export default apitREquest