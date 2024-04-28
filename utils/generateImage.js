const fetch = require("node-fetch");
// const FormData = require("form-data");

require("dotenv").config();


const generateImage = async function (prompt) {
    const form = new FormData();
    form.append("prompt", prompt);
    const res = await fetch("https://clipdrop-api.co/text-to-image/v1", {
        method: "POST",
        headers: {
            "x-api-key": process.env.API_KEY,
        },
        body: form,
    });
    const buffer = await res.arrayBuffer();
    const blob = new Blob([buffer], { type: "image/jpeg" }); // Assuming response is JPEG
    const imageUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.src = imageUrl;

    img.width = 300;
    img.height = 300;
    return img;
};
module.exports.generateImage=generateImage;
