import { useState } from "react";


interface ModalOptions<T> {
  content: React.ReactNode;
  data?: T;
}

export function useModal<T = unknown, R = unknown>(){
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [resolver, setResolver] = useState<(value: R | null) => void>();

  const openModal = (options: ModalOptions<T>): Promise<R | null> => {
    setContent(options.content);
    setIsOpen(true);

    return new Promise((resolve) => {setResolver(() => resolve)});
  };

  const closeModal = (result: R | null = null) => {
    setIsOpen(false);
    if(resolver){
      resolver(result);
    }
  };

  return {isOpen, content, openModal, closeModal};
}

