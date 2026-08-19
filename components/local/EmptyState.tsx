import { IconType } from "react-icons"
import { Button, ButtonProps } from "../design-system/Button"

type EmptySize = "Regular" | "Small"

interface EmptyProps {
    icon: IconType,
    title: string,
    subtitle?: string,
    // "Small" sits inside a panel section rather than filling a page.
    size?: EmptySize,
    button?: ButtonProps
}

const sizeStyles: Record<EmptySize, { wrap: string; icon: number; title: string }> = {
    Regular: { wrap: "py-10 gap-2", icon: 48, title: "font-bold" },
    Small: { wrap: "py-6 gap-1", icon: 28, title: "font-bold text-sm" }
}

export default function EmptyState ( { icon, title, subtitle, size, button } : EmptyProps) {
    const Icon = icon
    const style = sizeStyles[ size || "Regular" ]

    return <div className={`text-center flex flex-col ${ style.wrap }`}>
        <Icon size={ style.icon } className="mx-auto opacity-60" />
        <p className={ style.title }>{ title }</p>
        { subtitle && <p className="opacity-60 text-sm">{ subtitle }</p> }
        { button && <div className="flex justify-center mt-2"><Button {...button} /></div> }
    </div>
}
