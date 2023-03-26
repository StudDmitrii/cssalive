function loadFile(input){
    let file = input.files[0];
    var fileReader = new FileReader();

    fileReader.readAsText(file);

    fileReader.onload = function() {
        editor.setValue(fileReader.result);
    };

    /*fileReader.onerror = function() {
        editor.setValue("error");
    };*/
}