import { useNetwork } from "@/context/NetworkContext";
import { SelectField } from "@kadena/react-ui";
import { useForm } from "react-hook-form";

const FORM_DEFAULT = {
  network: "testnet04",
};

export const NetworkSelector = () => {
  const { getValues, register } = useForm({
    defaultValues: FORM_DEFAULT,
    reValidateMode: "onBlur",
  });
  const { setNetwork } = useNetwork();
  const onNetworkChange = () => setNetwork(getValues("network"));
  return (
    <SelectField
      label="Network"
      selectProps={{
        id: "network",
        ariaLabel: "Network",
        ...register("network", {
          onChange: onNetworkChange,
        }),
      }}
    >
      <option value="testnet04">Testnet04</option>
      <option value="fast-development">Fast Development</option>
    </SelectField>
  );
};
