function getCredentials() {
    const idInstance = document.getElementById("idInstance").value.trim();
    const apiToken = document.getElementById("apiToken").value.trim();

    if (!idInstance || !apiToken) {
        throw new Error("Введите idInstance и ApiTokenInstance");
    }

    return { idInstance, apiToken };
}

function showResponse(data) {
    const response = document.getElementById("response");

    if (typeof data === "string") {
        response.value = data;
    } else {
        response.value = JSON.stringify(data, null, 2);
    }
}

function makeChatId(phone) {
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanPhone) {
        throw new Error("Введите номер получателя");
    }

    return cleanPhone + "@c.us";
}

async function apiRequest(url, options = {}) {
    const response = await fetch(url, options);

    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = text;
    }

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}: ${typeof data === "string"
                ? data
                : JSON.stringify(data)}`
        );
    }

    return data;
}

async function getSettings() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const url =
            `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiToken}`;

        const data = await apiRequest(url);

        showResponse(data);
    } catch (error) {
        showResponse("Ошибка: " + error.message);
    }
}

async function getStateInstance() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const url =
            `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiToken}`;

        const data = await apiRequest(url);

        showResponse(data);
    } catch (error) {
        showResponse("Ошибка: " + error.message);
    }
}

async function sendMessage() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const phone =
            document.getElementById("messagePhone").value.trim();

        const message =
            document.getElementById("messageText").value.trim();

        if (!message) {
            throw new Error("Введите текст сообщения");
        }

        const url =
            `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`;

        const data = await apiRequest(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatId: makeChatId(phone),
                message: message
            })
        });

        showResponse(data);

    } catch (error) {
        showResponse("Ошибка: " + error.message);
    }
}

async function sendFileByUrl() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const phone =
            document.getElementById("filePhone").value.trim();

        const urlFile =
            document.getElementById("fileUrl").value.trim();

        const fileName =
            document.getElementById("fileName").value.trim();

        const caption =
            document.getElementById("fileCaption").value.trim();

        if (!urlFile) {
            throw new Error("Введите URL файла");
        }

        if (!fileName) {
            throw new Error("Введите имя файла");
        }

        const body = {
            chatId: makeChatId(phone),
            urlFile: urlFile,
            fileName: fileName
        };

        if (caption) {
            body.caption = caption;
        }

        const url =
            `https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiToken}`;

        const data = await apiRequest(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        showResponse(data);

    } catch (error) {
        showResponse("Ошибка: " + error.message);
    }
}
