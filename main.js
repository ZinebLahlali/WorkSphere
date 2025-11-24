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
const CardEmployer = document.getElementById("cardEmployer");
const cardServeur = document.getElementById("cardServeur")
const cardReseption = document.getElementById("cardReseption");
const cardArchives = document.getElementById("cardArchives")
const cardConference = document.getElementById("cardConference")
const removeCard = document.querySelectorAll(".removeCard");
const CardAffichage = document.getElementById("CardAffichage");
const CardWorker = document.getElementById("CardWorker");
const cardPersonnel = document.getElementById("cardPersonnel");
//Buttons
const btnSecurite = document.getElementById("btnSecurite");
const btnServeur = document.getElementById("btnServeur");
const btnReception = document.getElementById("btnReception");
const btnConference = document.getElementById("btnConference");
const btnPersonnel = document.getElementById("btnPersonnel");
const brnArchives = document.getElementById("brnArchives");
const btnCardEmp = document.getElementById("btnCardEmp");



// const Globalarry = []
let id=1;
const Employees = JSON.parse(localStorage.getItem("employees")) || [];

AddWorker.addEventListener("click", () => {
    Forml.classList.toggle("hidden");
});
AjouterExp.addEventListener("click", () => {
    const printexperience = document.createElement("div");
    console.log(printexperience);
    printexperience.innerHTML = `
<div class="border-2 border-black mt-3 p-2">
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
        Rôle: Role.value ,
        Id : id,
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
 id++;
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
        <div class="border border-2 rounded-lg flex gap-2 p-1">
    <img src="${Employees[i].Photo || "avatar.jpg"}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
    <div class="">
        <p class="text-xs">${Employees[i].Nom}</p>
        <p class="text-xs">${Employees[i].Rôle}</p>
    </div>
    </div>
    `;
        
    printData.dataset.id= Employees[i].Id;
        printData.addEventListener("click", () => {
          alert(Employees[i].Id)
         afficher(Employees[i]);
           
        });

        Card.appendChild(printData);
    }
}

load();
function employer(role) {
    
    CardEmployer.innerHTML="";
    cardServeur.innerHTML = "";
    cardReseption.innerHTML = "";
    cardPersonnel.innerHTML = "";
    cardConference.innerHTML = "";
    cardArchives.innerHTML = "";

    for (let i = 0; i < Employees.length; i++) {
         const empRole = Employees[i].Rôle
         
        switch (role) {
            case "securite":
                if (Employees[i].Rôle == "securite" || Employees[i].Rôle == "Manager" || Employees[i].Rôle == "Nettoyage") {
          let content = document.createElement('div');
                    content.innerHTML = `
                    <div>
                  <img src="${Employees[i].Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
                    <div>
                        <p class="text-xs">${Employees[i].Nom}</p>
                        <p class="text-xs">${Employees[i].Rôle}</p>
                    </div>
                    </div>
                `;
                    CardEmployer.appendChild(content);
                }
                break;
            case "Technicien":
                
                if (Employees[i].Rôle == "Technicien" || Employees[i].Rôle == "Manager" || Employees[i].Rôle == "Nettoyage") {
                 let content = document.createElement('div');
                    content.innerHTML = `
                  <img src="${Employees[i].Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
                    <div>
                        <p class="text-xs">${Employees[i].Nom}</p>
                        <p class="text-xs">${Employees[i].Rôle}</p>
                    </div>
                `;
                    cardServeur.appendChild(content);
                }
                break;
            case "Reception":
              
                console.log(Employees[i].Rôle);
                if (Employees[i].Rôle == "Reception" || Employees[i].Rôle == "Manager" || Employees[i].Rôle == "Nettoyage") {
                    let content = document.createElement('div');
                         content.innerHTML = `
                  <img src="${Employees[i].Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
                    <div>
                        <p class="text-xs">${Employees[i].Nom}</p>
                        <p class="text-xs">${Employees[i].Rôle}</p>
                    </div>
                `;
                    cardReseption.appendChild(content);
                }
                break;


            case "Empolyer":
              
                if (Employees[i].Rôle == "Empolyer" || Employees[i].Rôle == "Manager" || Employees[i].Rôle == "Nettoyage") {
                    let content = document.createElement('div');
                          content.innerHTML = `
                  <img src="${Employees[i].Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
                    <div>
                        <p class="text-xs">${Employees[i].Nom}</p>
                        <p class="text-xs">${Employees[i].Rôle}</p>
                    </div>
                `;
                    cardPersonnel.appendChild(content);
                }
                break;
                case "All":
      
                    if(Employees[i].Rôle == "Empolyer" || Employees[i].Rôle == "Manager" || Employees[i].Rôle == "Nettoyage"
                        || Employees[i].Rôle == "Technicien" || Employees[i].Rôle == "Reception" || Employees[i].Rôle == "securite"){
                             let content = document.createElement('div');
                          content.innerHTML = `
                  <img src="${Employees[i].Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
                    <div>
                        <p class="text-xs">${Employees[i].Nom}</p>
                        <p class="text-xs">${Employees[i].Rôle}</p>
                    </div>
                `;
                    cardConference.appendChild(content);
                }
                break;
            default:
               message = "Employer est invalide";


        }


    }
}


