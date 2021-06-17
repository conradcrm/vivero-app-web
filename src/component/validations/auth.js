export function validateEmail(data) {
  let message = '';
  let result = false;
  if (data === "") {
    message = "El campo es requerido";
    return { message, result };
  }

  result = data.match("^\\w{4,18}@[a-z]{3,}\\.[a-z]{2,4}");
  message = result ? message : message = "El correo no es válido";
  return { message, result };
}

export function validatePassword(data) {
  let message = '';
  let result = false;
  try {
    if (!data.match("^(?=.{6,})")) {
      message = "Debe contener almenos 6 caracteres";
    } else if (!data.match("^(?=.*[a-z])")) {
      message = "Debe contener minúsculas";
    } else if (!data.match("^(?=.*[A-Z])")) {
      message = "Debe contener mayúsculas";
    } else if (!data.match("^(?=.*[0-9])")) {
      message = "Debe contener números";
    } else if (!data.match("^(?=.*[!@#\\$\\%\\&\\*])")) {
      message = "Debe contener caracteres especiales ! @ # $ % *";
    } else {
      result = true;
    }
  } catch (error) { }
  return { message, result };
}

export function inputsValidate(name, data) {
  let response;
  switch (name) {
    case "name":
      response = validateName(data);
      break;
    case "email":
      response = validateEmail(data);
      break;
    case "password":
      response = validatePassword(data);
      break;
      default:
        break;
  }
  return response;
}

export function validateName(data) {
  let message = '';
  let result = false;
  if (data === "") {
    message = "El campo es requerido";
    return { message, result };
  }

  result = data.length >= 3 && /[a-zA-ZñáéíóúÑÁÉÍÓÚ\s]+/.test(data);
  message = result ? message : message = "El nombre no es válido";
  return { message, result };
}