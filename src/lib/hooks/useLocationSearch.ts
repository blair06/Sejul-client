interface ILocationSearch {
	key: string;
	value: string;
}
export default (search: string): ILocationSearch[] => {
	const hasQuestionMark = search.indexOf('?');
	let result = [] as ILocationSearch[];
	if (hasQuestionMark >= 0) {
		const replaced = search.replace('?', '');
		const splited = replaced.split('&');
		splited.forEach((text: string) => {
			const splitedItem = text.split('=');
			result.push({
				key: splitedItem[0],
				value: decodeURI(splitedItem[1]),
			} as ILocationSearch);
		});
	}

	return result;
};
