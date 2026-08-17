"use client"

import { ReactNode, useEffect } from "react";
import { IconType } from "react-icons";
import { Headings } from "../design-system/Heading";
import { Button, ButtonProps } from "../design-system/Button";
import { createPortal } from 'react-dom';

type ModalSize = "S" | "L";

interface ModalProps {
    title: string,
    icon?: IconType,
    size?: ModalSize,
    show: boolean,
    onClose: () => void,
    children: ReactNode,
    buttons: ButtonProps[]
}

const sizeStyles: Record<ModalSize, string> = {
    S: "w-100",
    L: "w-180 max-w-300"
};

export default function Modal ( { title, icon, size, show, onClose, buttons, children } : ModalProps ) {

    useEffect(() => {
        if (!show) return
        const onKey = ( e: KeyboardEvent ) => { if ( e.key === "Escape" ) onClose() }
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [ show, onClose ])

    if (!show) return

    const content = <div
        onClick={ onClose }
        className="fixed inset-0 z-[9999] w-screen h-screen bg-black/50 flex items-center justify-center"
    >

        <div onClick={ ( e ) => e.stopPropagation() } className={`wrapper bg-zinc-900! mx-auto my-auto ${ sizeStyles[ size || "L" ] }`}>
            <Headings
                type="Module"
                leftIcon={ icon }
                label={ title }
                onClose={ onClose  }
            />
            <div className="p-4">
                { children }
            </div>

            <div className="border-color border-t p-3 flex gap-3">
                { buttons.map(( item, index) => <Button {...item} key={ index } />)}
            </div>
        </div>
    </div>

    return createPortal( content, document.body)
}
