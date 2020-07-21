import React, { useContext, useState, createContext, useEffect } from 'react';

interface SizeMonitorContextData {
    width: number;
    height: number;
}

const SizeMonitorContext = createContext<SizeMonitorContextData>({} as SizeMonitorContextData);

interface SizeMonitorProviderProps {
    elementReference: React.RefObject<HTMLDivElement>;
};

export const SizeMonitorProvider: React.FC<SizeMonitorProviderProps> = ({
    children,
    elementReference
}) => {
    const [size, setSize] = useState<SizeMonitorContextData>({
        width: 0,
        height: 0
    });
    useEffect(() => {
        const update = () => {
            if (!elementReference || !elementReference.current) {
                return;
            }
            const width = elementReference.current.clientWidth;
            const height = elementReference.current.clientHeight;
            setSize({
                width,
                height
            });
        };

        window.addEventListener('resize', update);
        update();
    }, []);

    return (
        <SizeMonitorContext.Provider value={{ ...size }}>
            { children }
        </SizeMonitorContext.Provider>
    );
};

export default SizeMonitorContext;

export function useSizeMonitor() : SizeMonitorContextData {
    const context = useContext(SizeMonitorContext);

    return context;
}
