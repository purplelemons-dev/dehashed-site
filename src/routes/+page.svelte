<script lang="ts">
	import { onMount } from 'svelte';

	$: results = [];
	$: resultsMessage = '';
	$: type = 'Select Type';
	$: query = '';

	const identifiers = [
		'email',
		'username',
		'address',
		'phone',
		'name',
		'username',
		'ip_address',
		'password',
		'hashed_password',
		'address'
	];

	const search = async () => {
		results = [];
		resultsMessage = 'Loading...';
		const uriQuery = encodeURIComponent(`${type}:${query}`);
		const res = await fetch(`/search?q=${uriQuery}`);
		const data = await res.json();
		if (data === undefined) {
			alert('No results found');
			return;
		}
		if (data.length === 0) {
			alert('No results found');
			return;
		}
		results = data;
		resultsMessage = `Results:`;
	};

	onMount(() => {
		const searchQ = window.location.search;
		if (searchQ) {
			const urlParams = new URLSearchParams(searchQ);
			const q = urlParams.get('query') || '';
			[type, query] = q.split(':');
			search();
		}
		document.querySelector('#inputfield')?.addEventListener('keyup', async (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				await search();
			}
		});
	});

	const displayResult = (result: { [key: string]: string }) => {
		const dataPoints: {
			url: string;
			name: string;
			type: string;
		}[] = [];
		Object.keys(result).forEach((element) => {
			if (result[element] !== '' && identifiers.includes(element)) {
				dataPoints.push({
					url: `?query=${element}:${encodeURIComponent(result[element])}`,
					name: result[element],
					type: element
				});
			}
		});
		return dataPoints;
	};
	const srcCode = 'https://github.com/purplelemons-dev/dehashed-site';
</script>

<sub> Source code: <a href={srcCode}>{srcCode}</a> </sub>

<p>Enter a query to search for a page</p>

<select bind:value={type}>
	{#each identifiers as option}
		<option value={option}>{option}</option>
	{/each}
</select>
<input type="search" bind:value={query} id="inputfield" />
<button on:click={search}> Search </button>

<br />

<p>{resultsMessage}</p>
<ul>
	{#each results as result}
		<li class="datapoint">
			{#each displayResult(result) as dataPoint}
				<p>
					<!-- href={dataPoint.url}-->
					{dataPoint.type}: <a href="/search{dataPoint.url}">{dataPoint.name}</a>
				</p>
			{/each}
		</li>
	{/each}
</ul>

<style>
	.datapoint {
		padding: 0.5em;
		border-radius: 1em;
		background-color: #115;
	}

	sub {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: black;
		color: white;
		text-align: center;
		padding: 1em;
	}

	select {
		font-size: 1.5em;
	}

	input {
		font-size: 1.5em;
	}
	button {
		font-size: 1.5em;
	}

	ul {
		list-style-type: none;
	}

	li {
		margin: 1em;
	}

	li a {
		color: azure;
	}
	li a:hover {
		color: lightblue;
	}
</style>
