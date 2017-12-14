<template>
    <section>
        <h1>Tirando foto</h1>
        <div class="grid">
            <div>
                <video src="" controls autoplay></video>
                <a href="" @click.prevent="getVideo()">iniciar</a>
            </div>
            <div>
                <img class="photo">
                <a href="" @click.prevent="getPhoto()">tirar foto</a>
            </div>
        </div>
    </section>
</template>


<script>
export default {
  date() {
      return {
          stream: null
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
            audio: false
          }
          let element = document.querySelector('video')
          this.getUserMedia(config, element)
      },
      getPhoto() {
          let photo = new ImageCapture(this.stream.getTracks()[0])
          photo.takePhoto()
            .then((blob) => {
                let element = document.querySelector('img.photo')
                element.src = window.URL.createObjectURL(blob)

                /**let form = new FormData();
                form.append('image', blob);
                form.append('id', 1);
                form.append('title', 'foto do erik');

                window.axios.post('/url/para/receber', form).then();**/
            })
      }
  }
}
</script>


<style>
    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }
</style>
