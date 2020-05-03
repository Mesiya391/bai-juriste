<template>
  <div class="tools">
    <CurrencyCalculator />
    <InterestCalculator />
    <ProceedingsCalendarImport />
  </div>
</template>

<script>
import CurrencyCalculator from "./CurrencyCalculator/CurrencyCalculator";
import InterestCalculator from "./InterestCalculator/InterestCalculator";
import ProceedingsCalendarImport from "./ProceedingsCalendarImport/ProceedingsCalendarImport";

export default {
  name: "Tools",
  components: {
    CurrencyCalculator,
    InterestCalculator,
    ProceedingsCalendarImport,
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
