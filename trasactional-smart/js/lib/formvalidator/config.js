var espanol = {
    errorTitle: 'El envio del formulario ha fallado!',
    requiredFields: 'Campo obligatorio',
    badTime: 'You have not given a correct time',
    badEmail: 'E-mail no válido',
    badTelephone: 'You have not given a correct phone number',
    badSecurityAnswer: 'You have not given a correct answer to the security question',
    badDate: 'You have not given a correct date',
    lengthBadStart: 'The input value must be between ',
    lengthBadEnd: ' characters',
    lengthTooLongStart: 'The input value is longer than ',
    lengthTooShortStart: 'The input value is shorter than ',
    notConfirmed: 'Las contraseñas no coinciden',
    badDomain: 'Incorrect domain value',
    badUrl: 'The input value is not a correct URL',
    badCustomVal: 'The input value is incorrect',
    andSpaces: ' and spaces ',
    badInt: 'Solo dígitos numéricos',
    badSecurityNumber: 'Your social security number was incorrect',
    badUKVatAnswer: 'Incorrect UK VAT Number',
    badStrength: 'The password isn\'t strong enough',
    badNumberOfSelectedOptionsStart: 'You have to choose at least ',
    badNumberOfSelectedOptionsEnd: ' answers',
    badAlphaNumeric: 'The input value can only contain alphanumeric characters ',
    badAlphaNumericExtra: ' and ',
    wrongFileSize: 'Excede el máximo de %s permitidos',
    wrongFileType: 'Solo extensiones %s',
    groupCheckedRangeStart: 'Please choose between ',
    groupCheckedTooFewStart: 'Please choose at least ',
    groupCheckedTooManyStart: 'Please choose a maximum of ',
    groupCheckedEnd: ' item(s)',
    badCreditCard: 'The credit card number is not correct',
    badCVV: 'The CVV number was not correct'
};
    
$.validate({
    language: espanol,
    validateOnBlur : false,
    scrollToTopOnError : false
}); 