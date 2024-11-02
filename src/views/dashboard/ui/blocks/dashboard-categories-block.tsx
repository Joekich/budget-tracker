import styles from './dashboard-blocks.module.scss';

export function DashboardCategoriesBlock() {
  return (
    <div className={styles.categoriesBlock}>
      <div className={styles.categoryPart}>Категории расходов</div>
      <div className={styles.categoryPart}>Категории трат</div>
    </div>
  );
}
