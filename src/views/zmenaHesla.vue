<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-title />
		</ion-header>

		<ion-content color="dark" :fullscreen="true">
			<div id="container">
				<ion-list>
					<section class="login_header">
						<div class="login_main_titles">
							<h1 class="login_top">Music</h1>
						</div>

						<div class="login_logo_box">
							<img
								class="login_logo"
								src="../assets/logo.jpg"
								alt="logo" />
						</div>

						<div class="login_main_titles">
							<h1>Zmena Hesla</h1>
						</div>
					</section>

					<div class="login_title">
						<ion-text>Stare heslo</ion-text>
					</div>

					<ion-item color="dark">
						<ion-input
							placeholder="Enter your old password"
							v-model="oldPass"
							required />
					</ion-item>

					<div class="login_title">
						<ion-text>Nove heslo</ion-text>
					</div>

					<ion-item color="dark">
						<ion-input
							placeholder="Enter your new password"
							v-model="newPass"
							required></ion-input>
					</ion-item>

					<div class="login_title">
						<ion-text>Potvrdte nove heslo</ion-text>
					</div>

					<ion-item color="dark">
						<ion-input
							placeholder="Confirm your new password"
							v-model="newPassConf"
							required></ion-input>
					</ion-item>

					<ion-button color="success" @click="save()"
						>Zmenit</ion-button
					>
				</ion-list>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonText,
	IonTitle,
	IonInput,
	IonItem,
	IonList
} from "@ionic/vue"
import store from "@/store"
import "@/style/login.css"

export default defineComponent({
	components: {
		IonButton,
		IonContent,
		IonHeader,
		IonPage,
		IonText,
		IonTitle,
		IonInput,
		IonItem,
		IonList
	},

	data() {
		return {
			oldPass: "",
			newPass: "",
			newPassConf: "",
			token: ""
		}
	},

	methods: {
		save() {
			store
				.post("auth/info", {
					password_current: this.oldPaas,
					password: this.newPass,
					password_confirmation: this.newPassConf
				})
				.then((response) => {
					location.href = "/settings"
				})
		}
	}
})
</script>
