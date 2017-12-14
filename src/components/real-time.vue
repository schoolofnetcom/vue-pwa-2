<template>
    <section>
        <h1>Conversa</h1>
        <div class="grid">
            <div>
                <h3>Local</h3>
                <video class="local" src="" controls autoplay></video>
            </div>
            <div>
                <h3>Remoto</h3>
                <video class="remote" src="" controls autoplay></video>
            </div>
        </div>

        <a href="" @click.prevent="connection()">Conectar</a>
    </section>
</template>


<script>
export default {
  data() {
      return {
          stream: null,
          streamRemote: null,
          local: null,
          remote: null,
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
          let element = document.querySelector('video.local')
          this.getUserMedia(config, element)
      },
      connection() {
          this.local = new RTCPeerConnection(null);
          this.remote = new RTCPeerConnection(null);

          this.local.addStream(this.stream);
          this.local.onicecandidate = (event) => {
              if (event.candidate == null) return false;
              this.remote.addIceCandidate(new RTCIceCandidate(event.candidate))
          }

          this.remote.onaddstream = (event) => {
              if (!event.stream) return;
              let element = document.querySelector('video.remote')
              element.src = window.URL.createObjectURL(event.stream);
          }

          this.remote.onicecandidate = (event) => {
              if (event.candidate == null) return false;
              this.local.addIceCandidate(new RTCIceCandidate(event.candidate))
          }

          this.local.createOffer({offerToReceiveVideo: 1})
            .then((desc) => {
                this.local.setLocalDescription(desc);
                this.remote.setRemoteDescription(desc);
                return this.remote.createAnswer({offerToReceiveVideo: 1})
            })
            .then((desc) => {
                this.local.setRemoteDescription(desc);
                this.remote.setLocalDescription(desc);
            })

      }
  },
  mounted() {
      this.getVideo();
  }
}
</script>


<style>
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }
</style>
