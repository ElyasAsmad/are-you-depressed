<script lang="ts">
	import { browser } from '$app/environment';
	import { Range, Label, Button, Card, Spinner } from 'flowbite-svelte';
	import type { UserProfile } from '$lib/types/Spotify';
	import { generateCodeChallenge, generateCodeVerifier } from '$lib/helpers/spotify-utils';
	import { onMount } from 'svelte';
	import SpotifyLogo from '$lib/components/SpotifyLogo.svelte';
	import type { SpotifyPlaylist, Item } from '$lib/types/SpotifyPlaylist';
	import type { IPredictionData } from '$lib/types/PredictionResponse';

	const depressionFacts = [
		{
			message:
				'5% of adults globally experience depression, affecting over 280 million people.',
			reference: 'https://www.who.int/news-room/fact-sheets/detail/depression'
		},
		{
			message: 'Women are about 50% more likely to experience depression than men.',
			reference: 'https://www.who.int/news-room/fact-sheets/detail/depression'
		},
		{
			message:
				'Depression can lead to suicide, which is the fourth leading cause of death in 15-29 year olds',
			reference: 'https://www.who.int/news-room/fact-sheets/detail/depression'
		},
		{
			message:
				'Although there are known, effective treatments for mental disorders, more than 75% of people in low- and middle-income countries receive no treatment',
			reference: 'https://www.who.int/news-room/fact-sheets/detail/depression'
		}
	];

	let stepValue = 2.5;

	const clientID = '711ea12ff9bf4779a332830954d0f2e6';

	const code = browser ? localStorage.getItem('code') : null;
	let access_token = browser ? localStorage.getItem('access_token') : null;

	let userProfile: UserProfile;
	let userPlaylists: SpotifyPlaylist;
	let selectedId: string | null = null;
	let predictionPromise: Promise<any>;
	let predictionData: IPredictionData | undefined;
	let predictionLoading: boolean = false;

	async function linkToSpotify() {
		redirectToAuthCodeFlow(clientID);
	}

	onMount(() => {
		if (code && !access_token) {
			getAccessToken(clientID, code).then((token) => {
				access_token = token;
				localStorage.setItem('access_token', token);
				localStorage.removeItem('code');
			});
		}
	});

	$: access_token
		? Promise.all([fetchProfile(access_token), fetchPlaylists(access_token)]).then(
				([profile, playlists]) => {
					userProfile = profile;
					userPlaylists = playlists;
				}
			)
		: null;

	async function redirectToAuthCodeFlow(clientId: string) {
		const verifier = generateCodeVerifier(128);
		const challenge = await generateCodeChallenge(verifier);

		localStorage.setItem('verifier', verifier);

		const params = new URLSearchParams();
		params.append('client_id', clientId);
		params.append('response_type', 'code');
		params.append('redirect_uri', 'http://localhost:5173/callback');
		params.append('scope', 'user-read-private user-read-email');
		params.append('code_challenge_method', 'S256');
		params.append('code_challenge', challenge);

		document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
	}

	async function getAccessToken(clientId: string, code: string): Promise<string> {
		const verifier = localStorage.getItem('verifier');

		const params = new URLSearchParams();
		params.append('client_id', clientId);
		params.append('grant_type', 'authorization_code');
		params.append('code', code);
		params.append('redirect_uri', 'http://localhost:5173/callback');
		params.append('code_verifier', verifier!);

		const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: params
		});

		const { access_token } = await result.json();
		return access_token;
	}

	async function fetchProfile(token: string): Promise<UserProfile> {
		const result = await fetch('https://api.spotify.com/v1/me', {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` }
		});

		return await result.json();
	}

	async function fetchPlaylists(token: string): Promise<SpotifyPlaylist> {
		const result = await fetch('https://api.spotify.com/v1/me/playlists', {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` }
		});

		return await result.json();
	}

	function handleClick(item: Item) {
		selectedId = selectedId === item.id ? null : item.id;
	}

	function checkDepression() {
		if (!selectedId) {
			alert('Please select a playlist');
			return;
		}

		predictionLoading = true;

		predictionPromise = new Promise<void>((resolve, reject) => {
			fetch('https://predict-depression.elyasasmad.com/predict-mood/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					playlist_url: `https://open.spotify.com/playlist/${selectedId}`,
					stress_level: stepValue
				})
			})
				.then((res) => res.json())
				.then((data) => {
					predictionData = data;
					predictionLoading = false;
					resolve();
				})
				.catch((err) => {
					predictionLoading = false;
					reject(err);
				});
		});
	}

	function clearPrediction() {
		predictionData = undefined;
		predictionLoading = false;
	}
