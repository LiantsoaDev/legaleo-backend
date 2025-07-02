const validateEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
};

export const getErrorMessage = (
  type: string,
  value: string | undefined
): string => {
  let message: string = "";

  if (type === "email") {
    message = "Please provide a valid email address";
  } else if (type === "textarea" && (value ? value.length < 20 : true)) {
    message = "Message must be descriptif";
  } else if (value === "") {
    message = "This field is required!";
  }

  return message;
};

export const getInputValue = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  e.preventDefault();
  if (e.target.type === "email" && !validateEmail(e.target.value)) {
    setError(true);
    setValue(e.target.value);
  } else if (e.target.value === "") {
    setError(true);
    setValue(e.target.value);
  } else if (e.target.type === "textarea" && e.target.value.length < 20) {
    setError(true);
    setValue(e.target.value);
  } else {
    setError(false);
    setValue(e.target.value);
  }
};
