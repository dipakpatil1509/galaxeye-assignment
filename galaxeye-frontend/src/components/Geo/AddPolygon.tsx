import { useLeafletContext } from "@react-leaflet/core";
import React, { useEffect, useRef } from "react";
import "leaflet-draw";
declare const L: any;

type Props = {
    onCreated: (_: any) => void;
};

function AddPolygon({ onCreated }: Props) {
    const context = useLeafletContext();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const alreadyAdded = useRef<boolean>(false);
    const onDrawCreated = (e: any) => {
        const { layer } = e;
        const { map } = context;
        layer.addTo(map);
        onCreated(e);
        alreadyAdded.current = false
    };
    useEffect(() => {
        const { map } = context;

        map.on(L.Draw.Event.CREATED, onDrawCreated);

        const drawPolygonControl = new L.Draw.Polygon(map);

        L.DomEvent.on(buttonRef.current, "click", () => {
            if (alreadyAdded.current) return;
            drawPolygonControl.enable();
            alreadyAdded.current = true;
        });

        return () => {
            map.off(L.Draw.Event.CREATED, onDrawCreated);
        };
    }, []);

    return (
        <>
            <button
                ref={buttonRef}
                className="fixed top-4 right-4 bg-gray-400 z-[1220] px-4 py-1 rounded-md text-base font-semibold shadow-lg"
            >
                Add Polygon
            </button>
        </>
    );
}

export default AddPolygon;
