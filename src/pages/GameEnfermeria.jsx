import { QuestionRoom } from "../components/QuestionRoom";
import { dataEnfermeria } from "../data/dataEnfermeria";

export function GameEnfermeria (){
  return(
    <>
      <QuestionRoom  questionData={dataEnfermeria}/>
    </>

  )
}