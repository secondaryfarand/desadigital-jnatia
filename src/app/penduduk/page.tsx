export const dynamic = 'force-dynamic';

import { getUsersQuery } from '@/features/penduduk/queries';
import UserList from '@/features/penduduk/components/UserList/UserList';
import UserForm from '@/features/penduduk/components/UserForm/UserForm';

export default async function PenduduksPage() {
  const users = await getUsersQuery();
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <UserForm /> 
      <UserList users={users} />
    </main>
  );
}

// import LandingPage from '@/features/landing/components/LandingPage';

// export default function Home() {
//   return <LandingPage />;
// }   