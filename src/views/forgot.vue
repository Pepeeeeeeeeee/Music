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
							<h1>Zabudnuté heslo</h1>
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

					<ion-button color="success" @click="send()">
						Odoslať
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
			email: ""
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
				.post("auth/forgot", { email: this.email })
				.then((response) => {
					this.$router.push({ name: "Reset Password" })
				})
		}
	}
})
</script>
