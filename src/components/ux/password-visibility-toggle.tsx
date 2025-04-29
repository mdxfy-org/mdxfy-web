import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Eye, EyeClosed } from "@solar-icons/react";

interface PasswordVisibilityToggleProps {
  isPassVisible: boolean;
  togglePassVisibility: () => void;
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({
  isPassVisible,
  togglePassVisibility,
}) => {
  return (
    <Button
      type="button"
      size="sm"
      variant="flat"
      className="-right-[10px]"
      isIconOnly
      onPress={togglePassVisibility}
    >
      <motion.div
        initial="hidden"
        animate={isPassVisible ? "hidden" : "visible"}
        className="absolute"
        variants={{
          hidden: { opacity: 0, rotateX: -90 },
          visible: { opacity: 1, rotateX: 0 },
        }}
      >
        <EyeClosed
          weight="LineDuotone"
          className="stroke-[0.1px] stroke-current text-default-700 text-xl group-data-[pressed=true]:scale-y-90 transition-transform translate-y-0.5 pointer-events-none"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isPassVisible ? "visible" : "hidden"}
        className="absolute"
        variants={{
          hidden: { opacity: 0, rotateX: 90 },
          visible: { opacity: 1, rotateX: 0 },
        }}
      >
        <Eye
          className="text-default-700 text-xl group-data-[pressed=true]:scale-y-85 transition-transform pointer-events-none"
        />
      </motion.div>
    </Button>
  );
};

export default PasswordVisibilityToggle;