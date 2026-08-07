export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '1rem',
      color: '#4b5563'
    }}>
      {/* Visual Indicator / Spinner */}
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #059669', // Warna hijau senada dengan tema
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      
      <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>
        Memuat data desa...
      </p>

      {/* Inline Keyframe Animation agar tidak perlu CSS terpisah */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// export default function Loading() {
//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <p>Memuat data...</p>
//     </div>
//   );
// }