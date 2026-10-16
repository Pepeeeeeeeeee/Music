<!-- eslint-disable no-var -->
<template>
	<ion-page class="page">
		<ion-header class="heder">
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
		<ion-content>
			<div><h1 class="titel">Your Playlists</h1></div>
			<div class="cont">
				<div class="comp">
					<ion-card
						class="carddd"
						v-for="item in items"
						:key="item.id"
						@click="openPlayList(item)"
						button>
						<img alt="icon" src="../assets/icon.jpg" />
						<ion-card-header class="cardT">
							<ion-card-title class="cardT">{{
								item
							}}</ion-card-title>
						</ion-card-header>
					</ion-card>
				</div>
			</div>

			<ion-fab
				slot="fixed"
				vertical="bottom"
				horizontal="end"
				@click="openAlertController"
				class="fab">
				<ion-fab-button>
					<ion-icon :icon="add"></ion-icon>
				</ion-fab-button>
			</ion-fab>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonToolbar,
	IonSearchbar,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonFab,
	IonFabButton,
	IonIcon,
	alertController,
	toastController
} from "@ionic/vue"

import {
	playBackOutline,
	playOutline,
	playForwardOutline,
	ellipsisHorizontalOutline,
	add
} from "ionicons/icons"
// import { refresh } from "ionicons/icons"
import store from "@/store"
import axios from "axios"
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
		IonSearchbar,
		IonCard,
		IonCardHeader,
		IonCardTitle,
		Comp,
		IonFab,
		IonFabButton,
		IonIcon
	},

	setup() {
		return {
			playBackOutline,
			playOutline,
			playForwardOutline,
			ellipsisHorizontalOutline,
			add
		}
	},

	data() {
		return {
			items: reactive([]),
			name: "",
			pLs: [
				{
					playLName: "",
					playLId: ""
				}
			]
		}
	},

	async mounted() {
		const pl = await store.playLs.get()
		//console.log(pl)

		console.log("\n")
		const generateItems = () => {
			const count = pl.length - 1
			for (let i = 0; i < count + 1; i++) {
				this.items.push(`${pl[i].name}`)
				const newobject = {
					playLId: pl[i].id,
					playLName: pl[i].name
				}
				this.pLs.push(newobject)
			}
		}

		generateItems()
	},

	methods: {
		handleRefresh() {
			setTimeout(() => {
				this.$router.go()
			}, 800)
		},

		show() {
			const a = 9
		},

		async openAlertController() {
			const alert = await alertController.create({
				header: "Name your playlist:",
				buttons: [ //tlačidlá
					{
						text: "Cancel",
						role: "cancel"
					},
					{
						text: "OK",
						role: "confirm"
					}
				],
				inputs: [ //pole pre vyplnenie mena playlistu
					{
						placeholder: "Name"
					}
				]
			})

			await alert.present() // zobrazenie okna

			const result = await alert.onDidDismiss() //získanie dát z okna a priradenie hodnôt do lokálnej premennej
			const resultData = result.data.values[0]
			resultData == undefined // podmienka pre kontrolu či užívateľ vyplnil pole
				? this.presentToastFail() //ak nie, zobrazí sa error
				: this.name = resultData //ak áno, nastaví sa premnná používaná pri vytváraní playlistu

			result.role == "confirm" // podmienka pre kontrolu či užívateľ stlačil tlačidlo "confirm"
				? await this.cratePlayList() //ak áno, zavolá sa funkcia na vytvorenie playlistu
				: this.presentToastFail() //ak nie, zobrazí sa error
		},

		async presentToastSuccess(position: "top") {
			const toast = await toastController.create({
				message: "PlayList created succesfully",
				duration: 1500,
				position: position
			})

			await toast.present()
		},

		async presentToastFail(position: "top") {
			const toast = await toastController.create({
				message: "Creating PlayList failed",
				duration: 1500,
				position: position
			})

			await toast.present()
			return null
		},

		async cratePlayList() {
			await axios
				.get("http://localhost:26623/Player/CreatePlayList", {
					params: {
						name: this.name
					}
				})
				.then((response) => {
					this.items.push(this.name)
					response.status == 200
						? this.presentToastSuccess()
						: this.presentToastFail()
				})
		},

		async openPlayList(item) {
			let i = 0

			while (this.pLs[i].playLName != item && i < this.pLs.length - 1) {
				i++
			}

			//console.log(this.pLs[i].playLId)

			await store.pList(this.pLs[i].playLId)

			router.push("/playlist")
		}
	}
})
</script>

<style src="@/style/pls.css" scoped></style>
