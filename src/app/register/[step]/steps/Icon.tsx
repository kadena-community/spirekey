import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Button, Heading } from '@kadena/react-ui';

export const Icon = () => {
  return (
    <div>
      <Heading>Icon</Heading>
      <Picker
        label="Icon"
        description="Please pick an icon"
        selectionMode="single"
      >
        <PickerItem>A</PickerItem>
        <PickerItem>B</PickerItem>
        <PickerItem>C</PickerItem>
      </Picker>
    </div>
  );
};
