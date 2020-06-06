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
      }
}

export default auditService;