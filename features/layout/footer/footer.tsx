import packageJson from "../../../package.json";
import styles from "./footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerText}>Version: {packageJson.version} </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerLink}>
            <a href="#" className={styles.linkStyle}>
              {" "}
              Docs{" "}
            </a>
          </div>
          <div className={styles.footerLink}>
            <a href="#" className={styles.linkStyle}>
              API
            </a>
          </div>
          <div className={styles.footerLink}>
            <a href="#" className={styles.linkStyle}>
              Help
            </a>
          </div>
          <div className={styles.footerLink}>
            <a href="#" className={styles.linkStyle}>
              Community
            </a>
          </div>
        </div>
        <div className={styles.footerLogoWrap}>
          <div className={styles.footerLogo}>
            {" "}
            <Image
              src="/img/prolog-logo.png"
              alt="Prolog Logo"
              width={23}
              height={33}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
