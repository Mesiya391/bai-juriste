<template>
  <div class="container currency-calculator">
    <div class="currency-calculator-panel card-panel">
      <form @submit.prevent="calculate" class="currency-calculator-form">
        <h2 class>Currency Calculator</h2>
        <div class="currency-calculator-fields">
          <div class="field number-field">
            <label for="amount">Amount</label>
            <input type="number" name="amount" v-model="amount" />
          </div>

          <div class="field select-field">
            <label for="from-currency-code">From:{{ " " }}</label>
            <select
              value="fromCurrencyCode"
              class="select"
              v-model="fromCurrencyCode"
              name="from-currency-code"
            >
              <option v-for="currency in currencies" :key="currency">{{
                currency
              }}</option>
            </select>
          </div>

          <div class="field select-field">
            <label for="from-currency-code">To:{{ " " }}</label>
            <select
              value="toCurrencyCode"
              class="select"
              v-model="toCurrencyCode"
              name="to-currency-code"
            >
              <option v-for="currency in currencies" :key="currency">{{
                currency
              }}</option>
            </select>
          </div>

        </div>

        <div class="field">
          <button
            class="btn deep-purple"
            :disabled="!fromCurrencyCode || !toCurrencyCode || !amount"
          >
            Calculate
          </button>
        </div>
      </form>
      <div class="currency-calculator-result">
        <p v-if="errorMessage" class="red-text center">
          Error: {{ errorMessage }}
        </p>
        <p v-if="resultAmount" class="currency-calculator-result-amount">
          Result: {{ resultAmount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CurrencyCalculator",

  data() {
    return {
      fromCurrencyCode: "PLN",
      toCurrencyCode: "EUR",
      amount: "",
      resultAmount: "",
      currencies: [],
      errorMessage: "",
    };
  },
  mounted() {
    axios
      .get(
        `https://prime.exchangerate-api.com/v5/1b2586fee15e5c1bc0077381/latest/USD`
      )
      .then((response) => {
        if (typeof response === "string") {
          this.errorMessage = response;
        } else {
          const currenciesResponse = response?.data?.conversion_rates;
          this.currencies = Object.keys(currenciesResponse);
        }
      })
      .catch((err) => console.log(err));
  },
  methods: {
    calculate() {
      const date = "latest";
      this.resultAmount = "";
      axios
        .get(
          `https://prime.exchangerate-api.com/v5/1b2586fee15e5c1bc0077381/${date}/${this.fromCurrencyCode}`
        )
        .then((response) => {
          if (typeof response === "string") {
            this.errorMessage = response;
          } else {
            this.resultAmount =
              this.amount *
              response?.data?.conversion_rates[this.toCurrencyCode];
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.currency-calculator {
  max-width: 1200px;
  margin-top: 60px;
}

.currency-calculator-panel {
  display: flex;
  flex-direction: column;
}

.number-field {
  width: 70px;
}

.select-field {
  display: block;
  max-width: 100px;
}

select {
  display: block;
}

.currency-calculator-fields {
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.currency-calculator-form {
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
