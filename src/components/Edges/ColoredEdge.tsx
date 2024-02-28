import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, getStraightPath, useReactFlow } from "reactflow";
import './edge.css'
export default function ColoredEdge({id,targetX,targetY,sourceX,sourceY,markerEnd,sourcePosition, targetPosition}: EdgeProps){
	
  // const xEqual = sourceX === targetX;
  // const yEqual = sourceY === targetY;
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
	const style={color:'red',strokeOpacity:1}
	return (
    <>
			<BaseEdge path={edgePath} markerEnd={markerEnd} style={style} id={id} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}>
            Delete Edge
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
	)
}