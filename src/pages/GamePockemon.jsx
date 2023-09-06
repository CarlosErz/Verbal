import { QuestionRoom } from "../components/QuestionRoom";

import { dataPokemon } from '../data/dataPokemon'
 
export function GamePockemon (){
  return(
    <>
    
    <QuestionRoom questionData={dataPokemon} />

    </>
  )
}