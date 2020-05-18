const apiKey = 'AIzaSyCnBhvmTSt5ArxICjTd9jpmWkCoALYv4XI';
const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
const detectionType = 'TEXT_DETECTION';

function previewFile() {
    document.querySelector('.pic').innerHTML = '';
    document.querySelector('.right').innerHTML = '';
    const preview = document.createElement('img');
    document.querySelector('.pic').appendChild(preview);
    preview.width = 250;
    const file = document.querySelector('#uploadPic').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
        let base64result = reader.result.split(',')[1];
        sendRequest(base64result);
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

const sendRequest = (imageData) => {

    const request = {
        "requests": [
            {
                "image": {
                    "content": imageData
                },
                "features": [
                    {
                        "type": detectionType,
                        "maxResults": 200
                    }
                ]
            }
        ]
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let json = JSON.parse(xhr.responseText);
            let textData = json.responses[0].textAnnotations[0].description;
            window.console.log(json);
            let textResult = document.querySelector('#photoText');
            textResult.innerHTML = '';
            let title = document.createElement('h4');
            title.textContent = "Recognized text from the photo: ";
            textResult.append(title);
            let parseData = document.createElement('textarea');
            parseData.cols = 50;
            parseData.rows = 20;
            parseData.textContent = textData;
            textResult.append(parseData);
        }
    }
    var data = JSON.stringify(request);
    xhr.send(data);
}