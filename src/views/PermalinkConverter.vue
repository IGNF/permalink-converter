<script setup>
import ResultModal from './ResultModal.vue';

const permalink = ref("")
const resultModal = ref(null)

function onModalOpen() {
  resultModal.value.onModalOpen()
}
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
            Exemple de lien attendu : https://www.geoportail.gouv.fr/cartec=2.705841350773468,48.768240377068594&z=10&l0=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2::GEOPORTAIL:OGC:WMTS(1)&l1=ORTHOIMAGERY.ORTHOPHOTOS::GEOPORTAIL:OGC:WMTS(0.46)&permalink=yes
          </div>
          <DsfrHighlight 
            class="fr-mt-12v fr-mb-12v"
            text="Vous avez inséré sur votre site une carte créée sur le Géoportail ou partagé une donnée du Géoportail via les réseaux sociaux. Copiez ce lien dans le convertisseur pour le rendre compatible avec cartes.gouv.fr. En cas de besoin, contactez nos équipes."
            />
      </div>
    </div>
    <ResultModal
      ref="resultModal"
      :permalink="permalink"

    />
</template>

<style>
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
