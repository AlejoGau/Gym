'use client';

import { GymConfig } from '@/lib/config';

interface ActivitiesProps {
  config: GymConfig;
}

export default function Activities({ config }: ActivitiesProps) {
  const disciplines = [
    {
      name: 'Musculación',
      category: 'Fuerza Pura',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuHI5W8HjxOg5HBAfBIOQ1jdpSB_cqUykqpKgUljniAB-095WLaX29IulN19ENXq-bQCqGhqeRfqA5xN2hW54v6fBTa8rr9eCYx8dSKD1Ij0NCtLi1g1srzVhXO_h1-GJiZqlrE0Tf8Cbppyn0P9qqI30PqVw8FcIVJc3mrfbzuOeXhlpfOEpu2VG5lKjNlZPtbIbkn0QHpieDNmuZzL0mZwlrElDQ8T_7mdYJB0U6AsfODsTSrk550Vk3P-Vr2BBznnk8ZtulkiI',
    },
    {
      name: 'Cross Training',
      category: 'Alto Impacto',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo0FePDhMglik5ZutfyoDuYTCrYsexyfz00hv6Bc6C3LvHbtFihtXNbqDFO_4Wnx7De_7V1MrV_xSGoITxZBNiPaJ2EsbqTIj51Q38MjH4gH4vU2Caw-3sTwH9blRYVOfHw885-X_stawhgC-tssKltrU33wcH6s0IO00_zq-O0Q_v24xyu6XBRjOHCNPXvOw4ge_bSU-wouMQPJYSxDH3DtjYGA5h1Gkmnd4pYZPQRJ3-JgclD9pHc2vzXHhcEW-O1CYugtWPqAc',
    },
    {
      name: 'HIIT',
      category: 'Resistencia',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8QXy-PzD-j4znvRu00zYdL-H9Omr9FTLFUw9An62jXRr9Ex-dalwIzj8JU0rWM3msgRjohfS568V8zquAqYuDCwLgrlm3_tvjLGCXUPPNovrtOi5P-4747a_E5M7doWVpsTLf01liw8z8E_B6Zt9N0wTaHMM5XmfvPdIXkXRTICYVaWLuN44I896RkIiAaMkr0oT3rJHNCGWbjG2bs6IjWkE-fwmmsKWauDXKat9zKSEATRMCBc7HFgoKGJhAbwC4GA6pf9T2noQ',
    },
    {
      name: 'Yoga',
      category: 'Flexibilidad',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZB5zgqDDo31VJX4KZKeZKrm7G_Am6osRrKQIAkGOL9sOiOgXlddMtKCLA2BB39oG6YndviwiqHQtd1JUtb4ZtH5TFkKFKj6LWVhUCyGa0ZuzDuRD4eQqGzUkO3cdJH60QOd6L5U2-_W-US1WhQiWmZb0Sf0idE-75AEALKtPC7SFbtBUvqQfQE6jPjh4KZA6SuSs_c1TOnuIqbVLan8zRwjJ0mELozRDH5XthMwT_U4mi4g38lE-dm8GKb9jce-1WztzUYemSoHk',
    },
  ];

  return (
    <section className="py-20 bg-surface-container-lowest" id="clases">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12">
        <h2 className="font-headline-lg text-[32px] mb-12 text-white border-l-4 border-primary-fixed pl-4 font-bold tracking-tight uppercase">
          NUESTRAS DISCIPLINAS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {disciplines.map((discipline, idx) => (
            <div key={idx} className="relative group h-[400px] overflow-hidden rounded-xl">
              <img
                alt={discipline.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={discipline.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <h4 className="font-headline-md text-[24px] font-bold text-white mb-1">
                  {discipline.name}
                </h4>
                <span className="text-primary-fixed font-label-md uppercase font-bold tracking-wider">
                  {discipline.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
