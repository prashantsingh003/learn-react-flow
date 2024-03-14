import ReactFlow , { Controls, useNodesState, useEdgesState, addEdge, Node, Edge } from 'reactflow';

import { useCallback, useState } from 'react';

import TurboNode, { TurboNodeData } from './TurboNode';
import TurboEdge from './TurboEdge';
const getNewID=()=>(Math.random() + 1).toString(36).substring(7);
const initialNodes: Node<TurboNodeData>[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { title: 'readFile', subline: 'api.ts' },
    type: 'turbo',
  },
  {
    id: '2',
    position: { x: 250, y: 0 },
    data: { title: 'bundle', subline: 'apiContents' },
    type: 'turbo',
  },
  {
    id: '3',
    position: { x: 0, y: 250 },
    data: { title: 'readFile', subline: 'sdk.ts' },
    type: 'turbo',
  },
  // {
  //   id: '4',
  //   position: { x: 250, y: 250 },
  //   data: { title: 'bundle', subline: 'sdkContents' },
  //   type: 'turbo',
  // },
  // {
  //   id: '5',
  //   position: { x: 500, y: 125 },
  //   data: { title: 'concat', subline: 'api, sdk' },
  //   type: 'turbo',
  // },
  // {
  //   id: '6',
  //   position: { x: 750, y: 125 },
  //   data: { title: 'fullBundle' },
  //   type: 'turbo',
  // },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',animated: true
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
  },
  // {
  //   id: 'e2-5',
  //   source: '2',
  //   target: '5',
  // },
  // {
  //   id: 'e4-5',
  //   source: '4',
  //   target: '5',
  // },
  // {
  //   id: 'e5-6',
  //   source: '5',
  //   target: '6',
  // },
];

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};
export function BasicFlow(){
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [inp,setInp]=useState({title:'',subLine:''})
	const addNode=()=>{
		if(!inp.title) return;
		const node={
			id: getNewID(),
			position: { x: 0, y: 0 },
			data: inp,
			type: 'turbo',
		}
		setNodes(prev=>{
			return [...prev,node]
		})
		setInp({title:'',subLine:''})
	}

  const onConnect = useCallback((params:any) => setEdges((els) => addEdge(params, els)), []);

	return (
		<>
			<div style={{ width: '100%', height: 'auto' }}>
        <input type="text" value={inp.title} placeholder='Title' onChange={(e)=>setInp(prev=>({...prev,title:e.target.value}))} />
        <input type="text" value={inp.subLine} placeholder='Subline' onChange={(e)=>setInp(prev=>({...prev,subLine:e.target.value}))} />
        <button onClick={addNode}>Add node</button>
			</div>
			<div style={{ width: '100%', height: '50vh' }}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					fitView
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
					defaultEdgeOptions={defaultEdgeOptions}
				>
					<Controls showInteractive={false} />
				</ReactFlow>
			</div>
		</>
	)
}