<template>
	<ion-page>
		<ion-header translucent>
			<ion-toolbar color="none">
				<div class="home_header">
					<ion-buttons
						@click="$router.go(-1)"
						style="font-size: x-large"
						>{{ this.back }}
					</ion-buttons>
				</div>
			</ion-toolbar>
		</ion-header>

		<ion-content class="ion-padding">
			<div class="text_modalpage">
				<img
					class="img_music_main"
					src="../assets/icon.jpg"
					alt="icon" />
			</div>
			<div class="play_page">
				<div class="song_title">
					{{ songTitle }}
				</div>
				<!-- controls -->
				<audio id="player" autoplay>
					<source type="audio/mpeg" />
				</audio>
				<div class="time">
					<!-- Display track bar -->
					<input
						class="trackbar"
						type="range"
						min="0"
						:max="this.duration"
						v-model="this.currentTime"
						@input="seekSong" />
					<!-- Display current time and duration -->
					<div>
						{{ formatTime(this.currentTime) }} /
						{{ formatTime(this.duration) }}
					</div>
				</div>
				<button class="button_play" @click="show()">
					<ion-icon
						class="button_play"
						:icon="playBackOutline"
						slot="icon-only"
						button
						color="secondary"
						size="large"
						aria-label="back"></ion-icon>
				</button>
				<button class="button_play">
					<ion-icon
						id="icon"
						class="button_play"
						:icon="playOutline"
						slot="icon-only"
						button
						color="secondary"
						size="large"
						aria-label="back"
						@click="playpls()"></ion-icon>
				</button>
				<button class="button_play">
					<ion-icon
						class="button_play"
						:icon="playForwardOutline"
						slot="icon-only"
						button
						color="secondary"
						size="large"
						aria-label="back"></ion-icon>
				</button>
				<div class="addButtons">
					<button class="button_play" @click="addToFavorites()">
						<ion-icon
							class="button_play"
							:icon="heartOutline"
							slot="icon-only"
							button
							color="secondary"
							size="large"
							aria-label="back"></ion-icon>
					</button>
					<button class="button_play" @click="openAlertController()">
						<ion-icon
							class="button_play"
							:icon="addCircleOutline"
							slot="icon-only"
							button
							color="secondary"
							size="large"
							aria-label="back"></ion-icon>
					</button>
				</div>
				<div class="volbarDiv">
					<input
						class="volbar"
						type="range"
						min="0"
						max="100"
						v-model="this.currentVolume"
						@input="setVol" />
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonPage,
	IonToolbar,
	IonIcon,
	alertController
} from "@ionic/vue"

import {
	playBackOutline,
	playOutline,
	playForwardOutline,
	heartOutline,
	addCircleOutline,
	play
} from "ionicons/icons"

import store from "@/store"
import axios from "axios"

export default defineComponent({
	name: "PlayerPage",
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonPage,
		IonToolbar,
		IonIcon
	},

	data() {
		return {
			songTitle: "This is a Song Title",
			url: "",
			urlId: "",
			user: store.user.get(),
			isPlaying: true,
			time: 20000,
			currentTime: 0,
			duration: 0,
			currentVolume: 0.6,
			audio: document.getElementById("player"),
			back: "<"
		}
	},

	setup() {
		return {
			playBackOutline,
			playOutline,
			playForwardOutline,
			heartOutline,
			addCircleOutline
		}
	},

	async mounted() {
		const temp = await store.sonk.get()
		this.urlId = await store.lastPlayed.get()

		//console.log(temp)
		//console.log(this.urlId)

		temp.songName == undefined //podmienka pre skontrolovanie či premenná v hlavnom zdroji existuje
			? this.songTitle = this.urlId.songName //ak nie, bude použitý druhý zdroj
			: this.songTitle = temp.songName// inak bude použitý hlavný zdroj

		temp.songPath == undefined
			? this.url = this.urlId.path
			: this.url = temp.songPath

		this.audio = await new Audio(this.url) //priradenie získanej audio skladby
		this.audio.onloadedmetadata = () => {
			this.duration = Math.floor(this.audio.duration) //zadefinovanie trvania skladby
		}
		this.audio.volume = 0.6 //východzie nastavenie hlasitosti
		this.currentVolume = 60
		const playpls = () => {
			if (this.isPlaying == true) {
				this.audio.addEventListener("timeupdate", () => {
					this.currentTime = Math.floor(this.audio.currentTime)
				})

				this.audio.play()
			}
		}

		await playpls()
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

		playpls() {
			if (this.isPlaying == false) {
				this.audio.addEventListener("timeupdate", () => {
					this.currentTime = Math.floor(this.audio.currentTime)
				})

				this.audio.play()
				this.isPlaying = true
			} else {
				this.audio.pause()
				this.currentTime = this.audio.currentTime
				this.isPlaying = false
			}
		},

		// Seek to the specified time when the user interacts with the track bar
		seekSong() {
			this.audio.currentTime = this.currentTime
		},
		setVol() {
			this.audio.volume = this.currentVolume / 100
		},
		// Format time in MM:SS format
		formatTime(time) {
			const minutes = Math.floor(time / 60)
			const seconds = Math.floor(time % 60)
			return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
		},

		async openAlertController() {
			const temp = await store.playLs.get()
			//console.log(temp)

			let inp = [
				{
					label: "",
					type: "radio",
					value: 0
				}
			]

			for (let i = 0; i < temp.length; i++) {
				const newobject = {
					label: temp[i].name,
					type: "radio",
					value: temp[i].id
				}

				inp.push(newobject)
			}

			inp = inp.slice(1)

			const alert = await alertController.create({
				header: "Select playlist:",
				buttons: [
					{
						text: "Cancel",
						role: "cancel"
					},
					{
						text: "OK",
						role: "confirm"
					}
				],
				inputs: inp
			})

			await alert.present()

			const result = await alert.onDidDismiss()
			const resultData = result.data
			//console.log(resultData.values)

			await axios.get("http://localhost:26623/Player/AddToPlaylist", {
				params: {
					id: resultData.values,
					url: this.urlId.songId,
					path: this.url
				}
			})
		},

		async addToFavorites() {
			//console.log(`${this.songTitle}, ${this.urlId.songId}, ${this.url}`)
			await axios.get("http://localhost:26623/Player/AddToFavorites", {
				params: {
					name: this.songTitle,
					url: this.urlId.songId,
					path: this.url
				}
			})
		}
	}
})
</script>

<style src="@/style/player.css" scoped></style>
