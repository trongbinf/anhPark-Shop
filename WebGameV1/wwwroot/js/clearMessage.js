document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const validationMessages = document.querySelectorAll(".text-danger");
        validationMessages.forEach(function (message) {
            message.textContent = "";
        });

        const validationSummary = document.querySelector("div[asp-validation-summary='ModelOnly']");
        if (validationSummary) {
            validationSummary.textContent = "";
        }
    }, 6000);
});
