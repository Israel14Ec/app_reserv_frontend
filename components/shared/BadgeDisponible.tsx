interface BadgeDisponibleProps {
  disponible: boolean;
}

const BadgeDisponible: React.FC<BadgeDisponibleProps> = ({ disponible }) => {
  return (
    <span
      className={`
        px-3 py-1
        rounded-full
        font-semibold
        text-sm
        ${disponible ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}
        inline-block
      `}
    >
      {disponible ? 'Disponible' : 'No disponible'}
    </span>
  );
};

export default BadgeDisponible;
