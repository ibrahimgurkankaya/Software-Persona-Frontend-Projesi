import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

/** Tanımsız bir adrese gidildiğinde gösterilen sayfa */
export default function NotFoundPage() {
  return (
    <EmptyState title="Sayfa bulunamadı (404)" description="Aradığın sayfa bu rafta yok gibi görünüyor.">
      <Link to="/" className="btn btn-primary">
        Ana sayfaya dön
      </Link>
    </EmptyState>
  );
}
