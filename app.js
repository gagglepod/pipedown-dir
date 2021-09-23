const hostList = document.querySelector("#host-list");
const hostForm = document.querySelector("#add-host-form");

// create elements on render hosts
function renderHosts(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let website = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;

  // Create anchor element.
  let a = document.createElement("a");
  let link = document.createTextNode(doc.data().website);

  // Append the text node to anchor element.
  a.appendChild(link);
  a.title = doc.data().name;
  a.target = "_blank";
  a.href = doc.data().url;

  website.appendChild(a);

  // Append the anchor element to the body.
  li.appendChild(name);
  li.appendChild(website);
  // li.appendChild(a);

  hostList.appendChild(li);
}

db.collection("hosts")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderHosts(doc);
    });
  });

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
