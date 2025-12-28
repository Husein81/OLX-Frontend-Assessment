import React, { useId } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = "",
  id,
  ...props
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  const hasError = Boolean(error);
  const hasHelper = Boolean(helperText) && !hasError;

  return (
    <div
      className={`${styles.textareaWrapper} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`${styles.textarea} ${
          hasError ? styles.error : ""
        } ${className}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : hasHelper ? helperId : undefined}
        {...props}
      />
      {hasError && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {hasHelper && (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};
