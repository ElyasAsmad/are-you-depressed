<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink
	} from 'flowbite-svelte';
</script>

<Footer footerType="logo" class="bg-primary-100">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterBrand
			href="/"
			src="https://upload.wikimedia.org/wikipedia/en/3/31/International_Islamic_University_Malaysia_emblem.svg"
			alt="IIUM logo"
			name="Are you depressed?"
		/>
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="/">About</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
	<!-- <FooterCopyright by="Elyas Asmad, Fadzwan, Hayani" copyrightMessage='CSCI 2304' /> -->
    <p class="w-full text-center text-sm text-gray-500">
        ©️ 2024 Elyas Asmad, Fadzwan, Hayani for CSCI 2304 Intelligent Systems (KICT IIUM)
    </p>
</Footer>
