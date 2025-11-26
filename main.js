const AddWorker = document.getElementById("AddWorker");
//Inputs
const Forml = document.getElementById("forml");
const MonForm = document.getElementById("monForm");
const NomPrenom = document.getElementById("nomPrenom");
const Role = document.getElementById("role");
const Url = document.getElementById("photo");
const image = document.getElementById("img");
const addressEmail = document.getElementById("email");
const phone = document.getElementById("phone");
const work = document.getElementById("Exper");
const Descreption = document.getElementById("descreption");
const dateDebut = document.getElementById("dateDebut");
const dateFin = document.getElementById("dateFin");
//buttonExprience
const AjouterExp = document.getElementById("AjouterExp");
//les salles
const Archives = document.getElementById("archives");
const Personnel = document.getElementById("personnel");
const Securite = document.getElementById("securite");
const Serveurs = document.getElementById("serveurs");
const conference = document.getElementById("conference");
const Reception = document.getElementById("reception");

const experience = document.getElementById("expriences");
const Enregistrer = document.getElementById("enregistrer");
//Affichage
const Card = document.getElementById("card");
const cardSecurite = document.getElementById("cardSecurite");
const cardServeur = document.getElementById("cardTechnicien")
const cardReseption = document.getElementById("cardReception");
const cardArchives = document.getElementById("cardArchives")
const cardConference = document.getElementById("cardConference")
const removeCard = document.querySelectorAll(".removeCard");
const CardAffichage = document.getElementById("CardAffichage");
const CardWorker = document.getElementById("CardWorker");
const cardPersonnel = document.getElementById("cardEmpolyer");
const conferenceList = document.getElementById("conferenceList");
//Buttons
const btnSecurite = document.getElementById("btnSecurite");
const btnServeur = document.getElementById("btnServeur");
const btnReception = document.getElementById("btnReception");
const btnConference = document.getElementById("btnConference");
const btnPersonnel = document.getElementById("btnPersonnel");
const btnArchives = document.getElementById("brnArchives");
const btnCardEmp = document.getElementById("btnCardEmp");
const btnAnnuler = document.getElementById("btnAnnuler");


