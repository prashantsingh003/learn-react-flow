export function Options(){
	
	const onDragStart=(event:any,nodeType:string)=>{	
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
	}
	return (
		<aside>
			<div className="description">You can drag these nodes to the pane on the right.</div>
			<div className="container">
				<div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
					Input
				</div>
				<div className="dndnode" onDragStart={(event) => onDragStart(event, 'add')} draggable>
					Addition Node
				</div>
				<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'subtract')} draggable>
					Subtraction Node
				</div>
				<div className="dndnode output" onDragStart={(event) => onDragStart(event, 'multiply')} draggable>
					Multiplication Node
				</div>
			</div>
		</aside>
	)
}