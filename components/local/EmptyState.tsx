import { IconType } from "react-icons"
import { ButtonProps } from "../design-system/Button"

interface EmptyProps {
    icon: IconType,
    title: string,
    subtitle: string,
    button?: ButtonProps
}

export default function EmptyState ( { icon, title, subtitle, button } : EmptyProps) {
    const Icon = icon
    return <div className="text-center py-10 flex flex-col gap-2">
        <Icon size={ 48 } className="mx-auto" />
        <p className="font-bold">{ title }</p>
        <p className="opacity-60 text-sm">{ subtitle }</p>
    </div>
}