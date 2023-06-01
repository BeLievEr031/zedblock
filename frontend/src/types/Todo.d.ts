interface IQuery {
    page: number,
    sortType: "A-Z" | "Z-A" | "old-new" | "new-old" | string,
    limit: number | 20,
    filter: "ALL" | "COMPLETED" | "ACTIVE" | "BIN" | string
}



interface ITodo {
    _id?: string,
    title: string,
    description: string,
    status?: string
}

interface IBulk {
    ids: string[],
    action: string
}