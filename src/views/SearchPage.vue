<template>
	<ion-page>
		<ion-header translucent>
			<ion-toolbar color="none">
				<div class="home_header">
					<ion-buttons>
						<ion-menu-button class="customB"></ion-menu-button>
					</ion-buttons>
					<ion-searchbar
						class="customS"
						v-on:keyup.enter="search"
						v-model="searchTxt"></ion-searchbar>
					<img class="aicon" src="../assets/icon.jpg" alt="icon" />
				</div>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="false" color="Main" class="content">
			<div class="mH">
				<ion-list>
					<div color="tet">
						<ion-item
							v-for="item in items"
							:key="item.id"
							button
							@click="dothis(item)">
							<ion-thumbnail slot="start">
								<img alt="icon" src="../assets/icon.jpg" />
							</ion-thumbnail>
							<ion-label>{{ item }}</ion-label>
						</ion-item>
					</div>
				</ion-list>
			</div>
		</ion-content>
		<Comp />
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import {
	IonContent,
	IonHeader,
	IonPage,
	IonItem,
	IonList,
	IonLabel,
	IonSearchbar,
	IonThumbnail,
	IonToolbar,
	IonButtons,
	IonMenuButton
} from "@ionic/vue"
import store from "@/store"
import axios from "axios"
import Comp from "../views/MojUcet.vue"

export default defineComponent({
	name: "SearchPage",
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonItem,
		IonList,
		IonLabel,
		IonSearchbar,
		IonButtons,
		IonThumbnail,
		IonToolbar,
		IonMenuButton,
		Comp
	},
	data() {
		return {
			searchTxt: "",
			song: "",
			YTItems: [
				{
					songName: "",
					songId: "",
					path: ""
				}
			],
			user: undefined,
			myFunc: Comp,
			index: 0,
			items: reactive([]),
			firstLoad: Boolean
		}
	},
	async mounted() {
		await store.allLP()
		const temp = await store.allLastPlayed.get()

		const generateItems = () => {
			const count = temp.length - 1
			for (let i = 0; i < count + 1; i++) {
				this.items.push(`${temp[i].name}`)
				const newobject = {
					songName: temp[i].name,
					songId: temp[i].url,
					path: temp[i].path
				}
				this.YTItems.push(newobject)
			}
		}
		this.firstLoad = true

		generateItems()
	},
	methods: {
		async search() {
			this.firstLoad = false
			this.items = [] // prečistenie listu
			this.YTItems = [{}] // prečistenie listu objektov
			let data // zadefinovanie lokálnej premennej "dáta"
			const querry = this.searchTxt.replaceAll(/ /gi, "+") // sformátovanie užívateľom zadané vyhľadávanie
			await axios
				.get(
					`https://www.googleapis.com/youtube/v3/search?part=snippet
					&q=${querry}
					&type=video
					&maxResults=25
					&key=**hidden**`
				) // zavolanie YouTube Data API s požiadavkami pomocou knižnice axios
				.then((response) => {
					data = JSON.parse(JSON.stringify(response))
					for (let i = 0; i <= response.data.items.length - 1; i++) {
						const newobject = {
							//priradenie získaných dát do lokálneho objektu
							songId: response.data.items[i].id.videoId,
							songName: response.data.items[i].snippet.title,
							path: "none"
						}
						this.YTItems.push(newobject) // priradenie lokálneho objektu do globálneho objektu
					}
				})

			this.showContent() // zobrazenie získaných dát
		},

		async dothis(item) {
			let i = 0

			while (
				this.YTItems[i].songName != item &&
				i < this.YTItems.length - 1
			) {
				i++
			}

			const j = this.YTItems.length - 1

			//console.log(JSON.stringify(this.YTItems[i]))
			if (this.firstLoad == false) {
				await axios
					.get("http://localhost:26623/Player/DownloadAndConvertV2", {
						params: {
							songName: this.YTItems[i].songName,
							videoUrl: this.YTItems[i].songId
						}
					})
					.then((response) => {
						const newobject = {
							songName: this.YTItems[i].songName,
							songId: this.YTItems[i].url,
							path: response.data
						}
						this.YTItems.push(newobject)

						store.sonk.set(response.data)
						store.lastPlayed.set(this.YTItems[j + 1])

						this.$router.push("/player")
					})
			} else {
				store.sonk.set(this.YTItems[i])
				store.lastPlayed.set(this.YTItems[i])

				this.$router.push("/player")
			}
		},

		showContent() {
			//console.log("\n")
			alert(this.YTItems[1].songId + ", " + this.YTItems[1].songName)
			const generateItems = () => {
				const count = this.YTItems.length - 1
				for (let i = 1; i < count + 1; i++) {
					this.items.push(`${this.YTItems[i].songName}`)
				}
			}

			generateItems()
		}
	}
})
</script>

<style src="../style/search.css" scoped></style>
