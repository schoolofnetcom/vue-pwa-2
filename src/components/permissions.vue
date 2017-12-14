<template>
  <section>
      <h1>Permissões</h1>

      <a href="" @click.prevent="readPermission()">Ler permissão</a>

      <p>{{ permissionStatus }}</p>
  </section>
</template>

<script>
export default {
    data() {
        return {
            permissionStatus: null
        }
    },
    methods: {
        readPermission() {
            let permission = navigator.permissions.query({
                // name: 'geolocation'
                // name: 'notifications'
                // name: 'midi'
                name: 'push',
                userVisibleOnly: true
            })

            permission.then((response) => {
                this.permissionStatus  = response.state
                console.log(response)
            })
        }
    }
}
</script>

