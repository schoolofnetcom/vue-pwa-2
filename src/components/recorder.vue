<template>
    <section>
        <h1>Gravando</h1>
        <div class="grid">
            <div>
                <video src="" controls autoplay></video>
                <a href="" @click.prevent="startRecorder()">iniciar</a>
            </div>
            <div>
                <a href="" @click.prevent="getDownload()">download</a>
            </div>
        </div>
    </section>
</template>


<script>
export default {
  data() {
      return {
          stream: null,
          chuncks: []
      }
  },
  methods: {
      getUserMedia(config, element) {
          let successCallback = (stream) => {
              this.stream = stream
              element.src = window.URL.createObjectURL(stream);
          }

          let errorCallback = (err) => {
              consoel.log(err)
          }
          navigator.getUserMedia(config, successCallback, errorCallback)
      },
      getVideo() {
          let config = {
            video: true,
            audio: true
          }
          let element = document.querySelector('video')
          this.getUserMedia(config, element)
      },
      startRecorder() {
          this.recorder = new MediaRecorder(this.stream, {mimeType: "video/webm"})

          this.recorder.ondataavailable = (event) => {
              this.chuncks.push(event.data);
          }

          this.recorder.onstop = () => {
              let blob = new Blob(this.chuncks, {type: "video/webm"});

              this.chuncks = [];

              let a = document.createElement('a');
              document.body.appendChild(a);
              a.style = "display: none";
              a.href = window.URL.createObjectURL(blob);
              a.download = 'test.webm'
              a.click();
          }

          this.recorder.start();
      },
      getDownload() {
          this.recorder.stop();
      }
  },
  mounted() {
      this.getVideo()
  }
}
</script>


<style>
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }
</style>
