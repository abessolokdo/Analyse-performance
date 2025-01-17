$(document).ready(function () {
    // Écouter le clic sur le bouton d'envoi
    $('.btn-submit').click(function () {
        // Récupérer les données du formulaire
        const data = {
            employee_name: $('input[name="employee_name"]').val(),
            department: $('input[name="department"]').val(),
            id: $('input[name="id"]').val(),
            position: $('input[name="position"]').val(),
            evaluator_name: $('input[name="evaluator_name"]').val(),
            evaluation_date: $('input[name="evaluation_date"]').val(),
            work_quality: $('input[name="work_quality"]:checked').val(),
            performance_quality: $('input[name="performance_quality"]:checked').val(),
            work_consistency: $('input[name="work_consistency"]:checked').val(),
            communication: $('input[name="communication"]:checked').val(),
        };

        // Envoyer les données au serveur via une requête POST
        $.post('/submit', data, function (response) {
            alert(response.message); // Afficher un message de succès
        }).fail(function () {
            alert('Une erreur s\'est produite. Veuillez réessayer.'); // Message d'erreur
        });
    });
});
