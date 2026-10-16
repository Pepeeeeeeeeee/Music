<template>
	<ion-page>
		<ion-content color="Main" fullscreen>
			<div id="container">
				<ion-list>
					<section class="login_header">
						<div class="login_logo_box">
							<img
								class="login_logo"
								src="../assets/logo.jpg"
								alt="logo" />
						</div>

						<div class="login_main_titles">
							<h1>Welcome Back</h1>
						</div>
					</section>

					<div class="login_title">
						<ion-text>Email</ion-text>
					</div>

					<ion-item lines="none" ref="item">
						<ion-input
							class="custom"
							placeholder="Enter your Email/Username"
							v-model="email"
							type="email"
							required
							@ionInput="validate" />
						<ion-note slot="helper">Enter a valid email</ion-note>
						<ion-note slot="error">Invalid email</ion-note>
					</ion-item>

					<div class="login_title">
						<ion-text>Password</ion-text>
					</div>

					<ion-item lines="none">
						<ion-input
							class="custom"
							placeholder="Enter you password"
							v-model="password"
							type="password"
							required></ion-input>
					</ion-item>

					<ion-button color="sec" @click="login()">
						Log in</ion-button
					>

					<div class="login_reg">
						<ion-text>Don't have an account yet?</ion-text>
						<span
							class="login_reg_highlight"
							@click="$router.push('/register')">
							Register
						</span>
					</div>

					<!-- <div class="login_reg">
						<ion-text @click="$router.push('/forgot-password')">
							Forgot
						</ion-text>
						<span class="login_reg_highlight"> password?</span>
					</div> -->
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
	IonPage,
	IonText,
	IonInput,
	IonItem,
	IonList,
	IonNote,
	toastController
} from "@ionic/vue"
import axios from "axios"
import store from "@/store"
import router from "@/router"
import "@/style/login.css"

export default defineComponent({
	components: {
		IonButton,
		IonContent,
		IonPage,
		IonText,
		IonInput,
		IonItem,
		IonList,
		IonNote
	},
	data() {
		return {
			email: "",
			password: "",
			token: "",
			good: true,
			ok: false
		}
	},

	methods: {
		validateEmail(email: string) {
			return email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
		},
		validate(ev) {
			const value = ev.target.value

			this.$refs.item.$el.classList.remove("ion-valid")
			this.$refs.item.$el.classList.remove("ion-invalid")

			if (value === "") return

			this.validateEmail(value)
				? this.$refs.item.$el.classList.add("ion-valid")
				: this.$refs.item.$el.classList.add("ion-invalid")
			this.email = value
		},

		async presentToast() {
			const toast = await toastController.create({
				message: "Nesprávne heslo alebo email",
				duration: 1500,
				cssClass: "custom-toast",
				position: "top"
			})
			if (this.ok != true) {
				await toast.present()
			}
		},

		async login() {
			await axios
				.get("http://localhost:26623/User/Login", {
					params: { uName: this.email, password: this.password }
				}) // Odoslanie požiadavky a potrebných dát na prihlásenie užívateľa backendu pomocou axios knižnice
				.then((response) => {
					store.user.set(response.data) // nastavenie odpovedi z backendu do storu
					response.data.isOk == true // podmienka na overenie či prihlásenie úspešne zbehlo
						? router.push("/home") // ak je podmienka pravdivá tak užívateľa posunie na domovskú stránku
						: this.presentToastFail() // ak nie je podmienka pravdivá tak zobrazí error
				})
		},

		async presentToastFail(position: "top") {
			const toast = await toastController.create({
				message: "Login failed",
				duration: 1500,
				position: position
			})

			await toast.present()
			return null
		}
	}
})
</script>
