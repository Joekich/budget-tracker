import styles from './dashboard-blocks.module.scss';

export function DashboardBalanceBlock() {
  return (
    <div className={styles.block}>
      <div className={styles.balancePart}>1</div>
      <div className={styles.balancePart}>2</div>
      <div className={styles.balancePart}>3</div>
    </div>
  );
}
