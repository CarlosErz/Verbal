import { QuestionRoom } from "../components/QuestionRoom";
import { dataAnimals } from "../data/dataAnimals";

export function QuickAnimals(){
  return(
    <QuestionRoom   questionData={dataAnimals} />
  )
}