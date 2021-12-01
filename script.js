// Initialisation des variables

const write_total = document.querySelectorAll("#total");
const write_number = document.querySelectorAll('#Nb_pizza')
const ajouter = document.querySelectorAll('#add_pizza');
const supprimer = document.querySelectorAll('#remove_pizza')
const affichertotal = document.querySelector('#Total_cmd')
const payment = document.querySelector("#smart-button-container")
let total = 0;
let sub_total = 0;


let nb_pizza =
    [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];


// Description de l'evenement click sur le bouton + 

ajouter.forEach((element, i) => (element.addEventListener("click", () => {


    // Creation d'un tableau pour savoir le nombre de pizza commandé de chaque reference
    nb_pizza[i] = Number(nb_pizza[i]) + 1;
    nb = nb_pizza[i];

    // Creation d'un "Objet" pour recuperer les données qui concerne chaque pizza
    let pizzas = new Map();

    // Creation d'un tableau pour recuperer les elements du click 
    let pizza_prix = [];

    // Recuperation des elements du boutons qui sont ajoutés dans le tableau
    pizza_prix = element.value

    // Recuperation des données pour le rajouter dans l'objet
    pizzas.set(i, pizza_prix);

    // La boucle for est la pour parcourir les valeurs de l'objet
    for (const [key, value] of pizzas) {

        // On va comparé i (qui est la reference de la pizza) a la clé du tableau pour recuperer sont prix 
        if (key === i) {
            // Espace Cacul
            total = totalcommande(Number(total), Number(value));
            sub_total = nb * value;

            // Affichage des valeurs trouvées
            write_number[key].innerHTML = `${nb}`
            write_total[key].innerHTML = `${sub_total}€`
            if (total > 0) { payment.style.display = "block"; } else { payment.style.display = "none" }
        }

    }
    affichertotal.innerHTML = `Le total = ${total}€`
})));

// Description de l'evenement click sur le bouton -

supprimer.forEach((element, i) => (element.addEventListener("click", () => {

// On va d'abors regarder si il est possible de supprimer un element si ce n'est pas le cas il ne se passera rien 

    if (nb_pizza[i] != 0) {

         // Creation d'un tableau pour savoir le nombre de pizza commandé de chaque reference
        nb_pizza[i] = Number(nb_pizza[i]) - 1;
        nb = nb_pizza[i];

         // Creation d'un "Objet" pour recuperer les données qui concerne chaque pizza
        let pizzas = new Map();

        // Creation d'un "Objet" pour recuperer les données qui concerne chaque pizza
        let pizza_prix = [];

        // Recuperation des elements du boutons qui sont ajoutés dans le tableau
        pizza_prix = element.value

        // Recuperation des données pour le rajouter dans l'objet
        pizzas.set(i, pizza_prix);


        // La boucle for est la pour parcourir les valeurs de l'objet// La boucle for est la pour parcourir les valeurs de l'objet
        for (const [key, value] of pizzas) {

             // On va comparé i (qui est la reference de la pizza) a la clé du tableau pour recuperer sont prix 
            if (key === i) {
                // Espace Cacul
                chiffre_neg = -Math.abs(value);
                total = totalcommande(Number(total), chiffre_neg);
                sub_total = nb * value;

                // Affichage des valeurs trouvées
                write_number[key].innerHTML = `${nb}`
                write_total[key].innerHTML = `${sub_total}€`
                if (total > 0) { payment.style.display = "block"; } else { payment.style.display = "none" }
            }
        }
    }
    affichertotal.innerHTML = `Le total = ${total}€`
})))
total = totalcommande(total, sub_total)
affichertotal.innerHTML = `Le total = ${total}€`

// Fonction pour le calcul du total du prix des pizzas
function totalcommande(resultat, valeur1) {
    resultat = resultat + valeur1
    return resultat;

}

// Espace Copier coller du paypal avec juste l'insertion de notre prix 13 ligne plus bas  
function initPayPalButton() {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',

        },

        createOrder: function (data, actions) {
            return actions.order.create({
                // Le seul endroit que j'ai modifié ou j'ai inseré le total de ma commande 
                purchase_units: [{ "amount": { "currency_code": "EUR", "value": total } }]
            });
        },

        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {

                // Full available details
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                // Show a success message within this page, e.g.
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '';
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                // Or go to another URL:  actions.redirect('thank_you.html');

            });
        },

        onError: function (err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
}
initPayPalButton();


