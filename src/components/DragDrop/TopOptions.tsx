import styles from './DragDrop.module.css'
export function TopOptions(){
	const onDragStart = (event:any, nodeType:any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
	return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className={styles.container}>
        <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
          Input Node
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
          Default Node
        </div>
        <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
          Output Node
        </div>
      </div>
    </aside>
  );
}