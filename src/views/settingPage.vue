<template>
	<ion-page>
		<ion-content fullscreen>
			<ion-header collapse="fade" class="toolbar">
				<ion-toolbar color="tet">
					<ion-buttons>
						<ion-menu-button color="light" />
					</ion-buttons>
					<ion-title>Nastavenia</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="setting_top_box">
				<ion-card color="tet">
					<ion-card-header>
						<ion-card-title>Your Full Name</ion-card-title>
					</ion-card-header>

					<ion-card-content
						><ion-input
							:clear-input="true"
							placeholder="Enter your name"
							v-model="this.fullname"></ion-input
					></ion-card-content>

					<ion-button
						class="sett_butt"
						fill="clear"
						@click="saveName()"
						>Save</ion-button
					>
				</ion-card>

				<ion-card color="tet">
					<ion-card-header>
						<ion-card-title>Your Email</ion-card-title>
					</ion-card-header>

					<ion-card-content
						><ion-input
							:clear-input="true"
							placeholder="Enter your email"
							v-model="this.email"></ion-input
					></ion-card-content>

					<ion-button
						class="sett_butt"
						fill="clear"
						@click="saveEmail()"
						>Save</ion-button
					>
				</ion-card>

				<ion-card color="tet">
					<ion-card-header>
						<ion-card-title>Your Password</ion-card-title>
					</ion-card-header>

					<ion-card-content type="password"
						>********</ion-card-content
					>

					<ion-button class="sett_butt" fill="clear" @click="move()"
						>Change</ion-button
					>
				</ion-card>

				<ion-card color="tet">
					<ion-card-header>
						<ion-card-title>Version</ion-card-title>
					</ion-card-header>

					<ion-card-content>1.0.0</ion-card-content>
				</ion-card>

				<!-- <ion-card color="dark">
					<ion-card-header>
						<ion-card-title>Theme</ion-card-title>
					</ion-card-header>

					<ion-card-content>
						<ion-toggle
							color="success"
							:checked="true"></ion-toggle>
					</ion-card-content>
				</ion-card> -->

				<!-- <ion-button color="danger" expand="block">Bug report</ion-button> -->
			</div>
			<Comp class="footer" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonMenuButton,
	IonInput
} from "@ionic/vue"
import store from "@/store"
import axios from "axios"

import "@/style/settings.css"
import Comp from "../views/MojUcet.vue"

export default defineComponent({
	name: "NastaveniaPage",
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonButton,
		IonCard,
		IonCardContent,
		IonCardHeader,
		IonCardTitle,
		IonMenuButton,
		IonInput,
		Comp
	},
	data() {
		return {
			email: "",
			fullname: "",
			token: "",
			ename: "",
			id: 2
		}
	},

	async mounted() {
		this.token = await store.token.get()

		const user = await store.user.get()
		this.email = user.email

		this.fullname = user.name + " " + user.surname

		//this.ename = user.devices[0].name
	},

	methods: {
		move() {
			this.$router.push("/password-change")
		},
		// async save() {
		// 	const token = await store.token.get()
		// 	axios
		// 		.post(
		// 			`device/${this.id}`,
		// 			{
		// 				name: this.ename
		// 			},
		// 			{
		// 				headers: {
		// 					Authorization: `Bearer ${token}`
		// 				}
		// 			}
		// 		)
		// 		.then(async (response) => {
		// 			response.data

		// 			const status = response.status

		// 			if (status == 200) {
		// 				this.ok = true
		// 				location.href = "/settings"
		// 				await store.info()
		// 			} else {
		// 				return
		// 			}
		// 		})
		// },
		async saveName() {
			const token = await store.token.get()
			const name = this.fullname.split(" ")

			axios
				.post("auth/info", {
					name: name[0],
					surname: name[name.length - 1],
					token: token
				})
				.then(async (response) => {
					response.data

					const status = response.status

					if (status == 200) {
						this.ok = true
						location.href = "/settings"
						await store.info()
					} else {
						return
					}
				})
		},
		async saveEmail() {
			const token = await store.token.get()

			axios
				.post("auth/info", {
					email: this.email,
					token: token
				})
				.then(async (response) => {
					response.data

					const status = response.status

					if (status == 200) {
						this.ok = true
						location.href = "/settings"
						await store.info()
					} else {
						return
					}
				})
		}
	}
})
</script>

<style style src="../style/settings.css" scoped></style>
