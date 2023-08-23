import { QuestionRoom } from "../components/QuestionRoom";

import { dataGameDisney } from "../data/dataGameDisney";

export function GameDisney(){
  return(
    <QuestionRoom   questionData={dataGameDisney} />
  )
}