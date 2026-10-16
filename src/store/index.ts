import router from "@/router"
import axios, { AxiosResponse } from "axios"
import { StorageValue } from "vvic-utils/types"
import {
	User,
	RegisterUser,
	LoginUser,
	Songs,
	Playlist,
	Playlists,
	LastPlayed,
	AllLastPlayed,
	StoreFavorites
} from "./types"
import Functions from "./functions"

export class Storage {
	static readonly token = new StorageValue<string>("token")
	static readonly user = new StorageValue<User>("user")
	static readonly sonk = new StorageValue<Songs>("song")
	static readonly playL = new StorageValue<Playlist>("playL")
	static readonly playLs = new StorageValue<Playlists>("playLs")
	static readonly lastPlayed = new StorageValue<LastPlayed>("lastPlayed")
	static readonly allLastPlayed = new StorageValue<AllLastPlayed>("allLastPlayed")
	static readonly favorites = new StorageValue<StoreFavorites>("favorites")

	public static async login(data: LoginUser) {
		const res = await Functions.login(data)
		if (res.data.data.user.isOk == true) {
			await Storage.user.set(res.data.data.user as User)
			await Storage.token.set(res.data.data.token)
			router.push("/home")
		}
	}

	public static async register(data: RegisterUser) {
		const res = await Functions.register(data)
		await Storage.user.set(res.data.data.user as User)
		await Storage.token.set(res.data.data.token)
	}

	/**
	 * Logs out the user and removes data from store
	 */
	public static async logout() {
		await Functions.logout(await Storage.token.get())
		await Storage.rmUserData()
		await router.push({ name: "Login" })
	}

	private static async rmUserData() {
		await Storage.user.remove()
		await Storage.token.remove()
		return false
	}

	public static async info() {
		const res = await Functions.info(await Storage.token.get())
		await Storage.user.set(res.data.data.user as User)
	}

	public static async song() {
		const res = await Functions.songg()
		await Storage.sonk.set(res.data as Songs)
	}

	public static async pList(id) {
		const res = await Functions.playList(id)
		await Storage.playL.set(res.data as Playlist)
	}

	public static async pLists() {
		const res = await Functions.playLists()
		await Storage.playLs.set(res.data as Playlists)
	}

	public static async lP(id) {
		const res = await Functions.lastPlayed(id)
		await Storage.lastPlayed.set(res.data as LastPlayed)
	}

	public static async allLP() {
		const res = await Functions.allLastPlayed()
		await Storage.allLastPlayed.set(res.data as AllLastPlayed)
	}

	public static async getFavorites() {
		const res = await Functions.favorites()
		await Storage.favorites.set(res.data as StoreFavorites)
	}

	private static async refresh() {
		const res = await Functions.refresh(await Storage.token.get())
		await Storage.user.set(res.data.data.user as User)
		await Storage.token.set(res.data.data.token)
	}

	/**
	 * Returns a boolean indicating if the user is logged in
	 *
	 * ```ts
	 * import store from "@/store"
	 * await store.isLoggedIn()
	 * ```
	 */
	public static async isLoggedIn(): Promise<boolean> {
		if (!(await Storage.token.get())) return Storage.rmUserData()

		return Storage.info()
			.then(() => true)
			.catch(async () => {
				try {
					await Storage.refresh()
					return Storage.info().then(() => true)
				} catch (err) {
					return Storage.rmUserData()
				}
			})
	}

	public static async getData<T>(url: string) {
		const token = await Storage.token.get()
		return new Promise<T>((resolve, reject) => {
			axios
				.get<{ data: T }>(url, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					resolve(res.data.data)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	public static async post<T>(url: string, data: unknown) {
		const token = await Storage.token.get()
		return new Promise<AxiosResponse<{ data: T }>>((resolve, reject) => {
			axios
				.post<{ data: T }>(url, data, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}

export default Storage
