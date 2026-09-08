import { TransformationCard } from './TransformationCard';
import { TRANSFORMATIONS } from '@/lib/constants';
import { Carousel } from '@/components/ui/Carousel';

export function TransformationsGrid() {
  return (
    <Carousel autoPlayInterval={5000}>
      {TRANSFORMATIONS.map((transformation, index) => (
        <TransformationCard
          key={transformation.name}
          transformation={transformation}
          index={index}
        />
      ))}
    </Carousel>
  );
}
