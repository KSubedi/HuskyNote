export class ApiResponse{
    Error: boolean;
    Messages?: Array<string>;
    Data?: any;
    
    constructor(){
        this.Error = false;
    }
}