import React from "react";
import { Button } from "@features/ui";
import classNames from "classnames";
import styles from "./menu-item-link.module.scss";
import { ButtonColor, ButtonSize } from "@features/ui";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
};

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
  color,
  size,
}: MenuItemProps) {
  return (
    <li className={classNames(styles.listItem, className)}>
      <Button
        className={styles.anchor}
        onClick={onClick}
        color={color}
        size={size}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.icon} src={iconSrc} alt={`${text} icon`} />{" "}
        {!isCollapsed && text}{" "}
      </Button>
    </li>
  );
}
