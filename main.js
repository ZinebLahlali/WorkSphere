const AddWorker = document.getElementById("AddWorker");
const Forml = document.getElementById("forml");
const MonForm = document.getElementById("monForm");
const NomPrenom = document.getElementById("nomPrenom");
const Role = document.getElementById("role");
const Url = document.getElementById("photo");
const image = document.getElementById("img");
const addressEmail = document.getElementById("email");
const phone = document.getElementById("phone");
const work = document.getElementById("metier");
const Descreption = document.getElementById("descreption");
const dateDebut = document.getElementById("dateDebut");
const dateFin = document.getElementById("dateFin");
const AjouterExp = document.getElementById("AjouterExp");
const Archives = document.getElementById("archives");
const Personnel = document.getElementById("personnel");
const Securite = document.getElementById("securite");
const Serveurs = document.getElementById("serveurs");
const conference = document.getElementById("conference");
const Reception = document.getElementById("reception");
const experience = document.getElementById("expriences");
const Enregistrer = document.getElementById("enregistrer");
const Card = document.getElementById("card");
const CardEmployer = document.getElementById("cardEmployer");
const cardServeur = document.getElementById("cardServeur")
const btnSecurite = document.getElementById("btnSecurite");
const btnServeur = document.getElementById("btnServeur")
const btnReception = document.getElementById("btnReception")

// const Globalarry = []

const Employees = JSON.parse(localStorage.getItem("employees")) || [];

AddWorker.addEventListener("click", () => {
    Forml.classList.toggle("hidden");
});
AjouterExp.addEventListener("click", () => {
    const printexperience = document.createElement("div");
    console.log(printexperience);
    printexperience.innerHTML = `
<div class="border-2 border-black mt-3">
                        <div>
                            <label for="Exper">Expériences</label>
                        </div>
                        <div>
                         <input class="border-2 rounded-lg p-2" type="text" name="metier" >
                        </div>
                        <div>
                            <label for="descreption">Description</label>
                        </div>
                        <div class="mt-2">
                         <textarea  class="border-2 rounded-lg p-2" name="descreption"  ></textarea>
                        </div>
                       <div class="flex gap-4 mt-4">
                        <div class="flex flex-rows gap-1">
                         <span>à</span> <input class="border-2 rounded-lg p-1 h-fit" type="date" name="dateDebut">
                       </div>
                       <div class="flex flex-rows gap-1">
                        <span>de</span> <input class="border-2 rounded-lg p-1 h-fit" type="date" name="dateFin">
                       </div>
                       </div>
</div>
`;
    experience.appendChild(printexperience);
});

let emailRe = /^[^\s@\.\d]{4,}@[^\s\.@\W]{3,}\.[^\s\d@\W]{2,3}$/;
let phoneNumber = /^\+212(6|7|5)\d{8}$/;
let NomReg = /^[a-zA-Z ]{3,}$/;
Url.addEventListener("input", () => {
    if (Url.value == "") {
        image.src = "avatar.jpg";
    } else {
        image.src = Url.value;
    }
});
MonForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (phoneNumber.test(phone.value) === false) {
        console.log("false");
        alert("Le Numéro de téléphone est invalide");
        return;
    }
    if (NomReg.test(NomPrenom.value) === false) {
        alert("Le Nom est invalide");
    }

    if (emailRe.test(addressEmail.value) === false) {
        console.log("false");
        alert("Adresse email est invalide");
        return;
    }

    const object = {
        Nom: NomPrenom.value,
        Rôle: Role.value,
        Photo: Url.value,
        Email: addressEmail.value,
        telephone: phone.value,
        Experiences: [
            {
                Metier: work.value,
                Descreption: Descreption.value,
                DateDebut: dateDebut.value,
                DateFin: dateFin.value,
            },
        ],
    };

    Employees.push(object);

    localStorage.setItem("employees", JSON.stringify(Employees));

    Forml.classList.add("hidden");

    MonForm.reset();
    load();
});

function load() {
    Card.innerHTML = "";
    const saveData = Employees.length;

    for (let i = 0; i < saveData; i++) {
        const printData = document.createElement("div");
        printData.innerHTML = ` 
    <img src="${Employees[i].Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
    <div>
        <p class="text-xs">${Employees[i].Nom}</p>
        <p class="text-xs">${Employees[i].Rôle}</p>
    </div>
    `;
        printData.addEventListener("click", () => {
            console.log(printData);
        });

        Card.appendChild(printData);
    }
}

load();
function employer() {
  let content = "";
    for (let i = 0; i < Employees.length; i++) {
        
        switch (Employees[i].Rôle) {
            case "securite":
            case "Manager":
               console.log(Employees[i].Rôle);
                content += `
                   <p>${Employees[i].Nom}</p>
                   <p>${Employees[i].Rôle}</p>
                `;
                CardEmployer.innerHTML = content;
                break;
            case "technicien":
            case "Manager":    
                content += `
                <p>${Employees[i].Nom}</p>
                <p>${Employees[i].Rôle}</p>

                `;
                cardServeur.innerHTML = content;
                break;
            case "Réception":
                console.log(Employees[i].Rôle);
                content += `
                  <p>${Employees[i].Nom}</p>
                  <p>${Employees[i].Rôle}</p>
                `;
                cardReseption.innerHTML = content;
                break;


                

        }


    }
}


btnSecurite.addEventListener("click", () => {
    CardEmployer.classList.remove("hidden")
    cardServeur.classList.add("hidden")
    employer();
});
btnServeur.addEventListener("click", () => {
    cardServeur.classList.remove("hidden")
    CardEmployer.classList.add("hidden")
    employer();
});
btn
