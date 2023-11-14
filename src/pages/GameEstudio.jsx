import { QuestionRoom } from "../components/QuestionRoom";
import { dataEstudio } from "../data/dataEstudio";


export function GameEstudio(){
  return(
    <>
    <QuestionRoom questionData={dataEstudio}></QuestionRoom>
    </>
  )
}