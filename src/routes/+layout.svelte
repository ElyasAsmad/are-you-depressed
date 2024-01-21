<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
	<style>
		* {
			font-family: 'Inter Tight', sans-serif;
		}
	</style>
</svelte:head>

<script>
    import '../app.css';
    import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />
<div class="min-h-[75vh]">
    <slot />
</div>
<Footer />