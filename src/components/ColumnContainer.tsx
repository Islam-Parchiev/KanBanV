import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'

import { Column, Id } from '../types';

import DeleteIcon from './DeleteIcon';

interface Props {
		column:Column;
		deleteColumn:(id:Id)=> void;
}
const ColumnContainer = (props:Props) => {
	const {column,deleteColumn} = props;

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
					{column.title}
				</div>
				<button
					onClick={()=> deleteColumn(column.id)} className="
				stroke-gray-500 "><DeleteIcon/></button>
			</div>
			<div className="flex flex-grow"></div>
			<div>Footer</div>
		</div>
	)
}

export default ColumnContainer