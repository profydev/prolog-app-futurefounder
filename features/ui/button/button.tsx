import React, { ButtonHTMLAttributes } from "react";
import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

export enum ButtonSize {
  small = "small",
  medium = "medium",
  large = "large",
  xlarge = "xlarge",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
}

export enum ButtonState {
  default = "default",
  hover = "hover",
  focused = "focused",
  disabled = "disabled",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  state?: ButtonState;
  icon?: React.ReactNode;
  iconPosition?: "leading" | "trailing" | "only";
}

export function Button({
  size = ButtonSize.medium,
  color = ButtonColor.primary,
  state = ButtonState.default,
  icon,
  iconPosition,
  className,
  children,
  ...props
}: ButtonProps) {
  const buttonClass = classNames(
    styles.button,
    styles[`button--${size}`],
    styles[`button--${color}`],
    state === "focused" ? styles[`button--${color}--focused`] : null,
    state === "disabled" ? styles[`button--${color}--disabled`] : null,
    state === "hover" ? styles[`button--${color}--hover`] : null,
    className,
  );

  const renderContent = () => {
    if (iconPosition === "only") {
      return icon;
    }
    if (iconPosition === "leading") {
      return (
        <>
          {icon}
          {children}
        </>
      );
    }
    if (iconPosition === "trailing") {
      return (
        <>
          {children}
          {icon}
        </>
      );
    }
    return children;
  };

  return (
    <button {...props} className={buttonClass}>
      {renderContent()}
    </button>
  );
}
