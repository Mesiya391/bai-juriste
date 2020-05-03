<template>
  <div class="container">
    <div class="proceedings-calendar-import card-panel">
      <h2>Import case proceedings to Google Calendar</h2>
      <div>
        <span>Authorize with google account: {{ " " }}</span>
        <button
          class="btn deep-purple"
          v-on:click="handleAuthClick"
          v-if="!isUserSignedIn"
          id="authorize_button"
        >
          Authorize
        </button>
        <button
          class="btn deep-purple"
          v-on:click="handleSignoutClick"
          v-if="isUserSignedIn"
          id="signout_button"
        >
          Sign Out
        </button>
      </div>
      <ul v-if="isUserSignedIn" class="cases">
        <li v-for="caseName in cases" :key="caseName">
          <button
            class="btn deep-purple"
            v-on:click="handleCaseClick(caseName)"
          >
            {{ caseName }}
          </button>
        </li>
      </ul>
      <span v-if="feedback">{{ feedback }}</span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

const CLIENT_ID =
  "1083903537795-5le4uogr508k351irgpn2b00rn5j317a.apps.googleusercontent.com";
const API_KEY = "AIzaSyCiFKSA9MNCUQx6BTzrRn6Wy3aPdvOVyms";

const SCOPES = "https://www.googleapis.com/auth/calendar";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export default {
  name: "ProceedingsCalendarImport",
  data() {
    return {
      isUserSignedIn: false,
      cases: [],
      feedback: "",
    };
  },
  methods: {
    updateSigninStatus(isSignedIn) {
      this.isUserSignedIn = isSignedIn;
    },
    async handleCaseClick(caseName) {
      if (this.isUserSignedIn) {
        this.feedback = "Adding events...";
        const proceedings = await this.getUserCaseProceedings(caseName);

        if (!proceedings || proceedings.length === 0) {
          this.feedback = "No available proceedings";
          return;
        }

        console.log(proceedings)

        const proceedingsEvents = proceedings.map(
          ({ note, name, date, city }) => ({
            summary: name,
            location: city,
            description: note,
            start: {
              date,
              timeZone: "Poland",
            },
            end: {
              date,
              timeZone: "Poland",
            },
          })
        );

        const batch = window.gapi.client.newBatch();
        proceedingsEvents.forEach((event) => {
          batch.add(
            window.gapi.client.calendar.events.insert({
              calendarId: "primary",
              resource: event,
            })
          );
        });

        try {
          const response = await batch;
          this.feedback = "Events imported to google calendar";
          console.log(response);
        } catch (e) {
          console.log(e);
          this.feedback = e.message;
        }
      }
    },
    async getUserCaseProceedings(caseName) {
      let user = firebase.auth().currentUser;
      let userID = user.uid;

      const proceedingsSnapshot = await db
        .collection("cases")
        .doc(userID)
        .collection("userCases")
        .doc(caseName)
        .collection("Proceedings")
        .get();

      return proceedingsSnapshot.docs.map((proceedingDoc) =>
        proceedingDoc.data()
      );
    },
    async getUserCases() {
      let user = firebase.auth().currentUser;
      let userID = user.uid;

      const casesSnapshot = await db
        .collection("cases")
        .doc(userID)
        .collection("userCases")
        .get();

      this.cases = casesSnapshot.docs.map((caseDoc) => caseDoc.get("name"));
      return this.cases;
    },
    handleImportProceedingsClick() {
      this.handleAuthClick();
    },
    handleAuthClick() {
      window.gapi.auth2.getAuthInstance().signIn();
    },
    handleSignoutClick() {
      window.gapi.auth2.getAuthInstance().signOut();
    },
  },
  mounted() {
    const start = () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: DISCOVERY_DOCS,
        })
        .then(() => {
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(this.updateSigninStatus);

          this.updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
        });
    };

    window.gapi.load("client:auth2", start);

    this.getUserCases();
  },
};
</script>

<style>
.container {
  max-width: 1200px;
}

.proceedings-calendar-impoty {
  margin-top: 60px;
}

.cases {
  display: flex;
  flex-direction: column;
}

.cases > li {
  margin-bottom: 16px;
}
</style>
