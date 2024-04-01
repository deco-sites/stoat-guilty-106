import { JSX } from "preact";
import { Link, Symbol } from "./types.ts";
import Icon, { AvailableIcons } from "../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  links?: Link[];
}

export default function Main(
  {
    links = Array(3).fill(0).map(() => ({
      icon: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/fea5871e-2a02-4dd8-a12c-f2247dd59034",
        alt: "Image",
      },
      label: "Change me",
      href: "/",
    })),
  }: Props,
): JSX.Element | null {
  function isImage(icon: AvailableIcons | Symbol): icon is Symbol {
    return (icon as Symbol).src !== undefined;
  }

  function isLink(list: Link | Symbol): list is Link {
    return (list as Link).href !== undefined;
  }

  return (
    <div class="flex flex-col items-center max-w-[688px] mx-auto w-full lg:px-0 px-6">
      {links && links?.length > 0 && (
        <ul class="flex flex-col items-center justify-center w-full gap-4">
          {links?.map((list: Link | Symbol, index: number) => {
            if (isLink(list)) {
              return (
                <li class="w-full" key={index}>
                  <a
                    target="_blank"
                    href={list.href}
                    class="btn btn-primary btn-outline flex min-h-[52px] items-center justify-start rounded-full w-full px-2"
                  >
                    {list.icon && !isImage(list.icon) && (
                      <Icon
                        size={20}
                        id={list.icon}
                      />
                    )}

                    {list.icon && isImage(list.icon) && (
                      <Image
                        src={list.icon.src || ""}
                        alt={list.icon.alt}
                        width={list.icon.width || 36}
                        height={list.icon.height || 36}
                      />
                    )}
                    <div class="text-center text-sm flex-auto">
                      {list.label}
                    </div>
                  </a>
                </li>
              );
            } else {
              return (
                <Image
                  src={list.src || ""}
                  alt={list.alt}
                  width={list.width || 688}
                  height={list.height || 344}
                />
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
