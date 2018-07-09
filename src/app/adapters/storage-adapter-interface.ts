import { ApiResponse } from "../models/apiresponse";

// Storage adapters should implement this interface. They return ApiResponse
// object with thhe Data property being a JSON property.
export interface StorageAdapterInterface {
    // This method should set the value to te key
    set(key: string, value: any): ApiResponse;
    // This method should get the value of the key
    get(key): ApiResponse;
    // This method shohuld remove the key and value
    remove(key: string): ApiResponse;
}