export function Options({disableNum=false}:{disableNum:Boolean}){
	
	const onDragStart=(event:any,nodeType:string)=>{	
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
	}
	return (
		<aside>
			<div className="container my-3">
				<div className={`dndnode output ${disableNum?'disabled':''}`} onDragStart={(event) => onDragStart(event, 'num')} draggable>
					Number
				</div>
				<div className="dndnode" onDragStart={(event) => onDragStart(event, 'add')} draggable>
					Addition Node
				</div>
				<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'sub')} draggable>
					Subtraction Node
				</div>
				<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'mul')} draggable>
					Multiplication Node
				</div>
				<div className={`dndnode output`} onDragStart={(event) => onDragStart(event, 'result')} draggable>
					Result
				</div>
			</div>
		</aside>
	)
}