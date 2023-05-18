import { getTotalPages as calculateTotalPages } from "../PageData";

import styles from "./BottomNavbar.module.css";

const BottomNavbar = (props) => {
  const { userListLength, currentPage, setCurrentPage, deleteSelected } = props;

  const totalPages = calculateTotalPages(userListLength);
  const changePage = (index) => {
    setCurrentPage(index);
  };

  const navigatePage = (index) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    setCurrentPage(index);
  };

  let navigationPages = [];
  navigationPages.push(
    <div
      key={-3}
      className={`${styles.page} ${currentPage === 1 ? styles.disabled : ""}`}
      onClick={() => changePage(1)}
    >
      <i className="fas fa-angle-double-left"></i>
    </div>
  );
  navigationPages.push(
    <div
      key={-2}
      className={`${styles.page} ${currentPage === 1 ? styles.disabled : ""}`}
      onClick={() => navigatePage(currentPage - 1)}
    >
      <i className="fas fa-angle-left"></i>
    </div>
  );
  for (let i = 1; i <= totalPages; i++) {
    navigationPages.push(
      <div
        key={i}
        onClick={() => changePage(i)}
        className={`${styles.page} ${currentPage === i ? styles.selected : ""}`}
      >
        {i}
      </div>
    );
  }
  navigationPages.push(
    <div
      key={-1}
      className={`${styles.page} ${
        currentPage === totalPages ? styles.disabled : ""
      }`}
      onClick={() => navigatePage(currentPage + 1)}
    >
      <i className="fas fa-angle-right"></i>
    </div>
  );
  navigationPages.push(
    <div
      key={0}
      className={`${styles.page} ${
        currentPage === totalPages ? styles.disabled : ""
      }`}
      onClick={() => changePage(totalPages)}
    >
      <i className="fas fa-angle-double-right"></i>
    </div>
  );

  return (
    <div className={styles.bottomNavContainer}>
      <button className={styles.delete} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
      <div className={styles.bottomNav}>{navigationPages}</div>
    </div>
  );
};

export default BottomNavbar;
