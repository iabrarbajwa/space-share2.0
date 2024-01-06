'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}


const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    footer,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
                <div className="relative w-full sm:w-full md:w-[70%] lg:w-[60%] xl:w-[50%] my-6 mx-auto h-full lg:h-auto md:h-auto">
                    <div
                        className={`
                transition-transform
                duration-300
                h-full
                ${showModal ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'}
              `}
                    >
                        <div className="h-full lg:h-auto md:h-auto flex flex-col justify-between w-full bg-white border-t-4 border-sky-500 shadow-lg outline-none focus:outline-none">
                            <div className="flex items-center p-4 border-b-[1px] border-neutral-200 justify-between">
                                <button
                                    className="p-1 border-0 hover:opacity-70 transition"
                                    onClick={handleClose}
                                >
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            <div className="flex-auto p-4">
                                {body}
                            </div>
                            <div className="flex flex-col p-4">
                                {footer && (
                                    <div className="mb-4">
                                        {footer}
                                    </div>
                                )}
                                <div className="flex flex-col gap-2 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                            outline
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 bg-black opacity-25"></div>
        </>
    );
};

export default Modal;
