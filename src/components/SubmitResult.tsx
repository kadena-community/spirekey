import { TrackerCard } from "@kadena/react-ui";
import { SubmitStatus } from "@/hooks/useSubmit";

interface Props {
  result: any;
  status: SubmitStatus;
}

export const SubmitResult = ({ result, status }: Props) => {
  if (status !== SubmitStatus.ERROR && status !== SubmitStatus.SUCCESS) {
    return null;
  }

  return (
    <TrackerCard
      icon="Chainweb"
      labelValues={[
        {
          label: "Status",
          value: result?.result?.status || "Failed",
        },
        {
          label: "Data",
          value:
            JSON.stringify(result?.result?.data, null, 2) ||
            "Something went wrong...",
        },
      ]}
    />
  );
};
