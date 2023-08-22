import { QuestionRoom } from "../components/QuestionRoom";
import { dataGameSolo } from "../data/dataGameSolo";

export function QuickGame(){
  return(
    <QuestionRoom   questionData={dataGameSolo} />
  )
}