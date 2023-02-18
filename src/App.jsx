import React, { useState } from "react";

function App() {
	const [query, setQuery] = useState("");
	const [gitHubArray, setGithubArray] = useState([]);
	const API_URL = "https://api.github.com";

	function handleInputQuery(e) {
		e.preventDefault();
		setQuery(e.target.value);
	}

	async function fetchGithubList() {
		try {
			const payload = await fetch(`${API_URL}/search/users?q=${query}`);
			const response = await payload.json();
			return response.items || [];
		} catch (e) {
			throw new Error(e);
		}
	}

	async function getGithuUserArray(e) {
		e.preventDefault();
		const results = await fetchGithubList();
		setGithubArray(results);
		setQuery("");
	}

	return (
		<main>
			<h2>
				<i>Github User Search</i>
			</h2>
			<section>
				<input
					value={query}
					onChange={(e) => handleInputQuery(e)}
					type="text"
				/>
				<button onClick={(e) => getGithuUserArray(e)}>Search</button>
			</section>
			<article>
				{gitHubArray.map((user) => {
					const { login, id, avatar_url } = user;
					return (
						<div key={id} className="user">
							<img src={avatar_url} alt="image of the user" />
							<p>
								<i>{login}</i>
							</p>
						</div>
					);
				})}
			</article>
		</main>
	);
}

export default App;
