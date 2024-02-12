import { TextField } from "@kadena/react-ui";
import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import type { FormData, FormMethods } from "./Registration";

type Props = Pick<FormData, 'alias'> & FormMethods;

export function AliasForm({ alias, updateFields }: Props) {
  return (
    <SurfaceCard
      title="Alias"
      description="This alias helps you to identify this account. The alias is only stored
      on your device and cannot been seen by others."
    >
      <TextField
        id="alias"
        placeholder="Your alias"
        value={alias}
        autoFocus={true}
        onChange={event => updateFields({alias: event.target.value})}
        validationBehavior="native" 
        isRequired
      />
    </SurfaceCard>
  )
}