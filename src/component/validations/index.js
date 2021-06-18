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
    if (value === "") {
        return {
            result: false,
            message: "El campo es requerido",
        };
    }
    if (value.length > 3) {
        if (value.length <= 40) {
            if (/^[a-zA-ZñáéíóúÑÁÉÍÓÚ\-\s]+$/.test(value)) {
                return {
                    result: true,
                    message: "",
                };
            }
            else {
                return {
                    result: false,
                    message: "Sólo se aceptan letras",
                };
            }
        } else {
            return {
                result: false,
                message: "El nombre es muy largo",
            };
        }
    } else {
        return {
            result: false,
            message: "Debe ingresar como mínimo 4 caracteres",
        };
    }
}

export function validateDescription(value) {
    if (value === "") {
        return {
            result: false,
            message: "El campo es requerido",
        };
    }
    if (value.length > 3) {
        if (value.length <= 100) {
            if (/^[0-9a-zA-Z0-9ñáéíóúÑÁÉÍÓÚ\s.$%&/()=?!¿]+$/.test(value)) {
                return {
                    field: "description",
                    result: true,
                    message: "",
                };
            }
            else {
                return {
                    result: false,
                    message: "Los caracteres no son válidos",
                };
            }
        }
        else {
            return {
                result: false,
                message: "Las descripción es muy larga",
            };
        }
    } else {
        return {
            result: false,
            message: "Debe ingresar como mínimo 4 caracteres",
        };
    }
}

export function validateImage(value, required = false) {
    if (!required && value === "") {
        return {
            result: true,
            message: ""
        };
    }
    const result = /\.(gif|svg|jpg|png|jpeg|webp|bmp|tiff?)$/.test(value);
    if (result) {
        return {
            result: true,
            message: ""
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
    if (value === "") {
        return {
            result: false,
            message: "El campo es requerido",
        };
    }
    if (value.length > 6) {
        if (value.length > 80) {
            if (/^[a-zA-Z0-9ñáéíóúÑÁÉÍÓÚ!#$%&'*+/=?^_\s]+$/.test(value)) {
                return {
                    result: true,
                    message: "",
                };
            }
            else {
                return {
                    result: false,
                    message: "Los caracteres no son válidos",
                };
            }
        } else {
            return {
                result: false,
                message: "La dirección es muy larga",
            };
        }
    }
    else {
        return {
            result: false,
            message: "Dirección no válida",
        };
    }
}

export function validateTelefono(value) {
    if (value === "") {
        return {
            result: false,
            message: "El campo es requerido",
        };
    }

    const result = /^[0-9]{10}$/.test(value);
    if (result) {
        return {
            result: true,
            message: "",
        };
    }
    return {
        result: false,
        message: "Sólo se aceptan 10 dígitos",
    };
}

export function validateEmail(value) {
    if (value === "") {
        return {
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
            result: true,
            message: "",
        };
    }
    return {
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
            field: field,
            message: "El campo es requerido",
        };
    }

    const result = /^([0-9]+)(|.([0-9][0-9])?)$/.test(value);
    if (result) {
        return {
            result: true,
            message: "",
        };
    }
    return {
        result: false,
        message: "Número con dos decimales.",
    };
}
