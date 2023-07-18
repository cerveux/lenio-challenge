import { useState } from "react";

export function useBool(initialValue = false){
    const [booleanHook, setBooleanHook] = useState(initialValue);

    const switchValue = ()=>{booleanHook? setBooleanHook(!booleanHook): setBooleanHook(!booleanHook)};

    

    return[booleanHook, switchValue]
}