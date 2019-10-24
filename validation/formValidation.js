module.exports.registerValidation = (username, password) => {
  const errors = [];
  if (username === "") {
    errors.push({ message: "Please fill the username area" });
  }

  if (password === "") {
    errors.push({ message: "Please fill the password area" });
  }
  if (password.length < 8) {
    errors.push({ message: "Password Minimum Lenght Must be 8" });
  }


  return errors;
};
