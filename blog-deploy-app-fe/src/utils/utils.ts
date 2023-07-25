//get progress from axios when calling api
import { Dispatch } from "react";
export const axiosProgress = (callback: Dispatch<number>) => {
    return {
        onUploadProgress: (progressEvent: any) => {
            let percentCompleted = Math.floor(
                (progressEvent.loaded * 100) / progressEvent.total
            )
            
            callback(percentCompleted)
        },
    }
}
