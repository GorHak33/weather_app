// ErrorModal.tsx
import React from "react";
import styles from "./ErrorModal.module.scss";

interface ErrorModalProps {
  message: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