btnSecurite.addEventListener('click', function(){
    CardEmployer.classList.remove("hidden")
    cardServeur.classList.add("hidden")
    cardReseption.classList.add("hidden")
    employer("securite");
});

btnServeur.addEventListener('click',function () {
        cardServeur.classList.remove("hidden");
        CardEmployer.classList.add("hidden");
        cardReseption.classList.add("hidden")
        employer("Technicien");
    });

btnReception.addEventListener('click', function(){
        console.log("HEllO");
    cardServeur.classList.add("hidden")
    CardEmployer.classList.add("hidden")
    cardReseption.classList.remove("hidden")
    employer("Reception");

});
  btnConference.addEventListener('click' , function(){
    cardServeur.classList.add("hidden")
    CardEmployer.classList.add("hidden")
    cardReseption.classList.add("hidden")
     cardConference.classList.remove("hidden");
     employer("")
    
  })

  btnPersonnel.addEventListener('click', () =>{
    cardServeur.classList.add("hidden")
    CardEmployer.classList.add("hidden")
    cardReseption.classList.add("hidden")
    cardPersonnel.classList.remove("hidden");
  })

  
function afficher(employer){
 CardWorker.innerHTML = "";
  let card = document.createElement('div');

  card.innerHTML = `
   
   <div>
    <button id="btnCardEmp" class= "text-gray-300">X</button>
   <div class="flex justify-center">
    <img src="${employer.Photo}" alt="" class="rounded-full w-[15%] h-[10%] border-2 border-black">
    </div>
                <div class="grid grid-cols-2 gap-3 ">
                    <div>
                        <p class="text-xs">Nom: ${employer.Nom}</p>
                        <p class="text-xs">Role:${employer.Rôle}</p>
                    </div>
                    <div>
                    <p class="text-xs">Email:${employer.Email}</p>
                    <p class="text-xs">Numero de Telephone:${employer.telephone}</p>
                    </div>
                    <div>
                     <p text-xs>Metier:${employer.Metier}</p>
                      <p text-xs>Date de debut:${employer.DateDebut}</p>
                    
                    </div>
                    <div>
                        <p text-xs>Descreption:${employer.Descreption}</p>
                       <p text-xs>Date de fin:${employer.dateFin}</p>
                    </div>
                 </div>   

   </div>
  
  
  `;
  card.querySelector("#btnCardEmp").addEventListener("click",()=>{
CardWorker.classList.add("hidden");
  })

  CardWorker.classList.remove("hidden")
  CardWorker.appendChild(card);

 





}


   