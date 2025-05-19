import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/en'); // 預設導向英文履歷
}
