<template>
  <section>
      <h1>Notificações Locais</h1>

      <p>Permissão: {{ permission }} <a href="" @click.prevent="request()" v-if="permission !== 'granted'">solicitar</a></p>

      <a href="" @click.prevent="firePersistent('Foi um click', 'Este clique fois disparado a partir de um link, no qual clicamos')">notificação</a>
  </section>
</template>

<script>
export default {
    data() {
        return {
            permission: null
        }
    },
    methods: {
        fire(msg, body) {
            let options = {
                body: body,
                icon: 'https://icon-icons.com/icons2/567/PNG/512/eye_icon-icons.com_54399.png'
            }
            new Notification(msg, options)
        },
        firePersistent(msg, body) {
            let options = {
                body: body,
                icon: 'https://icon-icons.com/icons2/567/PNG/512/eye_icon-icons.com_54399.png'
            }
            navigator.serviceWorker.getRegistration()
                .then(reg => reg.showNotification(msg, options))
                .catch(err => console.log(err))
        },
        request() {
            Notification.requestPermission(() => {
                this.permission = Notification.permission
            })
        }
    },
    mounted() {
        this.permission = Notification.permission
        setTimeout(() => {
            this.fire('Foi no mounted', 'Esta notificação foi disparada a partir do lifecircle mounted')
        }, 3000);
    }
}
</script>
