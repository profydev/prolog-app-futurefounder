import React from "react";
import classNames from "classnames";
import styles from "./badge.module.scss";

export enum BadgeSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export enum BadgeColor {
  primary = "primary",
  gray = "gray",
  critical = "critical",
  warning = "warning",
  success = "success",
  error = "error",
}

type BadgeProps = {
  children: React.ReactNode;
  size?: BadgeSize;
  color?: BadgeColor;
};

export function Badge({
  children,
  size = BadgeSize.md,
  color = BadgeColor.primary,
}: BadgeProps) {
  return (
    <div className={classNames(styles.container, styles[size], styles[color])}>
      {children}
    </div>
  );
}
