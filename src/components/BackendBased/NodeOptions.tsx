
	
	const onDragStart=(event:any,nodeType:string)=>{	
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
	}
	import styles from './styles.module.scss'
	export function NodeOptions() {
	return (
		<>
			<aside>
				<div className={"my-3 " + styles.container}>
					<div className={`dndnode output`} onDragStart={(event) => onDragStart(event, 'num')} draggable>
						Number
					</div>
					<div className="dndnode" onDragStart={(event) => onDragStart(event, 'operation')} draggable>
						Operator Node
					</div>
					<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'result')} draggable>
						Result
					</div>
				</div>
			</aside>
		</>
	)
}