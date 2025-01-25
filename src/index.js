const form = document.getElementById("form");
const successToast = document.getElementById("success-toast");

const inputFirstName = document.getElementById("first-name");
const inputLastName = document.getElementById("last-name");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("message");
const radioQueryType = document.querySelectorAll('input[name="query-type"]');
const radioQueryTypeGeneral = document.getElementById("query-type-general");
const radioQueryTypeSupport = document.getElementById("query-type-support");
const checkbox = document.getElementById("checkbox");

const errorTextFirstName = document.getElementById("error-text-first-name");
const errorTextLastName = document.getElementById("error-text-last-name");
const errorTextEmail = document.getElementById("error-text-email");
const errorTextQueryType = document.getElementById("error-text-query-type");
const errorTextMessage = document.getElementById("error-text-message");
const errorTextCheckbox = document.getElementById("error-text-checkbox");

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function setErrorStyle(input, errorText, message) {
  if (input) {
    input.classList.add("border-red-error");
  }

  errorText.classList.remove("hidden");
  errorText.textContent = message;
}

function removeErrorStyle(input, errorText) {
  if (input) {
    input.classList.remove("border-red-error");
  }
  errorText.classList.add("hidden");
  errorText.textContent = "";
}

function resetInput() {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputEmail.value = "";
  inputMessage.value = "";
  radioQueryTypeGeneral.removeAttribute("checked");
  radioQueryTypeSupport.removeAttribute("checked");
  checkbox.removeAttribute("checked");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputFirstName.value === "") {
    setErrorStyle(inputFirstName, errorTextFirstName, "This field is required");
  }

  if (inputLastName.value === "") {
    setErrorStyle(inputLastName, errorTextLastName, "This field is required");
  }

  if (inputEmail.value === "") {
    setErrorStyle(inputEmail, errorTextEmail, "This field is required");
  } else if (emailRegex.test(inputEmail.value) === false) {
    setErrorStyle(
      inputEmail,
      errorTextEmail,
      "Please enter a valid email address",
    );
  }

  if (inputMessage.value === "") {
    setErrorStyle(inputMessage, errorTextMessage, "This field is required");
  }

  if (
    radioQueryTypeGeneral.checked === false &&
    radioQueryTypeSupport.checked === false
  ) {
    setErrorStyle(null, errorTextQueryType, "Please select a query type");
  }

  if (checkbox.checked === false) {
    setErrorStyle(
      null,
      errorTextCheckbox,
      " To submit this form, please consent to being contacted",
    );
  }

  if (
    inputFirstName.value !== "" &&
    inputLastName.value !== "" &&
    inputEmail.value !== "" &&
    (radioQueryTypeGeneral.checked || radioQueryTypeSupport.checked) &&
    checkbox.checked
  ) {
    successToast.classList.remove("hidden");
    resetInput();
    setTimeout(() => {
      successToast.classList.add("hidden");
    }, 3000);
  }
});

inputFirstName.addEventListener("focus", () => {
  removeErrorStyle(inputFirstName, errorTextFirstName);
});
inputLastName.addEventListener("focus", () => {
  removeErrorStyle(inputLastName, errorTextLastName);
});
inputEmail.addEventListener("focus", () => {
  removeErrorStyle(inputEmail, errorTextEmail);
});
inputMessage.addEventListener("focus", () => {
  removeErrorStyle(inputMessage, errorTextMessage);
});

checkbox.addEventListener("change", () => {
  removeErrorStyle(null, errorTextCheckbox);
  checkbox.nextElementSibling.classList.toggle("hidden");
  checkbox.nextElementSibling.nextElementSibling.classList.toggle("hidden");
});

radioQueryType.forEach((radio) => {
  radio.addEventListener("change", () => {
    removeErrorStyle(null, errorTextQueryType);
    if (radio.id === "query-type-general") {
      radioQueryTypeGeneral.setAttribute("checked", true);
      radioQueryTypeSupport.removeAttribute("checked");

      radioQueryTypeGeneral.parentElement.classList.remove(
        "border-grey-500-medium",
      );
      radioQueryTypeGeneral.parentElement.classList.add(
        "border-green-600-medium",
      );
      radioQueryTypeGeneral.parentElement.classList.add("bg-green-200-lighter");

      radioQueryTypeGeneral.nextElementSibling.classList.add("hidden");
      radioQueryTypeGeneral.nextElementSibling.nextElementSibling.classList.remove(
        "hidden",
      );

      radioQueryTypeSupport.nextElementSibling.classList.remove("hidden");
      radioQueryTypeSupport.nextElementSibling.nextElementSibling.classList.add(
        "hidden",
      );

      radioQueryTypeSupport.parentElement.classList.add(
        "border-grey-500-medium",
      );
      radioQueryTypeSupport.parentElement.classList.remove(
        "border-green-600-medium",
      );
      radioQueryTypeSupport.parentElement.classList.remove(
        "bg-green-200-lighter",
      );
    }

    if (radio.id === "query-type-support") {
      radioQueryTypeSupport.setAttribute("checked", true);
      radioQueryTypeGeneral.removeAttribute("checked");

      radioQueryTypeSupport.parentElement.classList.remove(
        "border-grey-500-medium",
      );
      radioQueryTypeSupport.parentElement.classList.add(
        "border-green-600-medium",
      );
      radioQueryTypeSupport.parentElement.classList.add("bg-green-200-lighter");

      radioQueryTypeSupport.nextElementSibling.classList.add("hidden");
      radioQueryTypeSupport.nextElementSibling.nextElementSibling.classList.remove(
        "hidden",
      );

      radioQueryTypeGeneral.nextElementSibling.classList.remove("hidden");
      radioQueryTypeGeneral.nextElementSibling.nextElementSibling.classList.add(
        "hidden",
      );

      radioQueryTypeGeneral.parentElement.classList.add(
        "border-grey-500-medium",
      );
      radioQueryTypeGeneral.parentElement.classList.remove(
        "border-green-600-medium",
      );
      radioQueryTypeGeneral.parentElement.classList.remove(
        "bg-green-200-lighter",
      );
    }
  });
});

console.log(radioQueryTypeGeneral.checked);
console.log(radioQueryTypeSupport.checked);
