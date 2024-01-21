export interface SpotifyPlaylist {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: Item[];
}

export interface Item {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Image {
	url: string;
	height: number;
	width: number;
}

export interface Owner {
	external_urls: ExternalUrls2;
	followers: Followers;
	href: string;
	id: string;
	type: string;
	uri: string;
	display_name: string;
}

export interface ExternalUrls2 {
	spotify: string;
}

export interface Followers {
	href: string;
	total: number;
}

export interface Tracks {
	href: string;
	total: number;
}
