// Modale.tsx
import React from "react";
import Button from "./button";
import { SlClose } from "react-icons/sl";

// ✅ Typage des props de la modale
interface ModaleProps {
  children: React.ReactNode;
  onClose: () => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
  buttonClassName?: string;
}

const Modale = ({
  children,
  onClose,
}: ModaleProps) => {
  return (
    <div className="modale">
      <div className="modale__container">
        <div className="modale__header">
          <span className="modale__close" onClick={onClose}>
            <SlClose />
          </span>
        </div>

        <div className="modale__body">
          {children}
        </div>

      
      </div>
    </div>
  );
};

export default Modale;
