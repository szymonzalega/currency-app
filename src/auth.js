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
      this.context.$store.dispatch("currency/fetchCurrencies");

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
    console.log('received currency')
    console.log(userCurrency)
    firebase.firestore().collection("Currencies").add(userCurrency)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  },
  getUserCurrencies(userId) {
    const currencies = [];
    firebase.firestore().collection("Currencies")
    .where("uid", "==", userId)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          currencies.push(doc.data());
      });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    return currencies;
  } 
}

export default auth;