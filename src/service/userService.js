import firebase from "firebase";
const userService = {
storeUser(document) { 
    console.log(document)   
    firebase
    .firestore()
    .collection("Users")
    .doc(document.userId)
    .set(document)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  },
  getUsers() {
    const users = [];
    firebase
      .firestore()
      .collection("Users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let document = {};
          document = doc.data();
          console.log("Received document", document);
          users.push(document);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    return users;
  },
}

export default userService;
