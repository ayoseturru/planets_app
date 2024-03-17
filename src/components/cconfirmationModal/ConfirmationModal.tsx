import React, {useContext, useEffect, useRef} from 'react';
import {StyleSheet, css} from 'aphrodite';
import {TranslationsContext} from "../../providers/TranslationProvider";
import {ThemeContext} from "../../providers/ThemeProvider";
import Grid from "../../utils/Grid";
import CloseIcon from "../closeIcon/CloseIcon";

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({isOpen, onConfirm, onCancel}) => {
    const modalRef = useRef<HTMLDivElement>(null),
        {theme} = useContext(ThemeContext),
        translations = useContext(TranslationsContext),
        styles = StyleSheet.create({
            modalOverlay: {
                backgroundColor: theme.modal.overlayBackground,
                top: 0,
                left: 0,
                zIndex: 999,
                display: isOpen ? 'flex' : 'none',
                position: 'fixed',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            modalContent: {
                ...Grid.define("max-content max-content max-content", "auto"),
                borderRadius: 5,
                backgroundColor: '#fff',
                boxShadow: 'rgba(0, 0, 0, 0.25)',
                width: 407,
                overflow: "hidden"
            },
            title: {
                ...Grid.define("max-content", "auto max-content"),
                ...Grid.setRowCol(1, 1),
                color: theme.modal.titleText,
                backgroundColor: theme.modal.removeBackground,
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                alignItems: "center",
                padding: "9px 16px"
            },
            description: {
                ...Grid.setRowCol(2, 1),
                color: theme.modal.descriptionText,
                margin: 0,
                fontWeight: 400,
                fontSize: 14,
                padding: 16
            },
            buttons: {
                ...Grid.setRowCol(3, 1),
                ...Grid.define("max-content", "max-content max-content"),
                padding: "0 16px 14px 0",
                gridRowGap: 10,
                fontWeight: 400,
                fontSize: 14,
                "justify-content": "right"
            },
            buttonsCommon: {
                maxWidth: 200,
                overflow: "hidden",
                border: 0,
                cursor: "pointer"
            },
            cancelButton: {
                ...Grid.setRowCol(1, 1),
                color: theme.modal.cancelText,
                backgroundColor: theme.modal.background,
                textDecoration: "underline"
            },
            removeButton: {
                ...Grid.setRowCol(1, 2),
                color: theme.modal.removeText,
                backgroundColor: theme.modal.titleText,
                borderRadius: 2,
                padding: "4px 10px"
            }
        }),
        confirmMessage = translations.getMessage("remove"),
        cancelMessage = translations.getMessage("cancel");

    useEffect(() => {
        if (isOpen) modalRef.current?.focus();
    }, [isOpen]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') onCancel();
    };

    return (
        <div className={css(styles.modalOverlay)} onClick={onCancel} onKeyDown={handleKeyDown} tabIndex={-1} ref={modalRef} role="dialog"
             aria-labelledby="confirmation-modal-title">
            <div className={css(styles.modalContent)} onClick={(e) => e.stopPropagation()}>
                <h2 id="confirmation-modal-title" className={css(styles.title)}>
                    {translations.getMessage("removeFavorite")}
                    <CloseIcon onInteraction={onCancel}/>
                </h2>
                <p className={css(styles.description)}>{translations.getMessage("removeFavoriteDesc")}</p>
                <div className={css(styles.buttons)}>
                    <button className={css(styles.cancelButton, styles.buttonsCommon)} onClick={onCancel} aria-label={confirmMessage}>{cancelMessage}</button>
                    <button className={css(styles.removeButton, styles.buttonsCommon)} onClick={onConfirm} aria-label={cancelMessage}>{confirmMessage}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
