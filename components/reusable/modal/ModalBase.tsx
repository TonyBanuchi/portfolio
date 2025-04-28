import React, { useEffect } from "react";

// Modal.tsx
interface ModalProps<T, R> {
  // Add both generic parameters
  isOpen: boolean;
  onClose: (result?: R) => void;
  prompt: string;
  children: React.ReactNode;
  data?: T; // Optional data prop
}

export default function ModalBase<T, R>({
  isOpen,
  onClose,
  prompt,
  children,
  data,
}: Readonly<ModalProps<T, R>>) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  // Pass onClose to the children to allow them to close the modal with a result
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        initialData: data, 
        onSubmit: onClose 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
    return child;
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="title-bar">
          <h2>{prompt}</h2>
          <button className="modal-close" onClick={() => onClose()}>
            x
          </button>
        </div>
        {childrenWithProps}
      </div>
    </div>
  );
}
