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
							<h1>Welcome</h1>
						</div>
					</section>

					<div class="login_title">
						<ion-text>Full Name</ion-text>
					</div>

					<ion-item color="Main">
						<ion-input
							class="custom"
							placeholder="Enter your full name"
							v-model="name"
							required />
					</ion-item>

					<div class="login_title">
						<ion-text>Email</ion-text>
					</div>

					<ion-item color="Main" ref="item">
						<ion-input
							class="custom"
							placeholder="Enter your Email"
							v-model="email"
							@ionInput="validate"
							required />
						<ion-note slot="helper">Enter a valid email</ion-note>
						<ion-note slot="error">Invalid email</ion-note>
					</ion-item>

					<div class="login_title">
						<ion-text>Password</ion-text>
					</div>

					<ion-item color="Main">
						<ion-input
							class="custom"
							placeholder="Enter your password"
							v-model="password"
							type="password"
							required />
					</ion-item>

					<div class="login_title">
						<ion-text>Password confirmation</ion-text>
					</div>

					<ion-item color="Main">
						<ion-input
							class="custom"
							placeholder="Confirm your password"
							v-model="password2"
							type="password"
							required></ion-input>
					</ion-item>

					<ion-button color="sec" @click="registering()">
						Register
					</ion-button>

					<div class="login_reg">
						<ion-text>Already have an account?&nbsp;</ion-text>
						<span
							class="login_reg_highlight"
							@click="$router.push('/login')">
							Log in
						</span>
					</div>
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

import "@/style/register.css"

export default defineComponent({
	name: "RegisterPage",
	components: {
		IonButton,
		IonContent,
		IonPage,
		IonInput,
		IonText,
		IonItem,
		IonNote,
		IonList
	},
	data() {
		return {
			email: "",
			password: "",
			password2: "",
			name: ""
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
			const valid = this.validateEmail(value)
			valid
				? this.$refs.item.$el.classList.add("ion-valid")
				: this.$refs.item.$el.classList.add("ion-invalid")

			this.good = valid
		},
		async registerFunc() {
			await axios
				.get("http://localhost:26623/User/Register", {
					params: {
						mail: this.email,
						name: this.name,
						password: this.password
					}
				}) // Odoslanie requestu a potrebných dát o registráciu na backend pomocou axios knižnice
				.then((response) => {
					store.user.set(response.data) // nastavenie odpovedi s backendu do storu
					response.data.isOk == true // podmienka na overenie či registrovanie úspešne zbehlo
						? router.push("/home") // ak je podmienka pravdivá tak uživatela posunie na domovskú stránku
						: this.presentToastFail() // ak nieje podmienka pravdivá tak zobrazí error
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
		},

		async registering() {
			this.password === this.password2
				? await this.registerFunc()
				: this.presentToastFail()
		}
	}
})
</script>

<style scoped>
#container {
	text-align: center;
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}

#container strong {
	font-size: 20px;
	line-height: 26px;
}

#container p {
	font-size: 16px;
	line-height: 22px;
	color: #8c8c8c;
	margin: 0;
}

#container a {
	text-decoration: none;
}
</style>
