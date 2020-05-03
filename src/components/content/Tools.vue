<template>
  <div class="tools">
    <CurrencyCalculator />
    <InterestCalculator />
  </div>
</template>

<script>
import CurrencyCalculator from "./CurrencyCalculator/CurrencyCalculator";
import InterestCalculator from "./InterestCalculator/InterestCalculator";

export default {
  name: "Tools",
  components: {
    CurrencyCalculator,
    InterestCalculator,
  },
};
</script>

<style>
.tools {
  display: flex;
  flex-direction: column;
}

.tools > * {
  margin-bottom: 24px;
}
</style>
