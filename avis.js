// Fonction pour ajouter les écouteurs d'avis sur les boutons correspondants à chaque pièce
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
            // Récupération de l'ID de la pièce associée au bouton sur lequel on a cliqué
            const id = event.target.dataset.id;
            // Requête pour récupérer les avis de la pièce depuis l'API
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
            const avis = await reponse.json(); // Transformation de la réponse en format JSON
            // Stockage des avis dans le localStorage avec une clé unique basée sur l'ID de la pièce
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));
            const pieceElement = event.target.parentElement;
        });
    }
}

// Fonction pour afficher les avis d'une pièce dans le DOM
export function afficherAvis(pieceElement, avis) {
    const avisElement = document.createElement("p");
    for (let i = 0; i < avis.length; i++) {
        // Affichage des avis sous la forme "Utilisateur: Commentaire"
        avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
    }
    pieceElement.appendChild(avisElement); // Ajout des avis à l'élément du DOM correspondant à la pièce
}

// Fonction pour ajouter le listener à l'événement "submit" du formulaire d'envoi d'avis
export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();
        // Création de l'objet du nouvel avis.
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value)
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);
        
        // Appel de la fonction fetch avec toutes les informations nécessaires pour envoyer l'avis à l'API
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
    });
}


export async function afficherGraphiqueAvis() {
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    // Calculer le nb de commentaires pour chaque niveau d'étoiles de 1 à 5, tableau de 5 éléments initialisés à 0
    const nb_commentaires = [0, 0, 0, 0, 0];

    for (let commentaire of avis) {
        // Incrémenter les éléments de la liste correspondante au nb d'étoiles attribuées
        nb_commentaires[commentaire.nbEtoiles - 1]++;
    }
    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labels = ["5", "4", "3", "2", "1"];
    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
            label: "Étoiles attribuées",
            data: nb_commentaires.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
        }],
    };
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    };
    // Rendu du graphique dans l'élément canvas
    const graphiqueAvis = new Chart(
        document.querySelector("#graphique-avis"),
        config,
    );
}