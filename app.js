const hostList = document.querySelector("#host-list");
const hostForm = document.querySelector("#add-host-form");

// ********************************
// Create elements on render hosts
function renderHosts(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let website = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  cross.textContent = "x";

  // Create link element.
  let a = document.createElement("a");
  let link = document.createTextNode(doc.data().website);

  // Append the text to anchor element.
  a.appendChild(link);
  a.title = doc.data().name;
  a.target = "_blank";
  a.href = doc.data().url;

  website.appendChild(a);

  // Append the span elements to the body.
  li.appendChild(name);
  li.appendChild(website);
  li.appendChild(cross);

  hostList.appendChild(li);

  // deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("hosts").doc(id).delete();
  });
}

// ********************************
// Basic database GET function
// Use this to get all documents from Firebase
// .get()
// Get data from Firestore database
//
// db.collection("hosts")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderHosts(doc);
//     });
//   });

// ********************************
// Query options (orderBy)
// .orderBy("name")
// .orderBy("website")
// Orders the list alphabetically
// Uppercase come before lowercase letters
// Can chain where() with orderBy() => May require an index
// Indexes are built in the console (firebase.google.com)
//
// Get Ordered data from Firestore database
// db.collection("hosts")
//   .where("name", "==", "Libsyn")
//   .orderBy("website")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderHosts(doc);
//     });
//   });

// ********************************
// Query options (where):
// .where("name", "==", "Name") ==> Case sentitive - all docs equal to "Name"
// .where("name", ">", "N") ==> List greater than the letter "N"
// .where("name", "<", "40") ==> List lesser than an age of "40"
//
// Query data from Firestore database
// db.collection("hosts")
//   .where("name", ">", "N")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderHosts(doc);
//     });
//   });

// ********************************
// Adding data to Firestore database using form
hostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("hosts").add({
    name: hostForm.name.value,
    website: hostForm.website.value,
    url: hostForm.url.value,
  });
  hostForm.name.value = "";
  hostForm.website.value = "";
  hostForm.url.value = "";
});

// ********************************
// Real-time Listener
db.collection("hosts")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderHosts(change.doc);
      } else if (change.type == "removed") {
        let li = hostList.querySelector("[data-id=" + change.doc.id + "]");
        hostList.removeChild(li);
      }
    });
  });

// ********************************
// Update a field in the document
//
// Update a document
// db.collection('hosts').doc('data-id').update({
//     name: "New Name Example"
// });

// ********************************
// Overwrite the document completely
// Overrides all the setting and leaves all the other fields 'empty'
//
// Set a document
// db.collection('hosts').doc('data-id').set({
//     name: "New Name Example"
// });
