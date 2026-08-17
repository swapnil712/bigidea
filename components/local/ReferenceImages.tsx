"use client"

import { useRef } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Button } from "../design-system/Button";
import { ReferenceImage } from "@/types/project";

interface ReferenceImagesProps {
  id: string;
  images: ReferenceImage[];
  onChange: (images: ReferenceImage[]) => void;
  label?: string;
}

export default function ReferenceImages({
  id,
  images,
  onChange,
  label = "Add reference images",
}: ReferenceImagesProps) {

  const fileInput = useRef<HTMLInputElement>(null);

  const upload = (files: FileList | null) => {
    if (!files?.length) return;

    onChange([
      ...images,
      ...Array.from(files).map((file, index) => ({
        id: `img-${Date.now()}-${index}`,
        name: file.name,
        // Nothing to upload to yet — preview straight off the local file.
        url: URL.createObjectURL(file),
      })),
    ]);

    // Let the same file be picked again after a removal.
    if (fileInput.current) fileInput.current.value = "";
  };

  const remove = (image: ReferenceImage) => {
    URL.revokeObjectURL(image.url);
    onChange(images.filter((ix) => ix.id !== image.id));
  };

  return (
    <div className="flex flex-col gap-3">

      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((image) => (
            <div key={image.id} className="wrapper p-2 flex flex-col gap-2">
              <div className="aspect-square w-full overflow-hidden rounded bg-zinc-900">
                {/* Blob previews, so next/image would need unoptimized anyway */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-row items-center gap-1">
                <span className="grow text-xs opacity-60 truncate" title={image.name}>{image.name}</span>
                <Button type="Tertiary" size="Small" icon={MdDelete} onClick={() => remove(image)} />
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileInput}
        id={id}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />

      <Button
        type="Inline"
        size="Small"
        icon={MdAdd}
        label={label}
        onClick={() => fileInput.current?.click()}
      />

    </div>
  );
}
