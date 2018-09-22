export namespace DataType {

    export class Pagging {
        page: number
        limit: number
        constructor(page: number, limit: number) {
            this.page = page
            this.limit = limit
        }
    }
}