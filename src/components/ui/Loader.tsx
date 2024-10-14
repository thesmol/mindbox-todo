import { IconBaseProps, IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

const Loader: IconType = (props: IconBaseProps) => {
  return (
    <ImSpinner2 {...props} className="animate-spin" size={props.size ?? 40} />
  );
};

export default Loader;
