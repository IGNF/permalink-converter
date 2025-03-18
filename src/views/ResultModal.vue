<script setup>
import TextCopyToClipboard from '@/components/TextCopyToClipboard.vue';

const props = defineProps({
  permalink: String,
});

const convertedPermalink = computed(() => {
    return props.permalink;
})

const iframe = computed(() => {
 return `<iframe
    width="600" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
    sandbox="allow-forms allow-scripts allow-same-origin"
    src="${convertedPermalink.value}"
    allowfullscreen>
  </iframe>`;
});

const ModalOpened = ref(false);
const onModalOpen = () => {
    ModalOpened.value = true;
};
const onModalClose = () => {
    ModalOpened.value = false;
};

defineExpose({
    onModalClose,
    onModalOpen
})
</script>

<template>
    <DsfrModal
      :opened="ModalOpened"
      title=""
      size="xl"
      @close="onModalClose">
      <div class="row justify-space-between">
        <div class="output-col">
        <div class="w-100">
            <DsfrInput
            v-model="convertedPermalink"
            :placeholder="convertedPermalink"
            label-visible
            readonly
            descriptionId=""
          >
          <template #label>
            <TextCopyToClipboard
              :copiedText="convertedPermalink"
              label="Lien permanent"
              description=""
            />
          </template>
          </DsfrInput>
          </div>
          <hr/>
          <div class="w-100">
            <DsfrInput
              v-model="iframe"
              :placeholder="iframe"
              label-visible
              readonly
              descriptionId=""
            >
            <template #label>
              <TextCopyToClipboard
                class="fr-mt-12v"
                :copiedText="iframe"
                label="Iframe"
                description=""
              />
            </template>
            </DsfrInput>
          </div>
          

          <DsfrHighlight 
            class="fr-mt-12v fr-mb-12v w-100 custom-fr-highlight"
            text="Reconstituer votre iframe en insérant ce lien compatible cartes.gouv.fr dans son code html"
            />
        
        <DsfrButton
          class="w-100 justify-center"
          secondary
          label="Lancer une nouvelle conversion"
          @click="onModalClose"
        />
      </div>
      <div class="map-col">
        <div v-html="iframe"></div>
        </div>
      </div>
 

    </DsfrModal>
</template>

<style scoped>
.justify-space-between{
    justify-content: space-between;
}
.justify-center {
    justify-content: center;
}

.output-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  max-width: 30vw;
}

.map-col {
  display: flex;
  flex-grow: 2;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.custom-fr-highlight {
    margin-left: 0;
}
</style>
