import firebase from "firebase";

const auditService = {
    storeAuditRecord(payload,documentId) {
        firebase
        .firestore()
        .collection("Audit")
        .doc(documentId)
        .set(payload)
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      },
      getAuditRecords(userId) {
        return new Promise((resolve, reject) => {
          const currencies = [];
          firebase
            .firestore()
            .collection("Audit")
            .where("user", "==", userId)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                let document = {};
                document = doc.data();
                document.id = doc.id;
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
}

export default auditService;