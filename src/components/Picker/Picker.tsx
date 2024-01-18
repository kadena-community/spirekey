import type {
  TagGroupProps,
  TagListProps,
  TagProps,
} from 'react-aria-components';
import {
  Button,
  Label,
  Tag,
  TagGroup,
  TagList,
  Text,
} from 'react-aria-components';
import { picker } from './Picker.css';

interface MyTagGroupProps<T>
  extends Omit<TagGroupProps, 'children'>,
    Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

export function Picker<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: MyTagGroupProps<T>) {
  return (
    <TagGroup className={picker} {...props}>
      <Label>{label}</Label>
      {description && <Text slot="description">{description}</Text>}
      <TagList items={items} renderEmptyState={renderEmptyState}>
        {children}
      </TagList>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </TagGroup>
  );
}

export function PickerItem({ children, ...props }: TagProps) {
  let textValue = typeof children === 'string' ? children : undefined;
  return (
    <Tag textValue={textValue} {...props}>
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && <Button slot="remove">ⓧ</Button>}
        </>
      )}
    </Tag>
  );
}
