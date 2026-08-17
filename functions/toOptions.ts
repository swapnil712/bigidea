import { OptionType } from "@/constants/choices";

type Identifiable = { id: string };
type Accessor<T> = keyof T | ((item: T) => string);

const read = <T,>(item: T, accessor: Accessor<T>, fallback: string) =>
  typeof accessor === "function" ? accessor(item) : String(item[accessor] ?? fallback);

// Turns any array of project entities into the OptionType[] shape a select expects.
// Pass a key ("name", "title") or a builder function for composed labels.
// `value` defaults to the entity id — override it when the field being edited
// stores something else (e.g. scene.location holds the location name).
export const toOptions = <T extends Identifiable>(
  items: T[] | undefined,
  label: Accessor<T> = "name" as keyof T,
  value: Accessor<T> = "id"
): OptionType[] =>
  (items ?? []).map((item) => ({
    id: read(item, value, item.id),
    label: read(item, label, item.id),
  }));
