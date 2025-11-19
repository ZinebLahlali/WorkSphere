const AddWorker = document.getElementById("AddWorker");
const Forml = document.getElementById("forml");
const MonForm = document.getElementById("monForm");
const NomePrenom = document.getElementById("nomPrenom");
const Role = document.getElementById("role");
const Photo = document.getElementById("photo");
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





AddWorker.addEventListener('click', () => {
    Forml.classList.toggle('hidden')
})
AjouterExp.addEventListener('click', () => {
    const printexperience = document.createElement("div");
    printexperience.innerHTML = `
<div class="border-2 border-black mt-3">
                        <div>
                            <label for="Exper">Expériences</label>
                        </div>
                        <div>
                         <input class="border-2 rounded-lg p-2" type="text" name="metier" id="metier" required>
                        </div>
                        <div>
                            <label for="descreption">Description</label>
                        </div>
                        <div class="mt-2">
                         <textarea  class="border-2 rounded-lg p-2" name="descreption" id="descreption" required></textarea>
                        </div>
                       <div class="flex gap-4 mt-4">
                        <div class="flex flex-rows gap-1">
                         <span>à</span> <input class="border-2 rounded-lg p-1 h-fit" type="date" name="dateDebut" id="dateDebut" required/>
                       </div>
                       <div class="flex flex-rows gap-1">
                        <span>de</span> <input class="border-2 rounded-lg p-1 h-fit" type="date" name="dateFin" id="dateFin" required/>
                       </div>
                       </div>
</div>
`;
    experience.appendChild(printexperience);
})



