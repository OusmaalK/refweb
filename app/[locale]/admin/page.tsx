// app/[locale]/admin/page.tsx
import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/fr/admin/login');
}