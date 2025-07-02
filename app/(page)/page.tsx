import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";

export default function Home() {
  return (
    <div className="h-screen bg-white">
      <Button primary>Se connecter</Button>
      <div className="flex justify-center w-[200px]">
        <Input
          type="email"
          placeholder="Nom"
          label="Entrez votre nom"
          name="name"
        />
      </div>
    </div>
  );
}
