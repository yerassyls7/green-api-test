function getCredentials() {
    const idInstance = document.getElementById("idInstance").value.trim();
    const apiToken = document.getElementById("apiToken").value.trim();

    if (!idInstance || !apiToken) {
        throw new Error("Please enter idInstance and ApiTokenInstance");
    }

    return { idInstance, apiToken };
}

function showResponse(data) {
    document.getElementById("response").value =
        typeof data === "string"
            ? data
            : JSON.stringify(data, null, 2);
}

async function getSettings() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const url =
            `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiToken}`;

        const response = await fetch(url);
        const data = await response.json();

        showResponse(data);
    } catch (error) {
        showResponse({
            error: error.message
        });
    }
}

async function getStateInstance() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const url =
            `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiToken}`;

        const response = await fetch(url);
        const data = await response.json();

        showResponse(data);
    } catch (error) {
        showResponse({
            error: error.message
        });
    }
}

function makeChatId(phone) {
    phone = phone.trim();

    if (phone.includes("@c.us")) {
        return phone;
    }

    return `${phone}@c.us`;
}

async function sendMessage() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const phone = document.getElementById("messagePhone").value.trim();
        const message = document.getElementById("messageText").value.trim();

        if (!phone || !message) {
            throw new Error("Please enter phone number and message");
        }

        const url =
            `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`;

        const body = {
            chatId: makeChatId(phone),
            message: message
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        showResponse(data);
    } catch (error) {
        showResponse({
            error: error.message
        });
    }
}

async function sendFileByUrl() {
    try {
        const { idInstance, apiToken } = getCredentials();

        const phone = document.getElementById("filePhone").value.trim();
        const urlFile = document.getElementById("fileUrl").value.trim();
        const fileName = document.getElementById("fileName").value.trim();
        const caption = document.getElementById("fileCaption").value.trim();

        if (!phone || !urlFile || !fileName) {
            throw new Error(
                "Please enter phone number, file URL and file name"
            );
        }

        const url =
            `https://api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiToken}`;

        const body = {
            chatId: makeChatId(phone),
            urlFile: urlFile,
            fileName: fileName
        };

        if (caption) {
            body.caption = caption;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        showResponse(data);
    } catch (error) {
        showResponse({
            error: error.message
        });
    }
}
