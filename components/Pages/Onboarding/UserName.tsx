import { Input } from "../../Form";
import { Title } from "../../Typography";
import { Notices } from "../../Typography/Tips";

interface UserNameProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

export const UserName = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
}: UserNameProps) => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 w-full">
      <Title className="font-bold text-4xl leading-[100%] mb-8">
        Pour commencer, <br /> comment vous appelez-vous ?
      </Title>
      <div className="flex flex-row gap-5">
        <Input
          type="text"
          placeholder="Nom"
          name="name"
          classname="!text-2xl !px-7 !py-5"
          value={firstName}
          onValueChange={onFirstNameChange}
        />
        <Input
          type="text"
          placeholder="Prénom"
          name="last_name"
          classname="!text-2xl !px-7 !py-5"
          value={lastName}
          onValueChange={onLastNameChange}
        />
      </div>
      <Notices classname="mt-5 text-xl">
        Ce prénom servira à personnaliser votre espace Legaleo.
      </Notices>
    </div>
  );
};
