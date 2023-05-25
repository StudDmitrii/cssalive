class FormController {

    static setCheckInput(obj, b) {
        $(obj).prop('checked', b);
    }

    static getCheckInput(obj) {
        return $(obj).prop('checked');
    }

    static getConfigFromForm() {
        let settingsComb = {
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
        settingsComb = CSSCombConfigurator.formatToCSSComb(settingsComb);

        let settingsNano = {
            autoprefixer: FormController.getCheckInput('#id_autoprefixer'),
            calc: FormController.getCheckInput('#id_calc'),
            colormin: FormController.getCheckInput('#id_colormin'),
            convertValues: FormController.getCheckInput('#id_convertValues'),
            discardComments: FormController.getCheckInput('#id_discardComments'),
            discardEmpty: settingsComb["remove-empty-rulesets"],
            //discardUnused: FormController.getCheckInput('#id_discardUnused'),
            mergeLonghand: FormController.getCheckInput('#id_mergeLonghand'),
            mergeRules: FormController.getCheckInput('#id_mergeRules'),
            minifyFontValues: FormController.getCheckInput('#id_minifyFontValues'),
            minifyGradients: FormController.getCheckInput('#id_minifyGradients'),
            normalizeWhitespace: FormController.getCheckInput('#id_normalizeWhitespace'),
            zindex: FormController.getCheckInput('#id_zindex'),
        }
        return { comb: settingsComb, nano: settingsNano };
    }

    static setSettingsToForm(settingsComb, settingsNano) {
        for (let element in settingsComb) {
            let obj = '#id_' + element;
            // let val;
            // for (let subval in configVals) {
            //     val = Object.keys(configVals[subval]).find(key => configVals[subval][key] == settings[element]);
            // }
            // FormController.setCheckInput(obj, val);
            if (settingsComb[element] == true) FormController.setCheckInput(obj, true);
            if (settingsComb[element] == false) FormController.setCheckInput(obj, false);
            if (settingsComb[element] == 'lower') FormController.setCheckInput(obj, true);
            if (settingsComb[element] == 'upper') FormController.setCheckInput(obj, false);
            if (settingsComb[element] == 'single') FormController.setCheckInput(obj, true);
            if (settingsComb[element] == 'double') FormController.setCheckInput(obj, false);
            if (element == 'block-indent') $('#id_' + element).val(settingsComb[element]);
        }
        for (let element in settingsNano) {
            let obj = '#id_' + element;
            FormController.setCheckInput(obj, Boolean(settingsNano[element]));
        }
    }
}
