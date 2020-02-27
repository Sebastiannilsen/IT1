//html referanser

const inpNavn = document.querySelector("#inpNavn");
const inpMeld = document.querySelector("#inpMeld");
const divMeld = document.querySelector("#meldinger");


// firestore

const db = firebase.firestore();
const chat = db.collection("chat");


function leggTilMeld(){
  chat.add({
    fra: inpNavn.value,
    tekst: inpMeld.value
  })
}


function lagHtml(element){
  divMeld.innerHTML += `
  <section class="chat">
    <div id="Avsender" > ${element["fra"]}: </div>
    <div id="Resultat" > ${element["tekst"]} </div>
  </section>
  `
}



function skrivResultat(snapshot){
  snapshot.docChanges().forEach((element) => lagHtml(element.doc.data()));
}

function slettHistorikk(){
    divMeld.innerHTML = "";
}

chat.onSnapshot(snapshot => skrivResultat(snapshot));
