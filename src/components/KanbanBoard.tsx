import { useMemo, useState } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

import { Column, Id, Task } from '../types';

import PlusIcon from './PlusIcon'
import ColumnContainer from './ColumnContainer';
const KanbanBoard = () => {
	const [columns,setColumns] = useState<Column[]>([]);
	const [tasks,setTasks]= useState<Task[]>([])
	const [activeColumn,setActiveColumn]= useState<Column | null>(null)
	const sensors = useSensors(
		useSensor(PointerSensor,{
			activationConstraint:{
				distance:3,
			},
		}),
	)
	console.log(columns);
	const columnsId = useMemo(()=> columns.map((col)=> col.id),[columns])
	const generateId = ()=> {
		return Math.floor(Math.random() * 10001)
	}
	const createNewColumn = ()=> {
     const columnToAdd:Column = {
			id:generateId(),
			title:`Column ${columns.length + 1}`,
		 }
		 setColumns([...columns,columnToAdd])
	}
	const onDragStart = (event:any)=> {
         console.log('Drag start',event);
		 if(event.active.data.current?.type === 'Column') {
			setActiveColumn(event.active.data.current.column);
			return;
		 }
	}
	const onDragEnd = (event:any)=> {
		const {active,over} = event;
		if(!over) return;
		const activeColumnId = active.id;
		const overColumnId = over.id;

		if(activeColumnId === overColumnId) return;
		setColumns((columns)=> {
			const activeColumnIndex = columns.findIndex(
				(col)=> col.id === activeColumnId,
			)
			const overColumnIndex = columns.findIndex(
				(col)=> col.id === overColumnId,
			)
			return arrayMove(columns,activeColumnIndex,overColumnIndex)
		})
	}
	const deleteColumn = (id:Id)=> {
    	 const filteredColumns = columns.filter((col)=> col.id !== id)
		 setColumns(filteredColumns);
	}
	const updateColumn = (id:Id,title:string) => {
    	 // eslint-disable-next-line array-callback-return
    	 const newColumns = columns.map((col:any) => {
			if(col.id !==id) return col
			return {...col,title}
		 });
	 setColumns(newColumns)
	}
	const createTask = (columnId:Id)=> {
     	const newTask:Task ={
			id:generateId(),
			columnsId:columnId,
			content:`Task ${tasks.length + 1}`,
	 }
	 setTasks([...tasks,newTask])
	}
	const deleteTask = (id:Id) => {
     const newTasks = tasks.filter((task)=> task.id !== id);
	 setTasks(newTasks);
	}
	const updateTask=(id:Id,content:string)=> {
     	 const newTasks= tasks.map(task=> {
			if(task.id !== id) return task;
			return {...task,content};
	  });
	  setTasks(newTasks)
	}
	return (
		<div
			className="
		m-auto
		flex
		min-h-screen
		w-full
		items-center
		overflow-x-auto
		overflow-y-hidden
		px-[40px]
		justify-center
		">
			<DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<div className="m-auto flex gap-4">
					<div className="flex gap-4">
						<SortableContext items={columnsId}>
							{columns.map(column => (
								<ColumnContainer
									column={column}
									deleteColumn={deleteColumn}
									updateColumn={updateColumn}
									createTask={createTask}
									key={column.id}
									tasks={tasks.filter((task)=> task.columnsId === column.id)}
									deleteTask={deleteTask}
									updateTask={updateTask}
								/>
							))}
						</SortableContext>
					</div>
					<button
						onClick={() => createNewColumn()}
						className="h-[60px]
				 w-[350px]
					min-w-[350px]
					cursor-pointer
					rounded-lg
					bg-mainBackgroundColor
					border-2
					border-columnBackgroundColor
					p-4
					ring-rose-500
					hover:ring-2
					flex 
					gap-2
					">
						<PlusIcon />
						Add Column
					</button>
				</div>

        		{createPortal(
					<DragOverlay>
                	{activeColumn && 
					<ColumnContainer 
						column={activeColumn} 
						deleteColumn={deleteColumn}
						updateColumn={updateColumn}
						createTask={createTask}
						tasks={tasks.filter((task)=> task.columnsId === activeColumn.id)}
						deleteTask={deleteTask}
						updateTask={updateTask}/>
						}
					</DragOverlay>,
					document.body,
				)}

			</DndContext>
		</div>
	)
}

export default KanbanBoard