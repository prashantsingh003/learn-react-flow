export function Options(){
	
	const onDragStart=(event:any,nodeType:string)=>{	
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
	}
	return (
		<aside>
			<div className="container">
				<div className="dndnode" onDragStart={(event) => onDragStart(event, 'add')} draggable>
					Addition Node
				</div>
				<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'sub')} draggable>
					Subtraction Node
				</div>
				<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'mul')} draggable>
					Multiplication Node
				</div>
			</div>
		</aside>
	)
}