<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
</script>

<div class="max-w-screen-xl mx-auto">
	<h1 class="text-2xl font-bold">Are You Depressed?</h1>
	<p>Group K</p>

	<Table striped>
		<TableHead>
			<TableHeadCell>No</TableHeadCell>
			<TableHeadCell>Team Member</TableHeadCell>
		</TableHead>
		<TableBody>
			<TableBodyRow>
				<TableBodyCell>1</TableBodyCell>
				<TableBodyCell>Elyas bin Asmad</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>2</TableBodyCell>
				<TableBodyCell>Fadzwan Ashriq</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>3</TableBodyCell>
				<TableBodyCell>Hayani Nazurah</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>

	<p>CSCI 2304 - Intelligent Systems</p>
	<p>International Islamic University Malaysia</p>
</div>
