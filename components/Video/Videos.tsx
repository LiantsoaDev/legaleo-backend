import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button";
import { Paragraphe } from "../Typography";

export const Videos = () => {
  return (
    <div className="flex flex-row justify-between bg-white rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col gap-3.5">
        <Paragraphe>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor...
        </Paragraphe>
        <Button
          primary={false}
          classname="rounded-md !border-[#087F83] !text-xs !text-[#087F83] w-fit hover:!text-white hover:!border-black flex flex-row gap-2 items-center"
        >
          <FontAwesomeIcon icon={faPlay} />
          Regarder la vidéo
        </Button>
      </div>
    </div>
  );
};
