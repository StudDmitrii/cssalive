function loadFile(input) {
    let file = input.files[0];

    //return if wrong types
    if (input.name.includes("css") && file.name.match(/\.([^.]+)$|$/)[1] != "css") return;
    else if (input.name.includes("html") && file.name.match(/\.([^.]+)$|$/)[1] != "html") return;

    var fileReader = new FileReader();

    fileReader.readAsText(file);

    fileReader.onload = function () {
        send(fileReader.result);
    };

    fileReader.onerror = function () {
        send("ОШИБКА ЗАГРУЗКИ ФАЙЛА!");
    };

    function send(msg) {
        if (input.name.includes("css"))
            editor.setValue(msg);
        else
            editor2.setValue(msg);
    }
}