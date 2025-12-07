import { SHA256 } from "crypto-js";
import { toast } from "react-toastify";

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

export const validateEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
};

export const hashPassword = async (password: string) => {
  return SHA256(password).toString();
};

export function exclude<T extends object, K extends keyof T>(
  user: T,
  keys: K[]
): Omit<T, K> {
  const clone = { ...user };
  for (const key of keys) {
    delete clone[key];
  }
  return clone;
}

export const getErrorMessage = (
  type: string,
  value: string | undefined
): string => {
  let message: string = "";

  if (type === "email") {
    message = "Veuillez entrez une adresse email valide!";
  } else if (type === "textarea" && (value ? value.length < 20 : true)) {
    message = "Le message doit etre descriptif";
  } else if (value === "") {
    message = "Ce champs est requis";
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

export const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  action: (form: HTMLFormElement) => void
) => {
  e.preventDefault();
  const form = e.currentTarget;
  console.log("test");

  const hasError = Array.from(form.elements).some((input) => {
    return (
      input instanceof HTMLInputElement &&
      input.classList.contains("border-danger")
    );
  });

  if (hasError) {
    toast.error("Entrez invalid", {
      theme: "colored",
      position: "top-right",
    });
    return;
  }

  action(form);
};

export const createUser = (form: HTMLFormElement) => {
  let data = { name: "", last_name: "", email: "", password: "" };
  const nameInput = form.elements.namedItem("name") as HTMLInputElement;
  const lastNameInput = form.elements.namedItem(
    "last_name"
  ) as HTMLInputElement;
  const emailInput = form.elements.namedItem("email") as HTMLInputElement;
  const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

  if (nameInput && lastNameInput && emailInput && passwordInput) {
    data = {
      name: nameInput.value || "",
      last_name: lastNameInput.value || "",
      email: emailInput.value || "",
      password: passwordInput.value || "",
    };
  }

  console.log(data);

  fetch(`${WEBSITE_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success > 0) {
        nameInput.value = "";
        lastNameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        toast.success(data.message, {
          position: "top-right",
          theme: "colored",
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          theme: "colored",
        });
      }
    })
    .catch(() => {
      toast.error("Une erreur est survenue", {
        position: "top-right",
        theme: "colored",
      });
    });
};
