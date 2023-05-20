class FormController {

    static setCheckInput(obj, b) {
        $(obj).prop('checked', b);
    }

    static getCheckInput(obj) {
        return $(obj).prop('checked');
    }

    static getConfigFromForm() {
        let settings = {
            "always-semicolon": FormController.getCheckInput('#id_always-semicolon'),
            "block-indent": Number($('#id_block-indent').val()),
            "color-case": FormController.getCheckInput('#id_color-case'),
            "color-shorthand": FormController.getCheckInput('#id_color-shorthand'),
            "element-case": FormController.getCheckInput('#id_element-case'),
            "eof-newline": FormController.getCheckInput('#id_eof-newline'),
            "leading-zero": FormController.getCheckInput('#id_leading-zero'),
            "quotes": FormController.getCheckInput('#id_quotes'),
            "remove-empty-rulesets": FormController.getCheckInput('#id_remove-empty-rulesets'),
            "strip-spaces": FormController.getCheckInput('#id_strip-spaces'),
            "unitless-zero": FormController.getCheckInput('#id_unitless-zero'),
            "vendor-prefix-align": FormController.getCheckInput('#id_vendor-prefix-align'),
        };
        return CSSCombConfigurator.formatToCSSComb(settings);
    }
    
    static setSettingsToForm(settings) {
        for (let element in settings) {
            let obj = '#id_' + element;
            // let val;
            // for (let subval in configVals) {
            //     val = Object.keys(configVals[subval]).find(key => configVals[subval][key] == settings[element]);
            // }
            // FormController.setCheckInput(obj, val);
            if (settings[element] == true) FormController.setCheckInput(obj, true);
            if (settings[element] == false) FormController.setCheckInput(obj, false);
            if (settings[element] == 'lower') FormController.setCheckInput(obj, true);
            if (settings[element] == 'upper') FormController.setCheckInput(obj, false);
            if (settings[element] == 'single') FormController.setCheckInput(obj, true);
            if (settings[element] == 'double') FormController.setCheckInput(obj, false);
            if (element == 'block-indent') $('#id_' + element).val(settings[element]);
        }
    }
}
