import clsx from 'clsx';

interface FilmCardProps {
  className?: string;
}

const FilmCard = (props: FilmCardProps) => {
  const { className } = props;

  return (
    <div
      className={clsx('w-[300px] h-[400px] bg-red-400 rounded-t-lg', className)}
    >
      <div className='bg-blue-400 w-full h-[200px]'>image</div>
      <div className='flex flex-col gap-y-3 p-4'>
        <div className='uppercase'>Titre</div>
        <div>description</div>
      </div>
    </div>
  );
};

export default FilmCard;
