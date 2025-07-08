import { Input } from "../Form";
import { Title } from "../Typography";
import { Notices } from "../Typography/Tips";

export const UserName = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center px-32 py-20 max-w-4xl">
      <Title className="font-bold text-4xl leading-[100%] mb-8">
        Pour commencer, <br /> comment vous appelez-vous ?
      </Title>
      <div className="flex flex-row gap-5">
        <Input type="text" placeholder="Nom" name="name" />
        <Input type="text" placeholder="Prénom" name="last_name" />
      </div>
      <Notices classname="mt-5">
        Ce prénom servira à personnaliser votre espace Legaleo.
      </Notices>
    </div>
  );
};
