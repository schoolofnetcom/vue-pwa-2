import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import LocalNotifications from '@/components/local-notifications.vue'
import ForegroundDetection from '@/components/foreground-detection.vue'
import Permissions from '@/components/permissions.vue'
import CameraMicrophone from '@/components/camera-microphone.vue'
import Photo from '@/components/photo.vue'
import Recorder from '@/components/recorder.vue'
import RealTime from '@/components/real-time.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/local-notifications',
      name: 'LocalNotifications',
      component: LocalNotifications
    },
    {
      path: '/foreground-detection',
      name: 'ForegroundDetection',
      component: ForegroundDetection
    },
    {
      path: '/permissions',
      name: 'Permissions',
      component: Permissions
    },
    {
      path: '/camera-microphone',
      name: 'CameraMicrophone',
      component: CameraMicrophone
    },
    {
      path: '/photo',
      name: 'Photo',
      component: Photo
    },
    {
      path: '/recorder',
      name: 'Recorder',
      component: Recorder
    },
    {
      path: '/real-time',
      name: 'RealTime',
      component: RealTime
    }
  ]
})
