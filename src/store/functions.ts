import axios from "axios"
import type {
	LoginUser,
	StoreUserData,
	RegisterUser,
	StoreSongData,
	StorePlaylistData,
	StorePlaylistsData,
	StoreLastPlayed,
	StoreAllLastPlayed,
	StoreFavorites
} from "./types"

export class Functions {
	static async login(data: LoginUser) {
		return await axios.post<{ data: StoreUserData }>("User/Login", data)
	}

	static async register(data: RegisterUser) {
		return await axios.post<{ data: StoreUserData }>("auth/signup", data)
	}

	static async info(token: string) {
		return await axios.get<{ data: StoreUserData }>("auth/info", {
			headers: { Authorization: `Bearer ${token}` }
		})
	}

	static async logout(token: string) {
		return await axios.post("auth/invalidate", null, {
			headers: { Authorization: `Bearer ${token}` }
		})
	}

	static async refresh(token: string) {
		return await axios.post("auth/refresh", null, {
			headers: { Authorization: `Bearer ${token}` }
		})
	}

	static async songg() {
		return await axios.get<{ data: StoreSongData }>("/Player/Song", {})
	}

	static async playList(id: number) {
		return await axios.get<{ data: StorePlaylistData }>(
			`Player/Playlist`,
			{ params: { idPL: id } }
		)
	}

	static async playLists() {
		return await axios.get<{ data: StorePlaylistsData }>(
			"Player/PlayLists",
			{}
		)
	}

	static async lastPlayed(id: number) {
		return await axios.get<{ data: StoreLastPlayed }>(
			"Player/LastPlayed",
			{params: { idLP: id } }
		)
	}

	static async allLastPlayed() {
		return await axios.get<{ data: StoreAllLastPlayed }>(
			"Player/AllLastPlayed",
			{}
		)
	}

	static async favorites() {
		return await axios.get<{ data: StoreFavorites }>(
			"Player/GetFavorites",
			{}
		)
	}
}

export default Functions