const Employees = JSON.parse(localStorage.getItem("employees")) || [];
let id=Employees.length + 1;
AddWorker.addEventListener("click", () => {
    Forml.classList.toggle("hidden");
});
AjouterExp.addEventListener("click", (e) => {
    e.preventDefault();
    const printexperience = document.createElement("div");
    printexperience.className = "exprience border-2 border-black mt-3 p-2";
    printexperience.innerHTML = `
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
                         <span>de</span> <input class="border-2 rounded-lg p-1 h-fit" type="date" name="dateDebut">
                       </div>
                       <div class="flex flex-rows gap-1">
                        <span>à</span> <input class="border-2 rounded-lg p-1 h-fit" type="date" name="dateFin">
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
   btnAnnuler.addEventListener('click', ()=>{
       Forml.classList.add("hidden"); 
     })
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

    const expBlocks = document.querySelectorAll(".exprience");

    let expArray = [];

    expBlocks.forEach(block => {
        const metier = block.querySelector('input[name="metier"]').value;
        const desc = block.querySelector('textarea[name="descreption"]').value;
        const debut = block.querySelector('input[name="dateDebut"]').value;
        const fin = block.querySelector('input[name="dateFin"]').value;

        expArray.push({
            Work: metier,
            Descreption: desc,
            dateDebut: debut,
            dateFin: fin
        });
    });


    const object = {
        Nom: NomPrenom.value,
        Rôle: Role.value ,
        Id : id,
        Photo: Url.value,
        Email: addressEmail.value,
        telephone: phone.value,
        assigned: false,
        Experiences: expArray
    };

 id++;
  
    Employees.push(object);

    localStorage.setItem("employees", JSON.stringify(Employees));
   
    Forml.classList.add("hidden");

    MonForm.reset();
    load();
});

function load(id) {
    let employerId = id;
    Card.innerHTML = "";
    const saveData = Employees.length;

    for (let i = 0; i < saveData; i++) {
        if(Employees[i].assigned == false){
            if(Employees[i].Id !== employerId){
                const printData = document.createElement("div");
                printData.innerHTML = `
                    <div class="border border-2 rounded-lg flex   gap-2 p-1">
                    <img src="${Employees[i].Photo || "avatar.jpg"}" alt="${Employees[i].Rôle}" class="rounded-full w-[15%] h-[10%] border-2">
                        <h1 class="text-xs">${Employees[i].Nom}</h1>
                        <p class="text-xs">${Employees[i].Rôle}</p>
                    </div>
                    `;
            
                printData.dataset.id= Employees[i].Id;
                printData.addEventListener("click", () => {
                afficher(Employees[i]);
                });

                Card.appendChild(printData);
                }
                }
    }
}

function addToZone(id,room){
    
    let carte = document.createElement('div');
    carte.innerHTML = `
     <div>
     <img src="${Employees[id-1].Photo}" class="border rounded-full border-black w-[15%] h-[10%]">
     <p class="text-xs">${Employees[id-1].Nom}</p>
     </div>
    <button>X</button>
    `
    load(id);

    document.getElementById(room).appendChild(carte);
    document.getElementById(`card${room}`).classList.add("hidden");
    console.log(Employees[id-1]);
    Employees[id-1].assigned= true;
}

load();
function employer(room) {
    
    cardSecurite.innerHTML='<button class="text-gray-300 p-3 w-full flex justify-end " onclick="close_modal()">X</button>';
    cardServeur.innerHTML = '<button class="text-gray-300  p-3 flex w-full justify-end" onclick="close_modal()">X</button>';
    cardReseption.innerHTML = '<button class="text-gray-300 p-3 w-full flex justify-end"onclick="close_modal()">X</button>';
    cardPersonnel.innerHTML = '<button class="text-gray-300 p-3 w-full flex justify-end"onclick="close_modal()">X</button>';
    cardConference.innerHTML = '<button class="text-gray-300 p-3 w-full flex justify-end"onclick="close_modal()">X</button>';
    cardArchives.innerHTML = '<button class="text-gray-300 p-3 w-full flex justify-end"onclick="close_modal()">X</button>';
    
    for (let i = 0; i < Employees.length; i++) {
         const empRole = Employees[i].Rôle;
         if(Employees[i].assigned === false){
           let content = document.createElement('div');
                    content.innerHTML = `
                    <div class="relative">
                     <div><button onclick="addToZone(${Employees[i].Id}, '${room}')" class="border text-xs border-2 absolute left-30   p-2 rounded-full bg-green-500 w-15 h-10">Add</button> </div>
                  <img src="${Employees[i].Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
                    <div>
                        <h1 class="text-xs">${Employees[i].Nom}</h1>
                        <p class="text-xs">${Employees[i].Rôle}</p>
                    </div>
                    </div>
                `;
         
        switch(room){
            case "securite":
                if(empRole == "Securite" || empRole == "Manager" || empRole == "Nettoyage") {
                    cardSecurite.appendChild(content);
                }
                break;
            case "Technicien":
                if(empRole == "Technicien" || empRole == "Manager" || empRole == "Nettoyage") {
                   cardServeur.appendChild(content);
                }
                break;
            case "Empolyer":
                    cardPersonnel.appendChild(content);
                break;
            case "Archives":
                if(empRole !== "Nettoyage"){                   
                   cardArchives.appendChild(content);
                }
                break;
                case "Reception":
                    if(empRole == "Reception" || empRole == "Manager" || empRole == "Nettoyage"){
                        cardReseption.appendChild(content);
                    }
                    break;

            case "Conference":
                    cardConference.appendChild(content);
                break;
            default:
               alert("Invalide room");
        }
         }  
    }
}

function close_modal() {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.classList.add("hidden");
    });
}


btnSecurite.addEventListener('click', function(){
    cardSecurite.classList.remove("hidden")
    employer("securite");

    
});

btnServeur.addEventListener('click',function () {
     cardServeur.classList.remove("hidden");
        employer("Technicien");
    });
  
  
     
btnReception.addEventListener('click', function(){
     cardReseption.classList.remove("hidden");
     employer("Reception");

});
  btnConference.addEventListener('click' , function(){
     cardConference.classList.remove("hidden");
     employer("Conference");
    
  })

  btnPersonnel.addEventListener('click', () =>{
     cardPersonnel.classList.remove("hidden");
     employer("Empolyer");
  })

  btnArchives.addEventListener('click', () =>{
     cardArchives.classList.remove("hidden");
     employer("Archives");

  })

function afficher(employer) {
    CardWorker.innerHTML = "";

    let card = document.createElement("div");

    let expHTML = "";

    if (employer.Experiences && employer.Experiences.length > 0) {

        expHTML += `
        <div class="col-span-2 mt-4 p-3 bg-gray-100 rounded-xl border border-gray-300">
            <h2 class="text-sm font-semibold mb-2 text-gray-700 border-b pb-1">
                Expériences Professionnelles
            </h2>
        `;

        employer.Experiences.forEach((exp, index) => {
            expHTML += `
                <div class="p-3 mb-3 rounded-lg bg-white shadow-sm border border-gray-200">
                    <p class="text-xs"><span class="font-semibold">Métier :</span> ${exp.Work}</p>
                    <p class="text-xs"><span class="font-semibold">Description :</span> ${exp.Descreption}</p>
                    <p class="text-xs"><span class="font-semibold">Date Début :</span> ${exp.dateDebut}</p>
                    <p class="text-xs"><span class="font-semibold">Date Fin :</span> ${exp.dateFin}</p>
                </div>
            `;
        });

        expHTML += `</div>`;
    }

  
    card.innerHTML = `
        <div class="p-4 relative">

            <button id="btnCardEmp" class="absolute top-2 right-2 text-gray-400 hover:text-black text-lg">
                ✕
            </button>

            <div class="flex justify-center mb-3">
                <img src="${employer.Photo}" alt="" class="rounded-full w-24 h-24 border-2 border-black">
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">

                <div>
                    <h1><span class="font-semibold">Nom:</span> ${employer.Nom}</h1>
                    <p><span class="font-semibold">Role:</span> ${employer.Rôle}</p>
                </div>

                <div>
                    <p><span class="font-semibold">Email:</span> ${employer.Email}</p>
                    <p><span class="font-semibold">Téléphone:</span> ${employer.telephone}</p>
                </div>

                <!-- Insert experiences here -->
                ${expHTML}

            </div>

        </div>
    `;

   
    card.querySelector("#btnCardEmp").addEventListener("click", () => {
        CardWorker.classList.add("hidden");
    });

    CardWorker.classList.remove("hidden");
    CardWorker.appendChild(card);
}

function zoneVide (){
    if(cardReseption.querySelector == ""){
        cardReseption.classList.add("bg-red-200");
    } else {
        cardReseption.classList.remove("bg-red-200");
    }

}
zoneVide();

function finde (){
    for(let i=0 ; i< Employees.length; i++){
        if(Employees[i].Rôle == "Nettoyage" && Employees[i].Experiences.length>=2){
        
            console.log(Employees[i]);
        }
    }
}
finde();

function trouver(role){
  for(let i=0 ; i<Employees.length; i++){
    if(Employees[i].Rôle == role){
        console.log(Employees[i])
    }
  }
} 
trouver("Manager");

function finded(){
    for(let i=0 ; i<Employees.length ; i+=2){
        if(Employees[i].Rôle == "Manager" || Employees[i].Rôle == "Nettoyage"){
           
        }
    }
}
finded();

