<script lang="ts">
	import { onMount } from 'svelte';

	$: results = [];
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
		const uriQuery = encodeURIComponent(`${type}:${query}`);
		const res = await fetch(`/search?q=${uriQuery}`);
		const data = await res.json();
		results = data;
	};

	onMount(() => {
		if (window.location.search) {
			const urlParams = new URLSearchParams(window.location.search);
			const q = urlParams.get('query') || '';
			[type, query] = q.split(':');
			search();
		}
	});

	const doThing = () => {
		return location.assign(`/?query=${type}:${query}`);
		//location.reload();
	};

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
</script>

<h1>Welcome to SvelteKit</h1>

<p>Enter a query to search for a page</p>
<select bind:value={type}>
	{#each identifiers as option}
		<option value={option}>{option}</option>
	{/each}
</select>
<input type="text" bind:value={query} />
<button on:click={search}> Search </button>

<br />

<p>Search results</p>
<ul>
	{#each results as result}
		{#each displayResult(result) as dataPoint}
			<li>
				<!-- href={dataPoint.url}-->
				{dataPoint.type}: <a href="/search{dataPoint.url}">{dataPoint.name}</a>
			</li>
		{/each}
	{/each}
</ul>