</script>

{#if !predictionData && !predictionLoading}
	<div class="max-w-screen-xl mx-auto px-4 flex flex-col gap-y-2 mb-4">
		<div>
			<h1 class="text-xl font-bold">
				Predict whether you are having an early sign of depression
			</h1>
			<p>
				Our machine learning depression detector model is trained with around 36,406 data.
				This model can predict whether you are depressed or not based on your Spotify
				playlist.
			</p>
		</div>
		<div class="border rounded-xl p-4">
			<div class="grid gap-6 mb-6">
				<div>
					<Label class="mb-2">1. Link with your Spotify account</Label>
					<Button on:click={linkToSpotify}>
						{!userProfile ? 'Link with Spotify' : 'Linked with Spotify'}
					</Button>
					{#if userProfile}
						<div class="bg-[#1ED760] mt-4 rounded-lg shadow-xl p-4 max-w-xl mx-auto">
							<div class="flex items-center">
								<img
									class="w-[80px] h-[80px] rounded-full mr-4"
									src={userProfile.images[1].url}
									alt={userProfile.display_name}
								/>
								<div class="leading-tight">
									<h1 class="text-sm flex items-center gap-x-2">
										<SpotifyLogo />
										Spotify account
									</h1>
									<h2 class="text-xl font-bold flex gap-x-2 items-center">
										{userProfile.display_name}
										<span class="text-sm font-normal">@{userProfile.id}</span>
									</h2>
									<p>{userProfile.email}</p>
								</div>
							</div>
						</div>
					{/if}
				</div>
				{#if userPlaylists}
					<div>
						<Label class="mb-2">2. Choose your Spotify playlist</Label>
						<ul class="flex flex-col gap-y-2 max-h-[400px] overflow-y-scroll">
							{#each userPlaylists.items as playlist}
								<li
									class="border rounded-lg hover:bg-green-100"
									class:active={selectedId === playlist.id}
								>
									<button
										class="flex items-center p-4 gap-x-2 text-left w-full"
										on:click={() => handleClick(playlist)}
									>
										{#if playlist.images.length > 0 && playlist.images[0].url}
											<img
												src={playlist.images[0].url}
												class="w-[60px] h-[60px]"
												alt={`${playlist.name} image`}
											/>
										{/if}
										<div>
											<p class="text-lg font-bold">{playlist.name}</p>
											<p
												class={`text-sm ${playlist.id === selectedId ? 'text-gray-700' : 'text-gray-500'}`}
											>
												By {playlist.owner.display_name}
											</p>
										</div>
									</button>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				<div>
					<Label>From 1 to 10, how stressed are you?</Label>
					<Range id="range-steps" min="0" max="10" bind:value={stepValue} step="0.5" />
					<p>Value: {stepValue}</p>
				</div>
			</div>
			<Button on:click={() => checkDepression()}>Check My Depression</Button>
		</div>
	</div>
{:else if predictionLoading}
	{#await predictionPromise}
		<div
			class="max-w-2xl min-h-[120px] flex border rounded-xl items-center gap-x-4 p-4 mx-auto"
		>
			<Spinner />
			<div>
				<h1 class="text-xl font-bold">Did you know?</h1>
				<p>
					{depressionFacts[0].message}
				</p>
				<a href={depressionFacts[0].reference} class="text-sm underline text-blue-400">
					{depressionFacts[0].reference}
				</a>
			</div>
		</div>
		<div class="max-w-2xl text-center mx-auto mt-2">
			Please wait while we are predicting your depression level...
		</div>
	{:catch error}
		<p>Whoops, something went wrong :&#40;</p>
		<p>{error.message}</p>
	{/await}
{:else}
	<div class="mx-auto max-w-screen-xl flex flex-col items-center">
		<h1 class="text-2xl font-bold mb-2">Your Depression Card</h1>
		<div class="mx-auto border rounded-lg p-4 w-full max-w-xl mb-4">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{'aga'}
			</h5>
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{'aga'}
			</p>
			<p class="text-sm text-gray-400">
				{'aga'}
			</p>
		</div>
		<Button on:click={clearPrediction}>New Prediction</Button>
	</div>
{/if}

<!-- <h1>Welcome to SvelteKit</h1>
//
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

//
<h2>heo</h2>
//<button on:click={checkCORS}> // Test // </button> -->

<style>
	.active {
		background-color: #1ed760 !important;
	}
</style>
