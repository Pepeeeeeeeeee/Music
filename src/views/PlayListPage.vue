<template>
	<ion-page>
		<ion-header>
			<ion-toolbar class="toolbar" color="dark">
				<div class="home_header">
					<ion-buttons>
						<ion-menu-button color="Main" />
					</ion-buttons>
					<ion-searchbar
						class="customS"
						@click="$router.push('/search')"></ion-searchbar>
					<img class="aicon" src="../assets/icon.jpg" alt="icon" />
				</div>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<div class="mH">
				<div>
					<h1 class="titel">{{ this.PlayListName }}</h1>
				</div>
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
							<ion-label class="customI">{{ item }}</ion-label>
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
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonToolbar,
	IonList,
	IonMenuButton,
	IonItem,
	IonThumbnail,
	IonLabel,
	IonSearchbar
} from "@ionic/vue"

import "@/style/acc.css"
import store from "@/store"
import Comp from "../views/MojUcet.vue"

export default defineComponent({
	name: "NastaveniaPage",
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonPage,
		IonToolbar,
		IonMenuButton,
		IonList,
		IonItem,
		IonThumbnail,
		IonLabel,
		IonSearchbar,
		Comp
	},
	data() {
		return {
			PlayListName: "PlayList",
			items: reactive([]),
			SongItems: [
				{
					songName: "",
					songId: "",
					path: ""
				}
			]
		}
	},

	async mounted() {
		const temp = await store.playL.get()
		//console.log(temp)

		this.PlayListName = temp.name

		const generateItems = () => {
			const count = temp.songs.length - 1
			for (let i = 0; i < count + 1; i++) {
				this.items.push(`${temp.songs[i].name}`)
				console.log(this.items[i])
				const newobject = {
					songId: temp.songs[i].id,
					songName: temp.songs[i].name,
					path: temp.songs[i].path
				}
				this.SongItems.push(newobject)
			}
		}
		await generateItems()
	},
	methods: {
		async dothis(item) {
			let i = 0

			while (
				this.SongItems[i].songName != item &&
				i < this.SongItems.length - 1
			) {
				i++
			}

			//alert(this.SongItems[i])

			store.lastPlayed.set(this.SongItems[i])

			this.$router.push("/player")
		}
	}
})
</script>

<style style src="../style/playlist.css" scoped></style>
