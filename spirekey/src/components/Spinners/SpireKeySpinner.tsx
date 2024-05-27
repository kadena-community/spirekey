export const SpireKeySpinner = () => {
  const colors = [
    '#356f5a',
    '#4a9079',
    '#4AA688',
    '#4BBD97',
    '#4BD3A6',
    '#356f5a',
  ].join(';');
  const keyTimes = ['0', '0.5', '0.6', '0.7', '0.8', '1'].join(';');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-style="kdacolor"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      role="status"
    >
      <path d="M16.3,49.4l7-3.4-1.5,7.4-5.5-4Z">
        <animate
          id="spirekeybeam1"
          attributeName="fill"
          dur="3s"
          values={colors}
          keyTimes={keyTimes}
          repeatCount="indefinite"
          begin="0s"
          additive="sum"
        />
      </path>
      <path d="M24.6,39.4l-18.9,2.2,2.2-6.9h17.7l-.9,4.7Z">
        <animate
          attributeName="fill"
          dur="3s"
          values={colors}
          keyTimes={keyTimes}
          repeatCount="indefinite"
          begin="spirekeybeam1.begin+0.4s"
          additive="sum"
        />
      </path>
      <polygon points="24.6 24.6 13.6 17.2 11.5 23.7 25.5 34.7 29.4 33.4 24.6 24.6">
        <animate
          attributeName="fill"
          dur="3s"
          values={colors}
          keyTimes={keyTimes}
          repeatCount="indefinite"
          begin="spirekeybeam1.begin+0.8s"
          additive="sum"
        />
      </polygon>
      <polygon points="28.7 10.6 28.7 32.2 29.4 33.4 32 32.5 34.6 33.4 35.3 32.2 35.3 10.6 28.7 10.6">
        <animate
          attributeName="fill"
          dur="3s"
          values={colors}
          keyTimes={keyTimes}
          repeatCount="indefinite"
          begin="spirekeybeam1.begin+1.2s"
          additive="sum"
        />
      </polygon>
      <polygon points="39.4 24.6 50.4 17.2 52.5 23.7 38.4 34.7 34.6 33.4 39.4 24.6">
        <animate
          attributeName="fill"
          dur="3s"
          values={colors}
          keyTimes={keyTimes}
          repeatCount="indefinite"
          begin="spirekeybeam1.begin+1.6s"
          additive="sum"
        />
      </polygon>
      <path d="M38.4,34.7h17.7s2.2,6.9,2.2,6.9l-18.9-2.2-.9-4.7Z">
        <animate
          attributeName="fill"
          dur="3s"
          values={colors}
          keyTimes={keyTimes}
          repeatCount="indefinite"
          begin="spirekeybeam1.begin+2s"
          additive="sum"
        />
      </path>
      <path d="M42.2,53.3l-1.5-7.4,7,3.4-5.5,4Z">
        <animate
          attributeName="fill"
          dur="3s"
          values={colors}
          keyTimes={keyTimes}
          repeatCount="indefinite"
          begin="spirekeybeam1.begin+2.4s"
          additive="sum"
        />
      </path>
    </svg>
  );
};
