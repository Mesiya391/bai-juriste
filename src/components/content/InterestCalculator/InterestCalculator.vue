<template>
  <div class="container">
    <div class="interest-calculator-panel card-panel">
      <form @submit.prevent="calculate" class="interest-calculator-form">
        <h2 class>Interest Calculator</h2>
        <div class="interest-calculator-fields">
          <div class="field number-field">
            <label for="amount">Amount</label>
            <input type="number" name="amount" v-model="amount" />
          </div>

          <div class="field number-field">
            <label for="number-of-days">Number of days</label>
            <input type="number" name="number-of-days" v-model="numberOfDays" />
          </div>

          <div class="field radio-field">
            <span>Interest type: {{ " " }}</span>
            <select v-model="currentInterestType" name="interest-type">
              <option value="statutory">statutory</option>
              <option value="maximum">maximum</option>
            </select>
          </div>
        </div>

        <div class="field">
          <button class="btn deep-purple" :disabled="!amount || !numberOfDays">
            Calculate
          </button>
        </div>
      </form>
      <div class="interest-calculator-result">
        <p v-if="resultAmount" class="interest-calculator-result-amount">
          Result: {{ resultAmount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const INTEREST_TYPES = {
  STATUTORY: "statutory",
  MAXIMUM: "maximum",
};
export default {
  name: "InterestCalculator",

  data() {
    return {
      amount: null,
      numberOfDays: null,
      resultAmount: null,
      currentInterestType: INTEREST_TYPES.STATUTORY,
    };
  },
  methods: {
    calculate() {
      const rate =
        this.currentInterestType === INTEREST_TYPES.STATUTORY ? 0.07 : 0.14;
      const result = (this.numberOfDays / 365) * this.amount * rate;
      this.resultAmount = result.toFixed(2);
      return this.resultAmount;
    },
  },
};
</script>

<style>
.interest-calculator-radio-input {
  opacity: 1 !important;
  position: relative !important;
}

.radio-field {
  display: flex;
  flex-direction: column;
}

.interest-calculator {
  max-width: 1200px;
  margin-top: 60px;
}

.interest-calculator-panel {
  display: flex;
  flex-direction: column;
}

.number-field {
  width: 100px;
}

.interest-calculator-fields {
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.interest-calculator-form {
  margin-bottom: 24px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="date"] {
  -moz-appearance: textfield;
}
</style>
