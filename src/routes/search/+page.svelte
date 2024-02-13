<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		location.assign(`/${location.search}`);
	});
</script>
