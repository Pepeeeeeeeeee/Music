export interface Resource {
	id?: number
	type?: string
}

export interface Device {
	serial: string
	name: string
}

export interface User extends Resource {
	type: "user"
	username?: string
	email: string
	name?: string
	surname?: string
	isOk?: boolean
}

export class LoginUser {
	login = ""
	password = ""
}

export class RegisterUser extends LoginUser {
	name = ""
	username = ""
	email = ""
	password_confirmation = ""
}

export interface StoreUserData {
	user: User
	token: string
}

export interface Player {
	isPlaying: boolean
}

export interface Songs {
	song_id: string
	song_name: string
	url: string
	path: string
}

export interface CurrentSong extends Player, Songs {
	time_elapsed: number
}

export interface StoreSongData {
	song: Songs
}

export interface Playlist {
	name: string
	id: number
	items: [inf: Songs]
}

export interface StorePlaylistData {
	playlist: Playlist
}

export interface Playlists extends Playlist {
	playLists: []
}

export interface StorePlaylistsData {
	playlists: Playlists
}

export interface LastPlayed extends Songs {
	song: Songs
}

export interface AllLastPlayed extends Songs {
	song: [Songs]
}

export interface StoreAllLastPlayed {
	songs: [AllLastPlayed]
}

export interface StoreLastPlayed {
	song: LastPlayed
}

export interface Favorites {
	songs: [Songs]
}

export interface StoreFavorites {
	songs: Favorites
}
//
// export interface NextSong extends Player {
// 	song_id: string
// 	name: string
// 	url: string
// }
