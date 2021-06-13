export function inputsValidate(input, value, messageE) {
    let response;
    switch (input[0]) {
        case "nombre":
            response = validateName(value);
            messageE.name = response.message;
            messageE.result = response.result;
            break;
        case "descripcion":
            response = validateDescription(value);
            messageE.description = response.message;
            messageE.result = response.result;
            break;
        case "imagen":
            response = validateImage(value);
            messageE.image = response.message;
            messageE.result = response.result;
            break;
        default:
            break;
    }
}

export function validateName(value) {
    if (value == "") {
        return {
            field: "name",
            result: false,
            message: "El campo es requerido",
        };
    }
    if (value.length > 3) {
        if (/^[a-zA-Z\s]+$/.test(value)) {
            return {
                field: "name",
                result: true,
                message: "",
            };
        }
        else {
            return {
                field: "name",
                result: false,
                message: "Sólo se aceptan letras",
            };
        }
    } else {
        return {
            field: "name",
            result: false,
            message: "Debe ingresar como mínimo 4 caracteres",
        };
    }
}

export function validateDescription(value) {
    if (value == "") {
        return {
            field: "description",
            result: false,
            message: "El campo es requerido",
        };
    }
    if (value.length > 3) {
        if (/^[a-zA-Z0-9\s]+$/.test(value)) {
            return {
                field: "description",
                result: true,
                message: "",
            };
        }
    } else {
        return {
            field: "description",
            result: false,
            message: "Debe ingresar como mínimo 4 caracteres",
        };
    }
}

export function validateImage(value, required = false) {
    if (!required && value === "") {
        return {
            result: true,
        };
    }
    const result = /\.(gif|svg|jpg|png|jpeg|webp|bmp|tiff?)$/.test(value);
    if (result) {
        return {
            result: true,
        };
    }

    return {
        result: false,
        message: "El archivo no es una imagen",
    };
}



/////////////////////////////////////////////////////////////////////////////////////////////

export function inputsValidate2(input, value, messageE) {
    let response;
    switch (input[0]) {
        case "nombre":
            response = validateName(value);
            messageE.name = response.message;
            messageE.result = response.result;
            break;
        case "direccion":
            const respons = validateDireccion(value);
            messageE.address = respons.message;
            messageE.result = respons.result;
            break;
        case "telefono":
            response = validateTelefono(value);
            messageE.phone = response.message;
            messageE.result = response.result;
            break;
        case "correo":
            response = validateEmail(value);
            messageE.email = response.message;
            messageE.result = response.result;
            break;
        default:
            break;
    }
}


export function validateDireccion(value) {
    if (value == "") {
        return {
            field: "address",
            result: false,
            message: "El campo es requerido",
        };
    }
    if (value.length > 6 || /^[a-zA-Z0-9\s]+$/.test(value)) {
        return {
            field: "address",
            result: true,
            message: "",
        };
    }
    return {
        field: "address",
        result: false,
        message: "Debe ingresar como mínimo 4 caracteres",
    }
}

export function validateTelefono(value) {
    if (value === "") {
        return {
            result: false,
            field: "phone",
            message: "El campo es requerido",
        };
    }

    const result = /^[0-9]{10}$/.test(value);
    if (result) {
        return {
            field: "phone",
            result: true,
            message: "",
        };
    }
    return {
        field: "phone",
        result: false,
        message: "Sólo se aceptan 10 dígitos",
    };
}

export function validateEmail(value) {
    if (value === "") {
        return {
            field: "email",
            result: false,
            message: "El campo es requerido",
        };
    }
    // eslint-disable-next-line no-control-regex
    const result = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        value
    );
    if (result) {
        return {
            field: "email",
            result: true,
            message: "",
        };
    }
    return {
        field: "email",
        result: false,
        message: "Ingresa un correo electrónico válido",
    };
}


////////////////////////////////////////////////////////////////////////////////////////////////////

export function inputsValidate3(input, value, messageE) {
    let response;
    switch (input[0]) {
        case "nombre":
            response = validateName(value);
            messageE.name = response.message;
            messageE.result = response.result;
            break;
        case "descripcion":
            response = validateDescription(value);
            messageE.description = response.message;
            messageE.result = response.result;
            break;
        case "imagen":
            response = validateImage(value);
            messageE.image = response.message;
            messageE.result = response.result;
            break;
        case "precio_venta":
            response = validatePrecio(value, "p_venta");
            messageE.p_venta = response.message;
            messageE.result = response.result;
            break;
        case "precio_compra":
            response = validatePrecio(value, "p_compra");
            messageE.p_compra = response.message;
            messageE.result = response.result;
            break;
        default:
            break;
    }
}


export function validatePrecio(value, field) {
    if (value === "") {
        return {
            result: false,
            field: field,
            message: "El campo es requerido",
        };
    }

    const result = /^([0-9]+)(|.([0-9][0-9])?)$/.test(value);
    if (result) {
        return {
            field: field,
            result: true,
            message: "",
        };
    }
    return {
        field: field,
        result: false,
        message: "Número con dos decimales.",
    };
}
