export interface IToDo {
    title: string,
    description: string
    status: "ACTIVE" | "DONE" | "BIN",
    createdBy?: string
}

export interface IGetQuery {
    page: number,
    sortType: "A-Z" | "Z-A" | "old-new" | "new-old",
    limit: number | 20,
    filter: "ALL" | "COMPLETED" | "ACTIVE" | "BIN",
    keyword?:string
}

export interface IPutQuery {
    id: string,
    action: "edit" | "bin" | "complete" | "incomplete"
}

export interface IDeleteQuery extends IPutQuery {

}