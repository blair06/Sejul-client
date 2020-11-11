const REACT_API_HOST = process.env.REACT_APP_API_HOST;

const getUrl = (path: string) => {
	console.log(REACT_API_HOST);
	return `${REACT_API_HOST}/${path}`;
};

export default REACT_API_HOST;

export { REACT_API_HOST, getUrl };
