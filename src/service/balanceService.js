// import firebase from "firebase";

const balanceService = {
//   getUserBalance(userId) {
//     firebase
//       .firestore()
//       .collection("Currencies")
//       .where("uid", "==", userId)
//       .get()
//       .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           let document = {};
//           document = doc.data();
//           document.id = doc.id;
//           console.log("Received document", document);
//           balance = document;
//         });
//       })
//       .catch(error => {
//         console.log("Error getting documents: ", error);
//       });
//       return balance;
//   },
  getUserBalance() {
      return 10;
  },
};

export default balanceService;
