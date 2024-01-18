import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Button, Heading } from '@kadena/react-ui';

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
