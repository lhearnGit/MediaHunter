import { FcLinux } from "react-icons/fc";
import { FaXbox, FaWindows, FaApple, FaPlaystation } from "react-icons/fa";

import { SiNintendo, SiSega } from "react-icons/si";

import { GiRetroController } from "react-icons/gi";
import { Platform } from "@/lib/entities/IGDB/Platform";

interface PlatformMap {
  [id: number]: React.FC<IconProps>;
}
//1 to 5 are platform_families in the IGDB database
const platformMap: PlatformMap = {
  1: FaPlaystation,
  2: FaXbox,
  3: SiSega,
  4: FcLinux,
  5: SiNintendo,
  6: FaWindows, //specific mapping
  14: FaApple,
};
interface IconProps {
  size?: string;
  className?: string;
}

interface PlatformProps {
  showName?: boolean;
  size?: string;
  platform: Platform;
  className?: string;
}
const PlatformIcons = ({
  platform,
  className,
  showName,
  size,
}: PlatformProps) => {
  if (!platform.platform_family && !platformMap[platform.id]) {
    //check if there is no platform family, and the platform.id does not have a mapped icon
    //IGDB contains hundreds of platforms that do not contain easily mappable icons, the majority are retro or extremely niche consoles.
    return (
      //return "Retro"
      <div className={className}>
        <GiRetroController
          size={size ? size : "32px"}
          className="mr-4 bg-inherit"
        />{" "}
        {showName && <p className="my-auto bg-inherit">{platform.name}</p>}
      </div>
    );
  }

  if (!platform.platform_family) {
    const PlatformIcon = platformMap[platform.id]; //otherwise map by the platform.id
    return (
      <div className={className}>
        <PlatformIcon
          size={size ? size : "32px"}
          className=" mx-auto bg-inherit"
        />
        {showName && <p className="my-auto bg-inherit">{platform.name}</p>}
      </div>
    );
  }

  const PlatformIcon = platformMap[platform.platform_family.id];
  if (!platformMap) return <p>{platform.name}</p>; //error

  return (
    <div className={className}>
      <PlatformIcon size={size ? size : "32px"} className="mr-4 bg-inherit" />
      {showName && <p className="my-auto bg-inherit">{platform.name}</p>}
    </div>
  );
};

export default PlatformIcons;
