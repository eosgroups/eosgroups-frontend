<template>
  <div>
    <div
      v-if="links.length"
      class="row text-caption text-weight-light  items-center"
    >
      <q-btn
        class="q-mr-sm q-my-xs"
        v-for="(link, i) in links"
        :key="link.url"
        :disabled="!isValidUrl(link.url)"
        :label="link.label || `link ${i+1}`"
        :icon="link.icon || 'link'"
        color="primary"
        @click="openURL(link.url)"
      >
        <q-tooltip content-class="bg-secondary">{{
          link.url
        }}</q-tooltip>
      </q-btn>
    </div>
    <div v-else>
      Group has no links
    </div>
  </div>
</template>

<script>
import { isValidUrl } from "../imports/validators.js";
export default {
  // name: 'ComponentName',
  props: {
    links: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    isValidUrl
  }
};
</script>
<style></style>
