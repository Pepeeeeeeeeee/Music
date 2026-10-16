<template>
	<ion-page class="page">
		<ion-header translucent>
			<ion-toolbar color="none">
				<div class="home_header">
					<ion-buttons>
						<ion-menu-button class="customB"></ion-menu-button>
					</ion-buttons>
					<ion-searchbar
						class="customS"
						@click="$router.push('/search')"></ion-searchbar>
					<img class="aicon" src="../assets/icon.jpg" alt="icon" />
				</div>
			</ion-toolbar>
		</ion-header>

		<ion-content fullscreen class="ion-padding" id="home_back">
			<ion-refresher slot="fixed" @ionRefresh="handleRefresh">
				<ion-refresher-content />
			</ion-refresher>

			<div><h1 class="titel">Last Played</h1></div>

			<div class="played" color="tet">
				<p class="text">LAST PLAYED</p>
				<ion-item button :detailIcon="ellipsisHorizontalOutline" @click="playSong(0)">
					<ion-thumbnail slot="start">
						<img alt="icon" src="../assets/icon.jpg" />
					</ion-thumbnail>
					<ion-label class="customI">{{ LastSong[0] }}</ion-label>
				</ion-item>
				<ion-item button :detailIcon="ellipsisHorizontalOutline" @click="playSong(1)">
					<ion-thumbnail slot="start">
						<img alt="icon" src="../assets/icon.jpg" />
					</ion-thumbnail>
					<ion-label class="customI">{{ LastSong[1] }}</ion-label>
				</ion-item>
				<ion-item button :detailIcon="ellipsisHorizontalOutline" @click="playSong(2)">
					<ion-thumbnail slot="start">
						<img alt="icon" src="../assets/icon.jpg" />
					</ion-thumbnail>
					<ion-label class="customI">{{ LastSong[2] }}</ion-label>
				</ion-item>
				<ion-item button :detailIcon="ellipsisHorizontalOutline" @click="playSong(3)">
					<ion-thumbnail slot="start">
						<img alt="icon" src="../assets/icon.jpg" />
					</ion-thumbnail>
					<ion-label class="customI">{{ LastSong[3] }}</ion-label>
				</ion-item>
				<ion-item button :detailIcon="ellipsisHorizontalOutline" @click="playSong(4)">
					<ion-thumbnail slot="start">
						<img alt="icon" src="../assets/icon.jpg" />
					</ion-thumbnail>
					<ion-label class="customI">{{ LastSong[4] }}</ion-label>
				</ion-item>
			</div>

			<div><h1 class="titel">Your Playlists</h1></div>
			<div class="cont">
				<div class="comp">
					<ion-card class="cardd" @click="goToPlayist(0)">
						<img alt="icon" src="../assets/icon.jpg" />
						<ion-card-header>
							<ion-card-title class="cardTitle">{{
								PlayList[0]
							}}</ion-card-title>
						</ion-card-header>
					</ion-card>
					<ion-card @click="goToPlayist(1)">
						<img alt="icon" src="../assets/icon.jpg" />
						<ion-card-header>
							<ion-card-title class="cardTitle">{{
								PlayList[1]
							}}</ion-card-title>
						</ion-card-header>
					</ion-card>
				</div>
				<div class="comp">
					<ion-card @click="goToPlayist(2)">
						<img alt="icon" src="../assets/icon.jpg" />
						<ion-card-header>
							<ion-card-title class="cardTitle">{{
								PlayList[2]
							}}</ion-card-title>
						</ion-card-header>
					</ion-card>
					<ion-card @click="goToPlayist(3)">
						<img alt="icon" src="../assets/icon.jpg" />
						<ion-card-header>
							<ion-card-title class="cardTitle">{{
								PlayList[3]
							}}</ion-card-title>
						</ion-card-header>
					</ion-card>
				</div>
			</div>
		</ion-content>
		<Comp />
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonToolbar,
	IonRefresher,
	IonRefresherContent,
	IonSearchbar,
	IonItem,
	IonLabel,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonThumbnail
} from "@ionic/vue"

import {
	playBackOutline,
	playOutline,
	playForwardOutline,
	ellipsisHorizontalOutline
} from "ionicons/icons"
import store from "@/store"
import Comp from "../views/MojUcet.vue"
import router from "@/router"
export default defineComponent({
	name: "MainPage",
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonMenuButton,
		IonPage,
		IonToolbar,
		IonRefresher,
		IonRefresherContent,
		IonSearchbar,
		IonItem,
		IonLabel,
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonThumbnail,
		Comp
	},

	setup() {
		return {
			playBackOutline,
			playOutline,
			playForwardOutline,
			ellipsisHorizontalOutline
		}
	},

	data() {
		return {
			LastSong: [],
			PlayList: [],
			isOpen: Boolean,
			songTitle: "Song.mp3",
			SongItems: [
				{
					songName: "",
					songId: "",
					path: ""
				}
			],
			PlayLists: [
				{
					Name: "",
					Id: ""
				}
			]
		}
	},

	async mounted() {
		//Lifecycle hook mounted - kód v tejto funkcii sa spustí ihneď po nasadení DOM elementov (DOM elementy predstavujú akékoľvek prvky HTML.)
		await store.pLists() //zavolanie funkcie na získanie playlistov
		const pl = await store.playLs.get() //uloženie získaných dát do lokálnej premennej

		await store.allLP()
		const lp = await store.allLastPlayed.get()

		for (let i = 0; i <= pl.length - 1; i++) {
			this.PlayList[i] = pl[i].name //priradenie získaných dát k jednému zo zobrazených playlistov
			const newobject = {
				Id: pl[i].id,
				Name: pl[i].name
			}
			this.PlayLists.push(newobject)
		}

		for (let i = 0; i <= lp.length - 1; i++) {
			this.LastSong[i] = lp[i].name
			const newobject = {
				songId: lp[i].url,
				songName: lp[i].name,
				path: lp[i].path
			}
			this.SongItems.push(newobject)
		}
	},

	methods: {
		handleRefresh() {
			setTimeout(() => {
				this.$router.go()
			}, 800)
		},

		playSong(i) {
			//console.log(JSON.stringify(this.SongItems[i + 1]))

			store.sonk.set(this.SongItems[i + 1])
			store.lastPlayed.set(this.SongItems[i + 1])

			this.$router.push("/player")
		},

		async goToPlayist(i) {
			//console.log(JSON.stringify(this.PlayLists[i + 1]))

			await store.pList(this.PlayLists[i + 1].Id)

			router.push("/playlist")
		},

		start() {
			router.push("/player")
		}
	}
})
</script>

<style src="@/style/home.css" scoped></style>
