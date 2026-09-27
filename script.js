async function getSettings() {
    const idInstance = document.getElementById("idInstance").value;
    const apiToken = document.getElementById("apiToken").value;
    const responseField = document.getElementById("response");

    if (!idInstance || !apiToken) {
        responseField.value = "Введите idInstance и ApiTokenInstance";
        return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        responseField.value = JSON.stringify(data, null, 2);
    } catch (error) {
        responseField.value = "Ошибка: " + error.message;
    }
}


async function getStateInstance() {
    const idInstance = document.getElementById("idInstance").value;
    const apiToken = document.getElementById("apiToken").value;
    const responseField = document.getElementById("response");

    if (!idInstance || !apiToken) {
        responseField.value = "Введите idInstance и ApiTokenInstance";
        return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        responseField.value = JSON.stringify(data, null, 2);
    } catch (error) {
        responseField.value = "Ошибка: " + error.message;
    }
}
