import firebase from "firebase";

const currencyService = {
  addUserCurrency(userCurrency) {
    firebase
      .firestore()
      .collection("Currencies")
      .doc(userCurrency.id)
      .set(userCurrency)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  },
  getUserCurrencies(userId) {
    const currencies = [];
    firebase
      .firestore()
      .collection("Currencies")
      .where("uid", "==", userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let document = {};
          document = doc.data();
          document.id = doc.id;
          console.log("Received document", document);
          currencies.push(document);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    return currencies;
  },
  updateUserCurrency(documentId, currency) {
    firebase
      .firestore()
      .collection("Currencies")
      .doc(documentId)
      .set(currency)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  },
  deleteUserCurrency(documentId) {
    firebase
      .firestore()
      .collection("Currencies")
      .doc(documentId)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  },
};

export default currencyService;
