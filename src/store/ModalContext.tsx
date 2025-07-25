'use client';

import React, { createContext, useState, ReactNode, useCallback } from 'react';
import Modal from '@/components/elements/common/Modal';

interface ModalContent {
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: 'success' | 'error' | 'confirm';
}

interface ModalContextType {
    isOpen: boolean;
    modalContent: ModalContent | null;
    showModal: (content: ModalContent) => void;
    closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);

    const showModal = useCallback((content: ModalContent) => {
        setModalContent(content);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // Add a delay to allow the exit animation to complete
        setTimeout(() => setModalContent(null), 300);
    }, []);

    const value = {
        isOpen,
        modalContent,
        showModal,
        closeModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
            <Modal />
        </ModalContext.Provider>
    );
};
