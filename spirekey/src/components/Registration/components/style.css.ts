import { style } from "@kadena/kode-ui";
import { responsiveStyle, tokens } from "@kadena/kode-ui/styles";

export const textLinkToS = style({
  fontSize: tokens.kda.foundation.typography.fontSize.xs + '!important',
  ...responsiveStyle({
    lg: {
      fontSize: tokens.kda.foundation.typography.fontSize.sm + '!important',
    },
  })
});
