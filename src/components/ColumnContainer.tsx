import { useMemo, useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'

import { Column, Id, Task } from '../types';

import DeleteIcon from './DeleteIcon';
import PlusIcon from './PlusIcon';
import TaskCard from './TaskCard';

interface Props {
		column:Column;
		deleteColumn:(id:Id)=> void;
		updateColumn:(id:Id,title:string)=> void;
		createTask:(columnId:Id)=>void;
		tasks:Task[];
		deleteTask:(id:Id)=> void;
		updateTask:(id:Id,content:string)=>void;
}
const ColumnContainer = (props:Props) => {
	const {column,deleteColumn,updateColumn,createTask,tasks,deleteTask,updateTask} = props;

	const [editMode,setEditMode] = useState(false);
	
    	const tasksIds = useMemo(()=> {
		return tasks.map(task => task.id)
	},[tasks])
	const {setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging} = useSortable({
		id:column.id,
		data: {
			type:'Column',
			column,
		},
		disabled:editMode,
	})

	const style ={
		transition,
		transform:CSS.Transform.toString(transform),
	}
	
	if(isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="
			bg-columnBackgroundColor
			opacity-40
			border-2
			border-rose-500
			w-[350px]
			h-[500px]
			max-h-[500px]
			rounded-md
			flex
			flex-col
			"></div>
		)
	}
	return (
		<div
		    style={style}
			ref={setNodeRef} 
			className="
		bg-columnBackgroundColor
		w-[350px]
		h-[500px]
		max-h-[500px]
		rounded-md
		flex
		flex-col">
			<div
				{...attributes}
		    {...listeners}
				onClick={()=>{
					setEditMode(true);
				}}
			 className="
			bg-mainBackgroundColor
			text-md
			h-[60px]
			cursor-grab
			rounded-md
			rounded-b-none
			p-3
			font-bold
			border-columnBackgraundColor
			border-4
			flex
			items-center
			justify-between">
				<div className="flex gap-2">
					<div className="
				flex 
				justify-center
				items-center
				bg-columnBackgraundColor
				px-2
				py-1
				text-sm
				rounded-full">0</div>
					{!editMode && column.title}
					{editMode && <input 
						className="bg-black focus:border-rose-500 border rounded outline-none px-2"
						value={column.title}
						onChange={(e)=> updateColumn(column.id, e.target.value)}
						autoFocus 
						onBlur={()=> setEditMode(false)}
						onKeyDown={e=> {
							if(e.key !== 'Enter')return
							setEditMode(false)
						}}
					/>}
				</div>
				<button
					onClick={()=> deleteColumn(column.id)} className="
				stroke-gray-500 "><DeleteIcon/></button>
			</div>
			<div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
				<SortableContext items={tasksIds}>
					{
						tasks.map(task=> (
							<TaskCard 
								key={task.id} 
								task={task} 
								deleteTask={deleteTask}
								updateTask={updateTask}/>
						))
					}
				</SortableContext>
			</div>
			<button
				className="flex 
					gap-2 
					items-center 
					border-columnBackgroundColor
					border-2 rounded-md p-4
					border-x-columnBackgroundColor hover:bg-mainBackgroundColor 
					hover:text-rose-500 active:bg-black"
				onClick={()=> {
					createTask(column.id)
				}}
			><PlusIcon/>
				Add task</button>
		</div>
	)
}

export default ColumnContainer