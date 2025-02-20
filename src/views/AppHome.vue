<script setup>
</script>

<template>
  <div class="fr-container-md--fluid outer-div">
    <div class="row">
      <h2 class="page-title fr-mb-15v">Insérez ci-dessous le permalien que vous voulez rendre compatible sur cartes.gouv.fr</h2>
    </div>
    <div class="row row2">
      <div class="input-col">
        <DsfrFieldset hintClass="hint-class">
          <template #legend>Permalien issu du Géoportail à convertir</template>
          <template #hint>
            <span>
              Format attendu :
            </span>
            <br>
            <span>
            https://www.geoportail.gouv.fr/carte?c=2.705841350773468,48.768240377068594&z=10&l0=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2::GEOPORTAIL:OGC:WMTS(1)&l1=ORTHOIMAGERY.ORTHOPHOTOS::GEOPORTAIL:OGC:WMTS(0.46)&permalink=yes
            </span>
          </template>
          <DsfrInput
          :disabled="false"
          :labelVisible="false"
          placeholder="Placeholder"
          type="text"
          >
          </DsfrInput>
        </DsfrFieldset>
      </div>
      <div class="arrow-col">
        <div></div>
        <VIcon 
        name="mdi:arrow-right"
        scale="2"
        class="fr-text-label--blue-france"
        />  
        <VIcon 
        name="mdi:arrow-right"
        scale="2"
        class="fr-text-label--blue-france"
        /> 
      </div>
      <div class="output-col">
        <DsfrFieldset class="fieldset-class">
          <template #legend>Permalien compatible cartes.gouv.fr</template>
          <template #hint>
            Résultat
          </template>
          <DsfrInput
          :disabled="false"
          :labelVisible="false"
          placeholder="Placeholder"
          type="text"
          >
          </DsfrInput>
        </DsfrFieldset>
        <DsfrFieldset class="fieldset-class">
          <template #legend>Iframe compatible cartes.gouv.fr</template>
          <template #hint>
            Résultat
          </template>
          <DsfrInput
          :disabled="false"
          :labelVisible="false"
          placeholder="Placeholder"
          type="text"
          >
          </DsfrInput>
        </DsfrFieldset>
        
      </div>
    </div>
  </div>
</template>

<style>
.page-title {
  max-width: 661px;
}
.outer-div {
  width:100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.row { 
 display: flex;
 flex-direction: row;
 justify-content: center;
}

.row2 {
  height: 60vh;
}

.input-col {
  flex-grow: 2;
  max-width: 30vw;
}

.arrow-col {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.output-col {
  flex-grow: 2;
  max-width: 30vw;
}
.hint-class {
  max-width: 30vw;

}


</style>
