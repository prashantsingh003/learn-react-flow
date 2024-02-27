import { EdgeProps } from "reactflow";

export default function ColoredEdge({targetX,targetY,sourceX,sourceY}: EdgeProps){
	
  const xEqual = sourceX === targetX;
  const yEqual = sourceY === targetY;
	return (
		<>
			<path
			id=''
			></path>
		</>
	)
}