import { ScreenplayElement, ScreenplayElementType } from "@/constants/dummy/dummyScript";

const screenplayStyles: Record<ScreenplayElementType, string> = {
  slugline: "mt-4",
  action: "mt-2",
  character: "text-center mt-5",
  parenthetical: "text-center",
  dialogue: "w-100 mx-auto mb-10",
  transition: "text-right",
};


export default function Screenplay ({ script } : { script : ScreenplayElement[]}) {
    return <div className="mx-auto w-4/5 bg-zinc-900 p-20 shadow-lg border border-color">
        { script.map(( item, index) => <div key={ index }>
                <div key={index} className={`screenplay text-lg font-bold ${ screenplayStyles[item.type] }`}>{ item.text }</div>
        </div>)}
    </div>
}