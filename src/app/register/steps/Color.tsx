import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Heading } from 'react-aria-components';

export const Color = () => {
  return (
    <div>
      <Heading>Color</Heading>
      <Picker
        label="Color"
        description="Please pick a color"
        selectionMode="single"
      >
        <PickerItem>Green</PickerItem>
        <PickerItem>Red</PickerItem>
      </Picker>
    </div>
  );
};
