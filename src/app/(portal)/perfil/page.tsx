import Card from '@/components/portal/ui/Card';
import SectionTitle from '@/components/portal/ui/SectionTitle';
import Avatar from '@/components/portal/ui/Avatar';
import Button from '@/components/portal/ui/Button';
import { currentUser } from '@/features/dashboard/data/user';

/** Formatea una fecha ISO a "mes año" en español. */
function formatMemberSince(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
}

export default function Page() {
  const user = currentUser;

  return (
    <div>
      <h1 className="font-display-lg-mobile text-white uppercase tracking-tight mb-6">
        Mi perfil
      </h1>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} src={user.avatarUrl} size={72} />
          <div>
            <p className="font-headline-md text-[22px] font-bold text-white">{user.name}</p>
            <p className="text-on-surface-variant text-body-md">
              Miembro desde {formatMemberSince(user.memberSince)}
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-4">
        <SectionTitle icon="target">Mi objetivo</SectionTitle>
        <Card className="p-5">
          <p className="text-on-surface text-body-lg">{user.goal}</p>
        </Card>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button href="/inicio" variant="secondary" icon="arrow_back">
          Volver al inicio
        </Button>
      </div>

      <p className="mt-8 text-[12px] text-on-surface-variant/60">
        Esta es una versión de demostración del portal. La edición de perfil, la autenticación
        y la configuración de cuenta se incorporarán más adelante.
      </p>
    </div>
  );
}
