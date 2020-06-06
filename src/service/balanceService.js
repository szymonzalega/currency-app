import firebase from "firebase";

const balanceService = {
  getUserBalance(user, commit) {
    let balance;
    firebase
    .firestore()
    .collection("AccountBalance")
    .where("user", "==", user)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let document = {};
        document = doc.data();
        console.log("Received balance document", document);
        balance = document.currencyAmount;
      });
      commit("GET_USER_BALANCE", balance);
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

    return balance;
  },
  storeUserBalance(document) {    
    firebase
    .firestore()
    .collection("AccountBalance")
    .doc(document.user)
    .set(document)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  },
  transferMoney(payload) {
    let balance;
    firebase
    .firestore()
    .collection("AccountBalance")
    .where("user", "==", payload.user)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let document = {};
        document = doc.data();
        console.log("Received balance document", document);
        balance = document.currencyAmount;
        console.log('user balance')
        console.log(document)
        const newBalance = parseInt(balance) + parseInt(payload.currencyAmount);
        let event = {
          user: payload.user,
          currencyAmount: newBalance
        }
        balanceService.storeUserBalance(event);
        });
     })
    .catch(function(error) {
      console.log("Error transfering money: ", error);
    });

    return balance;
  },
};

export default balanceService;
