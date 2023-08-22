import { QuestionRoom } from "./QuestionRoom";
import { dataGameSolo } from "../data//dataGameSolo";

export function SalaSolo(){
  return(
    <QuestionRoom   questionData={dataGameSolo} />
  )
}