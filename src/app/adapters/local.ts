import { ApiResponse } from "../models/apiresponse";
import { StorageAdapterInterface } from "./storage-adapter-interface";

export class LocalStorageAdapter implements StorageAdapterInterface{
    storage: Storage;
    constructor(){
        this.storage = window.localStorage;
    }

    set(key: string, value: any): ApiResponse{
        value = JSON.stringify(value);
        this.storage.setItem(key, value);
        
        let response = new ApiResponse();
        response.Error = false;
        return response;
    }

    get(key): ApiResponse{
        let value = JSON.parse(this.storage.getItem(key));

        let response = new ApiResponse();
        response.Data = value;
        response.Error = false;

        return response;
    }

    remove(key: string): ApiResponse{
        this.storage.removeItem(key);
        return new ApiResponse();
    }
}