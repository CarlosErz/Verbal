import { QuestionRoom } from "../components/QuestionRoom";
import { dataGameSolo } from "../data//dataGameSolo";

export function SalaSolo(){
  return(
    <QuestionRoom   questionData={dataGameSolo} />
  )
}