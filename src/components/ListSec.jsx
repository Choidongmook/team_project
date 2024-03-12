import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, numberState, sectionState } from "../atoms";

const ListSec = () => {
  const [currentSection, setCurrentSection] = useRecoilState(sectionState);
  const category = useRecoilValue(categoryState);
  const number = useRecoilValue(numberState);

  if (currentSection === "LIST") {
    console.log(category);
    console.log(number);
  }
  return <div>ListSec</div>;
};

export default ListSec;
