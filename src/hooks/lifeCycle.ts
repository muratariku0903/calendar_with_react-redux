import { useEffect, useRef } from "react";


export const useComponentDidMount = (cb: () => void) => {
    useEffect(() => {
        cb();
    }, []);
}

export const useComponentWillMount = (cb: () => void) => {
    const willMount = useRef(true);

    if (willMount.current) cb();

    willMount.current = false;
}
