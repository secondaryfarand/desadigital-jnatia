// app/components/UserList.js
import styles from './UserList.module.css';

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h3>Belum ada penduduk yang terdaftar.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Daftar Pengguna</h2>
        <p className={styles.subTitle}>Total: {users.length} user terdaftar</p>
      </div>

      <div className={styles.grid}>
        {users.map((user) => {
          const initial = user.username ? user.username.charAt(0).toUpperCase() : '?';

          return (
            <div key={user._id} className={styles.card}>
              <div className={styles.avatar}>{initial}</div>
              <h3 className={styles.userName}>@{user.username}</h3>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}