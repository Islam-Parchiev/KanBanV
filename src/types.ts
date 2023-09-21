export type Id = string | number;
export type Column = {
    id:Id;
    title:string;
}
export type Task ={
    id:Id,
    columnsId:Id,
    content:string
}