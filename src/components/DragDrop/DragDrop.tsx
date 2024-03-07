import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,Node, Edge
} from 'reactflow';
import { TopOptions } from './TopOptions';
import { useCallback, useRef, useState } from 'react';

const getId = () => (Math.random() + 1).toString(36).substring(7);
const initialNodes:Node[] = [
  {
    id: '3',
    position: { x: 0, y: 0 },
    data: { title: 'readFile', subline: 'api.ts' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 250, y: 0 },
    data: { title: 'bundle', subline: 'apiContents' },
		type:'default'
  },
];
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
		animated: true
  },
]

export function DragDrop(){
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
			console.log(event)

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

	return (
		<ReactFlowProvider>
			<TopOptions></TopOptions>
			<div className="reactflow-wrapper"  style={{ width: '100%', height: '80vh' }} ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onInit={setReactFlowInstance}
					onDrop={onDrop}
					onDragOver={onDragOver}
					fitView
				>
					{/* <MiniMap /> */}
					<Controls />
				</ReactFlow>
			</div>
		</ReactFlowProvider>
	)
}