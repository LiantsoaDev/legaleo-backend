import { InputFiles, MultiSelectGroup, RadioGroup } from "@/components/Form";

const options = ["Option 1", "Option 2", "Option 3"];

const page = () => {
  return (
    <div className=" h-screen flex flex-col gap-7 p-12">
      <RadioGroup name="objectif" options={options} />
      <MultiSelectGroup options={options} />
      <InputFiles
        id="status_societe"
        label="Statuts de la société ( PDF OU DOCX)"
        name="status_societe"
        isrequired={true}
        accept=".pdf,.docx"
      />
    </div>
  );
};

export default page;
