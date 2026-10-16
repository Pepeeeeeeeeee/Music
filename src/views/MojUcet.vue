<template>
	<ion-footer color="tet" class="footer">
		<ion-toolbar color="tet" @click="$router.push('/player')">
			<ion-thumbnail slot="start">
				<img alt="icon" src="../assets/icon.jpg" />
			</ion-thumbnail>
			<ion-title>{{ SongName }}</ion-title>
		</ion-toolbar>
	</ion-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { IonTitle, IonToolbar, IonFooter, IonThumbnail } from "@ionic/vue"
import store from "@/store"

export default defineComponent({
	name: "NastaveniaPage",
	components: {
		IonTitle,
		IonToolbar,
		IonFooter,
		IonThumbnail
	},
	data() {
		return {
			SongName: "b"
		}
	},

	async mounted() {
		const temp = await store.lastPlayed.get()

		this.SongName = temp.songName
	},
	methods: {}
})
</script>

<style src="@/style/footer.css" scoped></style>
