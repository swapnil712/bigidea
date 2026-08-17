import { IconType } from "react-icons";
import { MdDelete, MdOutlineCheckroom, MdOutlineInventory2 } from "react-icons/md";
import { Avatar } from "@/components/design-system/Avatar";
import { Button } from "@/components/design-system/Button";
import { Capsule } from "@/components/design-system/Capsule";
import { baseStyle } from "@/constants/styles";

interface SceneCastRowProps {
  title: string;
  subtitle?: string;
  initial?: string;
  icon?: IconType;
  wardrobe?: string[];
  props?: string[];
  onRemove?: () => void;
}

export default function SceneCastRow({
  title,
  subtitle,
  initial,
  icon,
  wardrobe,
  props,
  onRemove,
}: SceneCastRowProps) {

  const hasTags = Boolean(wardrobe?.length || props?.length);

  return (
    <div className="wrapper p-3 flex flex-row items-start gap-3">

      {initial ? <Avatar type="Initials" initial={initial} /> : <Avatar type="Icon" icon={icon || MdOutlineInventory2} />}

      <div className="grow flex flex-col gap-1">
        <span className="font-bold">{title}</span>
        {subtitle && <span className="text-sm opacity-60">{subtitle}</span>}

        {hasTags && (
          <div className={`${baseStyle.inlineRow} flex-wrap gap-1 mt-1`}>

            {wardrobe && wardrobe.length > 0 && (
              <>
                <MdOutlineCheckroom size={16} className="opacity-60" />
                {wardrobe.map((label) => (
                  <Capsule key={label} type="Tag" tone="Violet" label={label} />
                ))}
              </>
            )}

            {props && props.length > 0 && (
              <>
                <MdOutlineInventory2 size={16} className="opacity-60 ml-1" />
                {props.map((label) => (
                  <Capsule key={label} type="Tag" tone="Amber" label={label} />
                ))}
              </>
            )}

          </div>
        )}
      </div>

      {onRemove && <Button type="Tertiary" size="Small" icon={MdDelete} onClick={onRemove} />}
    </div>
  );
}
