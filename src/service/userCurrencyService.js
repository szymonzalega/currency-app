import firebase from "firebase";

const currencyService = {
  addUserBoughtCurrency(userBoughtCurrency) {
    firebase
      .firestore()
      .collection("UserCurrencies")
      .doc(userBoughtCurrency.id)
      .set(userBoughtCurrency)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  },
  getUserBoughtCurrencies(userId) {
    return new Promise((resolve, reject) => {
      const currencies = [];
      firebase
        .firestore()
        .collection("UserCurrencies")
        .where("uid", "==", userId)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let document = {};
            document = doc.data();
            document.id = doc.id;
            console.log("Received document", document);
            currencies.push(document);
            resolve(currencies);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          reject(error);
        });
    })
  },
  updateUserBoughtCurrency(userBoughtCurrency) {
    firebase
      .firestore()
      .collection("UserCurrencies")
      .doc(userBoughtCurrency.id)
      .set(userBoughtCurrency)
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
