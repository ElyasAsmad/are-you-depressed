<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar class="py-4">
	<NavBrand href="/">
		<img
			src="https://upload.wikimedia.org/wikipedia/en/3/31/International_Islamic_University_Malaysia_emblem.svg"
			class="me-3 h-6 sm:h-9"
			alt="IIUM Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Are You Depressed?</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<!-- <NavLi href="/docs/components/navbar">Navbar</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi> -->
	</NavUl>
</Navbar>
