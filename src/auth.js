import firebase from 'firebase'
import * as firebaseui from 'firebaseui';

const config = {
    apiKey: "AIzaSyAQPaYUBlrO6ONDtA1StG7lUG5dhDj-kbo",
    authDomain: "currency-app-1586725547688.firebaseapp.com",
    databaseURL: "https://currency-app-1586725547688.firebaseio.com",
    projectId: "currency-app-1586725547688",
    storageBucket: "currency-app-1586725547688.appspot.com",
    messagingSenderId: "639503001155",
    appId: "1:639503001155:web:33111dd11e54e636dad6f6"
  };

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init(context) {
    this.context = context;

    firebase.initializeApp(config);
    this.uiConfig = {
      signInSuccessUrl: 'dashboard',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser');

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if(requireAuth && !user) this.context.$router.push('login')
      else if (guestOnly && user) this.context.$router.push('/dashboard')
    });
  },
  authForm(container) {
    this.ui.start(container, this.uiConfig);
  },
  user() {
    return this.context ? firebase.auth().currentUser : null;
  },
  logout() {
    firebase.auth().signOut();
  },
  addUserCurrency(userCurrency) {
    firebase.firestore().collection("Currencies").doc(userCurrency.id).set(userCurrency)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  },
  getUserCurrencies(userId) {
    const currencies = [];
    firebase.firestore().collection("Currencies")
    .where("uid", "==", userId)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          let document = {};
          document = doc.data();
          document.id = doc.id;
          console.log('Received document', document)
          currencies.push(document);
      });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    return currencies;
  },
  updateUserCurrency(documentId, currency) {
    firebase.firestore().collection('Currencies').doc(documentId).set(currency)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  },
  deleteUserCurrency(documentId) {
    firebase.firestore().collection('Currencies').doc(documentId).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  
  }
}

export default auth;