import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import './DragDrop.css'
import { TopOptions } from './TopOptions';
import { useRef, useState } from 'react';


const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

export function DragDrop(){
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

	return (
		<ReactFlowProvider>
			<TopOptions></TopOptions>
			<div className="reactflow-wrapper"  style={{ width: '80vw', height: '80vh' }} ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					// onConnect={onConnect}
					// onInit={setReactFlowInstance}
					// onDrop={onDrop}
					// onDragOver={onDragOver}
					fitView
				>
					<Controls />
				</ReactFlow>
			</div>
		</ReactFlowProvider>
	)
}