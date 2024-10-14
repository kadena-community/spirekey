import { style } from "@kadena/kode-ui";
import { responsiveStyle, tokens } from "@kadena/kode-ui/styles";

export const bodyTextContainer = style({
  ...responsiveStyle({
    md: {
      minHeight: 200,
    }
  }),
});

export const title = style({
  color: tokens.kda.foundation.color.text.base["@init"] + '!important',
});

export const ul = style({
  paddingInlineStart: tokens.kda.foundation.spacing.lg,
});

export const li = style({
  marginBottom: tokens.kda.foundation.spacing.sm,
});

export const dd = style({
  lineHeight: tokens.kda.foundation.typography.lineHeight.md,
});

export const iconClass = style({
  color: tokens.kda.foundation.color.icon.base["@disabled"],
  ':hover': {
    color: tokens.kda.foundation.color.icon.base["@init"],
  },
});

export const wrapperClass = style({});
