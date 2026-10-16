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
				<div><h1 class="titel">Favorites</h1></div>
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
			items: reactive([]),
			SongItems: [
				{
					songName: "",
					songPath: ""
				}
			]
		}
	},
	async mounted() {

		await store.getFavorites()
		const temp = await store.favorites.get()

		const generateItems = () => {
			const count = temp.length - 1
			for (let i = count; i >= 0; i--) {
				this.items.push(`${temp[i].name}`)
				const newobject = {
					songPath: temp[i].path,
					songName: temp[i].name
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

			store.sonk.set(this.SongItems[i])

			this.$router.push("/player")
		}
	}
})
</script>

<style style src="../style/acc.css" scoped></style>
