<script setup>
import ResultModal from './ResultModal.vue';

const permalink = ref("https://www.geoportail.gouv.fr/carte?c=2.3159834794788225,47.206208330402916&z=6&l0=ORTHOIMAGERY.ORTHOPHOTOS::GEOPORTAIL:OGC:WMTS(1)&permalink=yes");
const resultModal = ref(null);
const error = ref(false);
const convertedPermalink = ref('');
function onModalOpen() {
  fetchConvertedPermalink();
}

// Fonction pour récupérer le lien via fetch
const permalinkParams = computed(() => {
  if (!permalink.value) {
    return '';
  }
  // Extraire les paramètres de la chaîne de requête
  try {
    const url = new URL(permalink.value);
    return url.pathname + url.search;
  } catch (e) {
    error.value = true;
    alert.value.closed = false;
    alert.value.title = 'Erreur de format de lien';
    alert.value.description = e.message || 'Le lien fourni n’est pas valide.';
    return '';
  }
});

const fetchConvertedPermalink = async () => {
  if (!permalinkParams.value) {
    error.value = true;
    alert.value.closed = false;
    return;
  }
  const url = 'https://geoportail-redirection.dev.ign-mut.ovh' + permalinkParams.value + "&i=1";
  if (error.value) {
    error.value = false;
    return
  }
  window.localStorage.clear();

  fetch(url)
    .then((response) => {
        return response.text();
    })
    .then((text) => {    
        convertedPermalink.value = text;
        if (convertedPermalink.value.includes("&amp;e=")) {
          error.value = true;
          alert.value.closed = false;
          alert.value.title = 'Erreur format URL';
          alert.value.description = convertedPermalink.value.split("&amp;e=")[1].split("|");
          throw new Error(alert.value.description);
      }
      else {
        resultModal.value.onModalOpen();
      }
    })
    .catch((err) => {
      error.value = true;
      alert.value.closed = false;
      alert.value.title = "Erreur";
      alert.value.description = err.message || 'Une erreur est survenue lors de la récupération du lien converti.';
      throw new Error(err);
    });
};

const alert = ref({
  id: '1',
  type: 'error',
  title: 'Titre de l’erreur',
  description: 'Description de l’erreur',
  titleTag: 'h2',
  closeable: true,
  closed: true,
  small: false
});

const onCloseError = () => {
  alert.value.closed = true;
};

const resetConverter = () => {
  window.localStorage.clear();
  permalink.value = '';
  convertedPermalink.value = '';
  error.value = false;
  alert.value.closed = true;
};
</script>

<template>
  <div class="container-div">
  <div class="fr-container-md--fluid outer-div fr-mt-12v">
      <h1 >Convertir un lien issu du Géoportail</h1>
          <p>Copier votre lien ou iframe Géoportail dans le champs et lancer la conversion.</p>
          <div class="row w-100">
            <DsfrInput
          :disabled="false"
          :labelVisible="false"
          type="text"
          v-model="permalink"
          >
          </DsfrInput>
          <DsfrButton
          primary
          class="input-like"
          label="Convertir"
          icon="ri-links-line"
          @click="onModalOpen"
          />
          </div>
          <div class="fr-hint-text w-100 fr-mt-7v">
            Exemple de lien attendu : https://www.geoportail.gouv.fr/carte?c=2.765163483556678,48.41229536131638&z=12&l0=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2::GEOPORTAIL:OGC:WMTS(1)&d1=4762965(1;h)&v2=PLAN.IGN::GEOPORTAIL:GPP:TMS(0.71;s:standard)&l3=ORTHOIMAGERY.ORTHOPHOTOS::GEOPORTAIL:OGC:WMTS(0.55)&permalink=yes 
          </div>
          <DsfrHighlight 
            class="fr-mt-12v fr-mb-12v"
            text="Vous avez inséré sur votre site une carte créée sur le Géoportail ou partagé une donnée du Géoportail via les réseaux sociaux. Copiez ce lien dans le convertisseur pour le rendre compatible avec cartes.gouv.fr. En cas de besoin, contactez nos équipes."
            />
          <DsfrAlert
            :type="alert.type"
            :title="alert.title"
            :description="alert.description"
            :title-tag="alert.titleTag"
            :small="alert.small"
            :closed="alert.closed"
            :closeable="alert.closeable"
            @close="onCloseError()"
            class="alert"
          />
      </div>
    </div>

    <ResultModal
      ref="resultModal"
      :permalink="convertedPermalink"
      @close-modal="resetConverter"
    />
</template>

<style scoped>
.alert {
  width: 100%;
  margin-bottom: 10px;
}
.container-div {
  width: 100%;
  background-color: var(--background-alt-blue-france);
  display: flex;
  justify-content: center;
}
.outer-div {
  max-width: 65vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.row { 
 display: flex;
 flex-direction: row;
 align-items: center;
}

.w-100 {
  width: 100%;
}

.input-like {
  max-height: 30px;
  margin-top: .5rem;
  max-height: 2.5rem;
}

.row-title {
  justify-content: center;
}

.row2 {
  height: 60vh;
  justify-content: space-evenly;
}



</style>
