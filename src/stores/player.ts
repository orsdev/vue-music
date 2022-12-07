import { defineStore } from "pinia";
import { Howl } from "howler";
import { formatTime } from "@/utils";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    current_song: {},
    sound: null as any,
    seek: "00:00",
    duration: "00:00",
    player_progress: "0%",
  }),
  getters: {
    isPlaying(state: any): boolean {
      if (state.sound?.playing) {
        return state.sound?.playing();
      }
      return false;
    },
  },
  actions: {
    async newSong(song: any) {
      if (!this.sound) {
        this.sound = new Howl({
          src: [song.url],
          html5: true, // uses html 5 audio instead of axios
        });
      } else if (this.sound && this.current_song?.url !== song?.url) {
        this.sound.unload();

        this.sound = new Howl({
          src: [song.url],
          html5: true, // uses html 5 audio instead of axios
        });
      }

      this.current_song = song;

      if (this.sound?.playing()) {
        this.sound?.pause();
      } else {
        this.sound.play();

        this.sound.on("play", () => {
          requestAnimationFrame(this.progress);
        });
      }
    },
    progress() {
      this.seek = formatTime(this.sound.seek());
      this.duration = formatTime(this.sound.duration());
      this.player_progress = `${(this.sound.seek() / this.sound.duration()) * 100
        }%`;

      if (this.sound?.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event: any) {
      if (!this.sound.playing) return;

      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;

      this.sound.seek(seconds);

      this.sound.once("seek", this.progress);
    },
    async toggleAudio() {
      if (!this.sound?.playing) return;

      if (this.sound?.playing()) {
        this.sound?.pause();
      } else {
        this.sound?.play();
      }
    },
  },
});
