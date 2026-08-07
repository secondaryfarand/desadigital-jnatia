'use client';

import styles from './PantauAntrian.module.css';

export default function PantauAntrian({ daftarAntrian = [] }) {
  const totalAntrian = daftarAntrian.length;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>📊 Status Antrian</h2>
        <span
          className={`${styles.badgeTotal} ${
            totalAntrian > 0 ? styles.badgeTotalActive : styles.badgeTotalEmpty
          }`}
        >
          {totalAntrian} Menunggu
        </span>
      </div>

      {totalAntrian === 0 ? (
        <p className={styles.emptyText}>
          ✨ Saat ini tidak ada antrian. Surat Anda akan langsung diproses!
        </p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>No</th>
                <th className={styles.th}>Nomor Tiket</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {daftarAntrian.map((item) => (
                <tr key={item._id} className={styles.tr}>
                  <td className={`${styles.td} ${styles.urutan}`}>
                    #{item.urutan}
                  </td>
                  <td className={`${styles.td} ${styles.nomorTiket}`}>
                    {item.nomor_tiket}
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${
                        item.status === 'DIPROSES'
                          ? styles.statusDiproses
                          : styles.statusPending
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}