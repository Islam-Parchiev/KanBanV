import { useState } from 'react';

import { Column, Id } from '../types';

import PlusIcon from './PlusIcon'
import ColumnContainer from './ColumnContainer';

const KanbanBoard = () => {
	const [columns,setColumns] = useState<Column[]>([]);
	console.log(columns);
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
	const deleteColumn = (id:Id)=> {
     const filteredColumns = columns.filter((col)=> col.id !== id)
		 setColumns(filteredColumns);
	}
	return (
		<div className="
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
			<div className="m-auto flex gap-4">
				<div className="flex gap-4">

					{columns.map(column=> (
						<ColumnContainer column={column} deleteColumn={deleteColumn}/>
					))}

				</div>
				<button 
				  onClick={()=> createNewColumn()}
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
					"><PlusIcon/>
						Add Column</button>
			</div>
		</div>
	);
}

export default KanbanBoard