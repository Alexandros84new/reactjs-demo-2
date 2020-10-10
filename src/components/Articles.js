import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDebounce } from '../customHooks/useDebounce';

export const Articles = ({ todo, todoIndex }) => {
	const [articles, setArticles] = useState([]);
	let shuffle = array => array.sort(() => Math.random() - 0.5);
	const fetchData = async () => {
		let response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${todo.text}`);
		let data = response.data.hits.filter(item => item.title && item.url);
		data = shuffle(data).slice(0, 3);
		setArticles(data);
	};

	let debouncedValue = useDebounce(todo.text);

	useEffect(() => {
		fetchData();
	}, [debouncedValue]);

	return (
		<ul className={'ul-style li-style m-2 p-4'}>
			{articles.map(article => {
				return (
					<li key={todo.id} className={'d-flex flex-column justify-content-between align-content-start '}>
						<div className="d-flex flex-row justify-content-between align-content-start">
							<div className="d-flex flex-column justify-content-between align-content-start">
								<a href={article.url}
									 target={'blank'}
									 className={'status-handler'}
									 data-toggle="tooltip"
									 data-placement="right"
									 title={moment(article.created_at).fromNow()}>
									{article.title}
								</a>
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	);
}