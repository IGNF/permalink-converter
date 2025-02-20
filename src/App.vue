<script setup lang="ts">
useScheme()
import useToaster from './composables/use-toaster'

const toaster = useToaster()

const serviceTitle = 'cartes.gouv.fr'
const serviceDescription = 'Le service public des cartes et données du territoire'
const logoText = ['RÉPUBLIQUE', 'FRANÇAISE']
</script>

<template>
  <DsfrHeader
    :service-title="serviceTitle"
    :service-description="serviceDescription"
    :logo-text="logoText"
  />

  <div class="fr-container  fr-mt-3w  fr-mt-md-5w  fr-mb-5w">
    <router-view />
  </div>
  <AppToaster
    :messages="toaster.messages"
    @close-message="toaster.removeMessage($event)"
  />
</template>
