<template>
  <div>
    <q-markup-table :dark="false"  separator="horizontal" class="comparison-table">
      <thead>
        <tr class="bg-primary" style="height:80px">
          <th class="text-left"></th>
          <th class="text-center">
              <q-img
                style="width: 20vw; max-width:150px; min-width:100px; filter: brightness(0) invert(1);"
                contain
                src="~assets/daclify-logo.svg"
              />
          </th>
          <th class="text-center">
              <q-img
                style="width: 20vw; max-width:150px; min-width:100px"
                contain
                src="https://dev.dacfactory.io/img/eosdac-logo.e9d070ef.svg"
              />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Frozen Yogurt</td>
          <td class="text-center"><q-icon name="check" color="positive" size="24px"/></td>
          <td class="text-center"><q-icon name="close" color="negative" size="24px"/></td>
        </tr>
        <tr>
          <td class="text-left">Ice cream sandwich</td>
          <td class="text-center">237</td>
          <td class="text-center">9</td>
        </tr>
        <tr>
          <td class="text-left">Eclair</td>
          <td class="text-center">262</td>
          <td class="text-center">16</td>
        </tr>
        <tr>
          <td class="text-left">Cupcake</td>
          <td class="text-center">305</td>
          <td class="text-center">3.7</td>
        </tr>
        <tr>
          <td class="text-left">Gingerbread</td>
          <td class="text-center">356</td>
          <td class="text-center">16</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>
<style >

.comparison-table th:first-child{
  background-color: red;
}

.comparison-table td:first-child{
  background-color:var(--q-color-primary);
}
.comparison-table thead th:first-child, .comparison-table tbody td:first-child{
  position: sticky;
  left: 0;
  z-index: 1;
}

</style>
