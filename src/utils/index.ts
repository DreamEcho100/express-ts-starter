// export const isNonNullable = <Item>(item: Item): NonNullable<Item> | never => {
// 	if (typeof item === 'undefined' || (typeof item === 'object' && !item))
// 		throw new Error(`${String(item)} is nullable`);

// 	return item;
// };

const raiseError = (err: string): never => {
	throw new Error(err);
};

export const isNonNullableOrThrow = <Item>(
	item: Item,
): NonNullable<Item> | never =>
	item ?? raiseError(`${String(item)} is nullable`);
