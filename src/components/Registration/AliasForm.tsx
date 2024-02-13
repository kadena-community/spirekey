import { TextField } from "@kadena/react-ui";
import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import type { FormData, FormUtils } from "./Registration";
import { AnimatePresence, motion } from "framer-motion";

type Props = Pick<FormData, 'alias'> & FormUtils;

export function AliasForm({ alias, updateFields, direction }: Props) {
  const xPositionMultiplier = direction === 'forward' ? 1 : -1;

  return (
    <AnimatePresence>
      <motion.div
        key="register-step-alias"
        initial={{ x: 300 * xPositionMultiplier, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300 * xPositionMultiplier, opacity: 0 }}
      >
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
      </motion.div>
    </AnimatePresence>
  )
}