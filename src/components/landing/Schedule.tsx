'use client';

import { GymConfig } from '@/lib/config';

interface ScheduleProps {
  config: GymConfig;
}

export default function Schedule({ config }: ScheduleProps) {
  const timeSlots = [
    {
      time: '07:00',
      mon: { name: 'Cross Training', type: 'normal' },
      tue: { name: 'HIIT', type: 'primary' },
      wed: { name: 'Cross Training', type: 'normal' },
      thu: { name: 'HIIT', type: 'primary' },
      fri: { name: 'Cross Training', type: 'normal' },
    },
    {
      time: '09:00',
      mon: { name: 'Yoga', type: 'secondary' },
      tue: { name: 'Musculación', type: 'normal' },
      wed: { name: 'Yoga', type: 'secondary' },
      thu: { name: 'Musculación', type: 'normal' },
      fri: { name: 'Yoga', type: 'secondary' },
    },
    {
      time: '18:00',
      mon: { name: 'HIIT', type: 'primary' },
      tue: { name: 'Cross Training', type: 'normal' },
      wed: { name: 'HIIT', type: 'primary' },
      thu: { name: 'Cross Training', type: 'normal' },
      fri: { name: 'HIIT', type: 'primary' },
    },
    {
      time: '20:00',
      mon: { name: 'Musculación', type: 'normal' },
      tue: { name: 'Power HIIT', type: 'primary' },
      wed: { name: 'Musculación', type: 'normal' },
      thu: { name: 'Power HIIT', type: 'primary' },
      fri: { name: 'Musculación', type: 'normal' },
    },
  ];

  const renderCellContent = (classItem: { name: string; type: string }) => {
    switch (classItem.type) {
      case 'primary':
        return (
          <div className="bg-primary-fixed/20 p-2.5 rounded text-xs text-primary-fixed font-semibold">
            {classItem.name}
          </div>
        );
      case 'secondary':
        return (
          <div className="bg-secondary-container/20 p-2.5 rounded text-xs text-secondary-container font-semibold">
            {classItem.name}
          </div>
        );
      default:
        return (
          <div className="bg-surface-variant p-2.5 rounded text-xs text-on-surface-variant font-medium">
            {classItem.name}
          </div>
        );
    }
  };

  return (
    <section className="py-20 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-12">
        <h2 className="font-headline-lg text-[32px] text-white mb-12 text-center font-bold tracking-tight uppercase">
          HORARIOS SEMANALES
        </h2>
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-surface-container/25">
          <table className="w-full min-w-[800px] border-collapse text-on-surface-variant">
            <thead>
              <tr className="bg-surface-variant/30 text-white border-b border-white/5">
                <th className="p-5 text-left font-bold text-primary-fixed w-[120px]">Hora</th>
                <th className="p-5 text-left font-bold">Lunes</th>
                <th className="p-5 text-left font-bold">Martes</th>
                <th className="p-5 text-left font-bold">Miércoles</th>
                <th className="p-5 text-left font-bold">Jueves</th>
                <th className="p-5 text-left font-bold">Viernes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {timeSlots.map((slot, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-bold text-white align-middle">{slot.time}</td>
                  <td className="p-5 align-middle">{renderCellContent(slot.mon)}</td>
                  <td className="p-5 align-middle">{renderCellContent(slot.tue)}</td>
                  <td className="p-5 align-middle">{renderCellContent(slot.wed)}</td>
                  <td className="p-5 align-middle">{renderCellContent(slot.thu)}</td>
                  <td className="p-5 align-middle">{renderCellContent(slot.fri)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
