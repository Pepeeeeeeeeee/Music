<template>
	<ion-page>
		<ion-content color="dark" fullscreen>
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
							<h1>Reset hesla</h1>
						</div>
					</section>

					<div class="login_title">
						<ion-text>Email</ion-text>
					</div>

					<ion-item color="dark" lines="none" ref="item">
						<ion-input
							placeholder="Enter your Email"
							v-model="email"
							type="email"
							required
							@ionInput="validate" />
						<ion-note slot="helper">Enter a valid email</ion-note>
						<ion-note slot="error">Invalid email</ion-note>
					</ion-item>

					<div class="login_title">
						<ion-text>Kod</ion-text>
					</div>
					<ion-item color="dark" lines="none" ref="item">
						<ion-input
							placeholder="Code"
							v-model="code"
							autocomplete="one-time-code"
							required />
					</ion-item>

					<div class="login_title">
						<ion-text>Heslo</ion-text>
					</div>
					<ion-item color="dark" lines="none" ref="item">
						<ion-input
							placeholder="New Password"
							v-model="password"
							autocomplete="new-password"
							required />
					</ion-item>

					<ion-item color="dark" lines="none" ref="item">
						<ion-input
							placeholder="Repeat Password"
							v-model="password_confirmation"
							autocomplete="new-password"
							required />
					</ion-item>

					<ion-button color="success" @click="send()">
						Zmeniť
					</ion-button>
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
	IonNote
} from "@ionic/vue"
import axios from "axios"

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
			code: "",
			password: "",
			password_confirmation: ""
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
		},
		send() {
			axios
				.post("auth/reset", {
					email: this.email,
					code: this.code,
					password: this.password,
					password_confirmation: this.password_confirmation
				})
				.then((response) => {
					console.log(response)
				})
		}
	}
})
</script>
