import img from "@/assets/images/template.png";
import { Button } from "@/components/Button";
import { NewWorkSpace, WorkspaceCard } from "@/components/Pages/MonCompte";
import { Paragraphe, Title } from "@/components/Typography";

const workspaces = [
  {
    icon: img,
    name: "Workspace 1",
    members: 7,
  },
  {
    icon: img,
    name: "Workspace 2",
    members: 5,
  },
];

const page = () => {
  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-2">
        <Title level={2} className="font-semibold text-2xl text-black">
          Workspaces
        </Title>
        <Paragraphe className="font-medium text-sm text-[#828282]">
          Pretend not to be evil meow to be let out intently stare at the same .
        </Paragraphe>
      </div>
      <div className="flex flex-row gap-5">
        {workspaces.map((workspace, index) => (
          <div key={index} className="w-1/3">
            <WorkspaceCard
              icon={workspace.icon}
              name={workspace.name}
              members={workspace.members}
            />
          </div>
        ))}
      </div>
      <NewWorkSpace />
      <div className="flex flex-row gap-5 items-center !mt-5">
        <Button classname="!rounded-sm">Sauvegarder</Button>
        <Button href="#">Annuler</Button>
      </div>
    </div>
  );
};

export default page;
