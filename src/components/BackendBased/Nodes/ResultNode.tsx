import { useEffect, useState } from "react";
import { Handle, Node, Position, useReactFlow } from "reactflow";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

export function ResultNode(node:Node){
	const {id}=node;
	const{targetHandle}=node.data;
	const edges=useSelector((state:RootState)=>state.userFlow.currentFlow.edges)
	const nodes=useSelector((state:RootState)=>state.userFlow.currentFlow.nodes)
	const [res,setRes]=useState<Number>(0)
	useEffect(()=>{
		function getNodeOperationInArrayFormat(){
			const resOpArr=[]
			const targetSourceMap:any={}
			const eds=edges
			const nds=nodes
			const nodesMap:any={}
			nds.forEach(nd=>{
				nodesMap[nd.id]=nd
			})
			eds.forEach(ed=>{
				targetSourceMap[ed.target]=ed.source
			})
			let curNode=nodesMap[id]
			if(!curNode) return[];
			let srcId=curNode.id
			while (srcId && curNode){
				if (curNode!==nodesMap[id]){
					if(curNode.type=='operation'){
						switch(curNode.data.val){
							case('add'):
							resOpArr.push('+')
							break;
							case('subtract'):
							resOpArr.push('-')
							break;
							case('multiply'):
							resOpArr.push('*')
							break;
							case('divide'):
							resOpArr.push('/')
							break;
							default:
							resOpArr.push('+')
							break;
						}
					}
					else{
						resOpArr.push(Number(curNode.data.val))
					}
				}
				srcId=targetSourceMap[String(srcId)]
				curNode=nodesMap[srcId]
			}
			resOpArr.reverse();
			return resOpArr
		}
		function getResult(arr:Array<Number|String>){
			let num=0
			while(arr.length>2){
				num=eval(arr.slice(0,3).join(''))
				let temp=[num]
				arr=temp.concat(arr.slice(3))
			}
			return parseFloat(num).toFixed(2);
		}
		const resultArr=getNodeOperationInArrayFormat()
		setRes(getResult(resultArr))
	},[nodes,edges])
	return (
		<div className="py-2 px-3 rounded-lg text-center bg-slate-200 font-bold text-lg text-slate-900">
			<div>Result</div>
			<div>{res}</div>
			<Handle type="target" className="bg-white rounded-full" id={''+targetHandle} position={Position.Left}/>
		</div>
	)
}