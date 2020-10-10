import React, { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(
		() => {
			// Set debouncedValue to value (passed in) after the specified delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);
			return () => {
				clearTimeout(handler);
			};
		}, [value]
	);

	return debouncedValue;
}
