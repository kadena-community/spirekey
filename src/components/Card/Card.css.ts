import { atoms } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';

export const card = style([
  atoms({
    border: 'hairline',
    borderRadius: 'md',
    position: 'relative',
  }),
  {
    margin: '0 auto',
    padding: '1rem 1.25rem',
    background: 'linear-gradient(145deg, #122F4A, #0B1D2E)',
    aspectRatio: '8560 / 5398',
    height: 'auto',
    transformStyle: 'preserve-3d',
    transformOrigin: '50% 50%',
    boxShadow: '-20px 14px 54px rgba(0, 0, 0, 0.55)',
    flexShrink: 0,
    transition: 'transform 0.5s',
    selectors: {
      '&[data-collapsed="true"]:not([data-active="true"])': {
        transform: 'rotateX(-25deg)',
        textShadow: '0 -5px 3px rgba(0, 0, 0, 0.8)',
      },
      '&[data-active="true"]': {
        transform: 'rotateX(15deg)',
        textShadow: '0 5px 3px rgba(0, 0, 0, 0.8)',
      },
    },
  },
]);

export const thickness = style([
  atoms({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: 'md',
  }),
  {
    background: 'linear-gradient(145deg, #4684c1, #343174)',
    transform: 'translateZ(-4px)',
    aspectRatio: '8560 / 5398',
    height: 'auto',
    selectors: {
      '&:nth-child(2)': {
        transform: 'translateZ(-8px)',
      },
      '&:nth-child(3)': {
        transform: 'translateZ(-8px)',
      },
    },
  },
]);

export const cardBody = style([
  {
    height: '100%',
    width: '100%',
  },
]);

export const logo = style([
  {
    position: 'absolute',
    top: '1.15rem',
    left: '1rem',
    height: '2rem',
    width: '50%',
    transform: 'translateZ(5px)',
    zIndex: 1,

    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMjUgMCA5MCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjkuNzE0OSAxOS4xNDI5VjQuODU3MTRIMzEuOTAwNlYxMC44SDMyLjI0MzVDMzMuMTI5MiA5LjgxNDI5IDM0LjkwMDYgNy44NDI4NiAzNy41NTc4IDQuODU3MTRINDAuNDI5MkMzOS4zNTc4IDYuMDQyODYgMzcuMjE0OSA4LjM4NTcxIDM0LjAwMDYgMTEuODg1N0MzNS4xMTQ5IDEzLjEgMzcuMzQzNSAxNS41MTQzIDQwLjY3MiAxOS4xNDI5SDM3LjcwMDZDMzYuODAwNiAxOC4xMjg2IDM0Ljk4NjMgMTYuMTE0MyAzMi4yNDM1IDEzLjA4NTdIMzEuOTAwNlYxOS4xNDI5SDI5LjcxNDlaIiBmaWxsPSIjRjBFQUU2Ii8+CjxwYXRoIGQ9Ik00MS4yNTc4IDE5LjE0MjlDNDEuOTI5MiAxNi43NzE0IDQzLjI4NjMgMTIgNDUuMzE0OSA0Ljg1NzE0SDQ5LjIwMDZDNDkuODcyIDcuMjI4NTcgNTEuMjI5MiAxMiA1My4yNTc4IDE5LjE0MjlINTAuOTg2M0M1MC44MjkyIDE4LjU4NTcgNTAuNTE0OSAxNy40NTcxIDUwLjA0MzUgMTUuNzcxNEg0NC40NDM1QzQ0LjMwMDYgMTYuMzI4NiA0My45ODYzIDE3LjQ1NzEgNDMuNTAwNiAxOS4xNDI5SDQxLjI1NzhaTTQ1LjAyOTIgMTMuNzQyOUg0OS41MTQ5QzQ5LjE3MiAxMi40ODU3IDQ4LjQ4NjMgOS45NzE0MyA0Ny40NDM1IDYuMjI4NTdINDcuMTAwNkM0Ni43NDM1IDcuNDg1NzEgNDYuMDU3OCA5Ljk4NTcxIDQ1LjAyOTIgMTMuNzQyOVoiIGZpbGw9IiNGMEVBRTYiLz4KPHBhdGggZD0iTTU0LjY1NzggMTkuMTQyOVY0Ljg1NzE0SDYwLjM3MkM2Mi4yNzIgNC44NTcxNCA2My43MjkyIDUuMzQyODYgNjQuNzI5MiA2LjMxNDI5QzY1Ljc1NzggNy4yODU3MSA2Ni4yNTc4IDguNzQyODYgNjYuMjU3OCAxMC42NzE0VjEzLjM0MjlDNjYuMjU3OCAxNS4zIDY1Ljc0MzUgMTYuNzQyOSA2NC43MjkyIDE3LjdDNjMuNzE0OSAxOC42NTcxIDYyLjI3MiAxOS4xMjg2IDYwLjM3MiAxOS4xMjg2QzU5LjEwMDYgMTkuMTQyOSA1Ny4yMDA2IDE5LjE0MjkgNTQuNjU3OCAxOS4xNDI5Wk01Ni44ODYzIDE3LjE1NzFINjAuMzg2M0M2MS42MTQ5IDE3LjE1NzEgNjIuNTQzNSAxNi44NDI5IDYzLjEyOTIgMTYuMjE0M0M2My43MjkyIDE1LjU3MTQgNjQuMDI5MiAxNC42NDI5IDY0LjAyOTIgMTMuNFYxMC41ODU3QzY0LjAyOTIgOS4zNDI4NiA2My43MjkyIDguNDE0MjkgNjMuMTI5MiA3LjhDNjIuNTI5MiA3LjE4NTcxIDYxLjYxNDkgNi44ODU3MSA2MC4zODYzIDYuODg1NzFINTYuODg2M1YxNy4xNTcxWiIgZmlsbD0iI0YwRUFFNiIvPgo8cGF0aCBkPSJNNjguNzU3OCAxOS4xNDI5VjQuODU3MTRINzcuNzQzNVY2Ljg3MTQzSDcwLjk1NzhWMTAuOTU3MUg3Ny4xODYzVjEyLjk3MTRINzAuOTU3OFYxNy4xNTcxSDc3Ljg0MzVWMTkuMTQyOUM3Ni4zMjkyIDE5LjE0MjkgNzMuMzAwNiAxOS4xNDI5IDY4Ljc1NzggMTkuMTQyOVoiIGZpbGw9IiNGMEVBRTYiLz4KPHBhdGggZD0iTTgwLjE0MzUgMTkuMTQyOVY0Ljg1NzE0SDg0LjM4NjNDODUuMDI5MiA3IDg2LjMxNDkgMTEuMjcxNCA4OC4yNDM1IDE3LjY3MTRIODguNTg2M1Y0Ljg1NzE0SDkwLjc1NzhWMTkuMTQyOUg4Ni41MTQ5Qzg1Ljg3MiAxNyA4NC41ODYzIDEyLjcyODYgODIuNjU3OCA2LjMxNDI5SDgyLjMxNDlWMTkuMTQyOUg4MC4xNDM1WiIgZmlsbD0iI0YwRUFFNiIvPgo8cGF0aCBkPSJNOTIuNjg2MyAxOS4xNDI5QzkzLjM1NzggMTYuNzcxNCA5NC43MTQ5IDEyIDk2Ljc0MzUgNC44NTcxNEgxMDAuNjI5QzEwMS4zMDEgNy4yMjg1NyAxMDIuNjU4IDEyIDEwNC42ODYgMTkuMTQyOUgxMDIuNDE1QzEwMi4yNTggMTguNTg1NyAxMDEuOTQzIDE3LjQ1NzEgMTAxLjQ3MiAxNS43NzE0SDk1Ljg3MkM5NS43MjkyIDE2LjMyODYgOTUuNDE0OSAxNy40NTcxIDk0LjkyOTIgMTkuMTQyOUg5Mi42ODYzWk05Ni40NTc4IDEzLjc0MjlIMTAwLjk0M0MxMDAuNjAxIDEyLjQ4NTcgOTkuOTE0OSA5Ljk3MTQzIDk4Ljg3MiA2LjIyODU3SDk4LjUyOTJDOTguMTcyMSA3LjQ4NTcxIDk3LjQ4NjMgOS45ODU3MSA5Ni40NTc4IDEzLjc0MjlaIiBmaWxsPSIjRjBFQUU2Ii8+Cjwvc3ZnPg==")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
  },
]);

export const logoCenter = style([
  {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'translateZ(5px) scale(0.4)',
    opacity: 0.2,
    zIndex: 1,
    // filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDI1IDI1IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMjUuNDcyIDI0SDE2Ljc1NzhMMTYuNjg2MyAyMy45NDI5TDUuOTAwNjEgMTUuNTQyOUwxMC4zMTQ5IDEyTDI1LjQwMDYgMjMuOTQyOUwyNS40NzIgMjRaIiBmaWxsPSIjNEE5MDc5Ii8+PHBhdGggZD0iTTI1LjQ3MiAwSDE2Ljc1NzhMMTYuNjg2MyAwLjA1NzE0MjlMNS45MDA2MSA4LjQ1NzE0TDEwLjMxNDkgMTJMMjUuNDAwNiAwLjA1NzE0MjlMMjUuNDcyIDBaIiBmaWxsPSIjNEE5MDc5Ii8+PHBhdGggZD0iTTUuOTAwNjEgMTUuNTQyOVYyNEw1LjgyOTE4IDIzLjk0MjlMMC41NzIwNDIgMTkuOFYxOS43ODU3TDAuNDg2MzI4IDE5LjcyODZWNC4yNzE0M0wwLjU3MjA0MiA0LjIxNDI5VjQuMkw1LjgyOTE4IDAuMDU3MTQyOUw1LjkwMDYxIDBWOC40NTcxNFYxNS41NDI5WiIgZmlsbD0iIzRBOTA3OSIvPjwvc3ZnPg==")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
]);

export const chainweb = style([
  {
    position: 'absolute',
    bottom: '1.25rem',
    right: '0.75rem',
    zIndex: 1,
    alignItems: 'center',
    transform: 'translateZ(5px) scale(0.8)',
    transformOrigin: 'bottom right',
    // filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
  },
]);

export const chainwebIcon = style([
  {
    height: '4rem',
    width: '4rem',
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTQwN18yMTUwKSI+PHBhdGggZD0iTTM0LjE3NDcgMTguNjJDMzUuMTM1MSAxOC42MiAzNS45MTM3IDE3Ljg0MTQgMzUuOTEzNyAxNi44ODExQzM1LjkxMzcgMTUuOTIwNyAzNS4xMzUxIDE1LjE0MjEgMzQuMTc0NyAxNS4xNDIxQzMzLjIxNDMgMTUuMTQyMSAzMi40MzU4IDE1LjkyMDcgMzIuNDM1OCAxNi44ODExQzMyLjQzNTggMTcuODQxNCAzMy4yMTQzIDE4LjYyIDM0LjE3NDcgMTguNjJaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yOC45NTg1IDM1LjEyNzZDMjkuOTA2NSAzNC45NzM3IDMwLjU1MDIgMzQuMDgwNSAzMC4zOTYzIDMzLjEzMjVDMzAuMjQyNSAzMi4xODQ1IDI5LjM0OTIgMzEuNTQwNyAyOC40MDEyIDMxLjY5NDZDMjcuNDUzMyAzMS44NDg1IDI2LjgwOTUgMzIuNzQxNyAyNi45NjM0IDMzLjY4OTdDMjcuMTE3MyAzNC42Mzc3IDI4LjAxMDUgMzUuMjgxNSAyOC45NTg1IDM1LjEyNzZaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMS43MDE1IDM1LjEyODVDMTIuNjQ5NCAzNC45NzQ3IDEzLjI5MzIgMzQuMDgxNCAxMy4xMzkzIDMzLjEzMzRDMTIuOTg1NCAzMi4xODU0IDEyLjA5MjIgMzEuNTQxNyAxMS4xNDQyIDMxLjY5NTZDMTAuMTk2MiAzMS44NDk1IDkuNTUyNDggMzIuNzQyNyA5LjcwNjM2IDMzLjY5MDdDOS44NjAyNCAzNC42Mzg3IDEwLjc1MzUgMzUuMjgyNCAxMS43MDE1IDM1LjEyODVaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPjxwYXRoIGQ9Ik02LjA0OTQ5IDE4LjYyQzcuMDA5ODkgMTguNjIgNy43ODg0NCAxNy44NDE0IDcuNzg4NDQgMTYuODgxMUM3Ljc4ODQ0IDE1LjkyMDcgNy4wMDk4OSAxNS4xNDIxIDYuMDQ5NDkgMTUuMTQyMUM1LjA4OTEgMTUuMTQyMSA0LjMxMDU1IDE1LjkyMDcgNC4zMTA1NSAxNi44ODExQzQuMzEwNTUgMTcuODQxNCA1LjA4OTEgMTguNjIgNi4wNDk0OSAxOC42MloiIGZpbGw9IndoaXRlIj48L3BhdGg+PHBhdGggZD0iTTIwLjExMTYgOC40MDMxNkMyMS4wNzIgOC40MDMxNiAyMS44NTA1IDcuNjI0NiAyMS44NTA1IDYuNjY0MjFDMjEuODUwNSA1LjcwMzgyIDIxLjA3MiA0LjkyNTI2IDIwLjExMTYgNC45MjUyNkMxOS4xNTEyIDQuOTI1MjYgMTguMzcyNiA1LjcwMzgyIDE4LjM3MjYgNi42NjQyMUMxOC4zNzI2IDcuNjI0NiAxOS4xNTEyIDguNDAzMTYgMjAuMTExNiA4LjQwMzE2WiIgZmlsbD0id2hpdGUiPjwvcGF0aD48cGF0aCBkPSJNMjQuOTQ3NCAyMi43MzY4TDI4LjQ3MzcgMjAuMTc0N0MyOS44Mjk1IDE5LjE5MDUgMjkuMTMyNiAxNy4wNDc0IDI3LjQ1NzkgMTcuMDQ3NEgyMy4xMDMxTDIxLjc1NTggMTIuOTAyMUMyMS4yMzg5IDExLjMwODQgMTguOTg1MiAxMS4zMDg0IDE4LjQ2NzQgMTIuOTAyMUwxNy4xMjEgMTcuMDUyNkgxMi43NjIxQzExLjA4NjMgMTcuMDUyNiAxMC4zOTA1IDE5LjE5NTggMTEuNzQ1MiAyMC4xOEwxNS4yNzE2IDIyLjczNjhMMTMuOTI1MiAyNi44ODIxQzEzLjQwNzQgMjguNDc1OCAxNS4yMzA1IDI5LjggMTYuNTg1MiAyOC44MTU4TDE5LjA5NTggMjYuOTkxNkMxOS4zOTEyIDI2Ljc3NyAxOS43NDcgMjYuNjYxNSAyMC4xMTIxIDI2LjY2MTVDMjAuNDc3MiAyNi42NjE1IDIwLjgzMyAyNi43NzcgMjEuMTI4NCAyNi45OTE2TDIzLjYzNzkgMjguODE1OEMyNC45OTM3IDI5LjggMjYuODE2OCAyOC40NzU4IDI2LjI5ODkgMjYuODgyMUwyNC45NDc0IDIyLjczNjhaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPjxwYXRoIGQ9Ik0zNC4xNzQ3IDE4LjYyQzM1LjEzNTEgMTguNjIgMzUuOTEzNyAxNy44NDE0IDM1LjkxMzcgMTYuODgxMUMzNS45MTM3IDE1LjkyMDcgMzUuMTM1MSAxNS4xNDIxIDM0LjE3NDcgMTUuMTQyMUMzMy4yMTQzIDE1LjE0MjEgMzIuNDM1OCAxNS45MjA3IDMyLjQzNTggMTYuODgxMUMzMi40MzU4IDE3Ljg0MTQgMzMuMjE0MyAxOC42MiAzNC4xNzQ3IDE4LjYyWiIgZmlsbD0iI0ZGQ0MwMCI+PC9wYXRoPjxwYXRoIGQ9Ik0yOC42NzkgMzUuMTUxNkMyOS42MzkzIDM1LjE1MTYgMzAuNDE3OSAzNC4zNzMgMzAuNDE3OSAzMy40MTI2QzMwLjQxNzkgMzIuNDUyMiAyOS42MzkzIDMxLjY3MzcgMjguNjc5IDMxLjY3MzdDMjcuNzE4NiAzMS42NzM3IDI2Ljk0IDMyLjQ1MjIgMjYuOTQgMzMuNDEyNkMyNi45NCAzNC4zNzMgMjcuNzE4NiAzNS4xNTE2IDI4LjY3OSAzNS4xNTE2WiIgZmlsbD0iI0ZGQ0MwMCI+PC9wYXRoPjxwYXRoIGQ9Ik0xMS40MjExIDM1LjE1MTZDMTIuMzgxNSAzNS4xNTE2IDEzLjE2IDM0LjM3MyAxMy4xNiAzMy40MTI2QzEzLjE2IDMyLjQ1MjIgMTIuMzgxNSAzMS42NzM3IDExLjQyMTEgMzEuNjczN0MxMC40NjA3IDMxLjY3MzcgOS42ODIxMyAzMi40NTIyIDkuNjgyMTMgMzMuNDEyNkM5LjY4MjEzIDM0LjM3MyAxMC40NjA3IDM1LjE1MTYgMTEuNDIxMSAzNS4xNTE2WiIgZmlsbD0iI0ZGQ0MwMCI+PC9wYXRoPjxwYXRoIGQ9Ik02LjA0OTQ5IDE4LjYyQzcuMDA5ODkgMTguNjIgNy43ODg0NCAxNy44NDE0IDcuNzg4NDQgMTYuODgxMUM3Ljc4ODQ0IDE1LjkyMDcgNy4wMDk4OSAxNS4xNDIxIDYuMDQ5NDkgMTUuMTQyMUM1LjA4OTEgMTUuMTQyMSA0LjMxMDU1IDE1LjkyMDcgNC4zMTA1NSAxNi44ODExQzQuMzEwNTUgMTcuODQxNCA1LjA4OTEgMTguNjIgNi4wNDk0OSAxOC42MloiIGZpbGw9IiNGRkNDMDAiPjwvcGF0aD48cGF0aCBkPSJNMjAuMTExNiA4LjQwMzE2QzIxLjA3MiA4LjQwMzE2IDIxLjg1MDUgNy42MjQ2IDIxLjg1MDUgNi42NjQyMUMyMS44NTA1IDUuNzAzODIgMjEuMDcyIDQuOTI1MjYgMjAuMTExNiA0LjkyNTI2QzE5LjE1MTIgNC45MjUyNiAxOC4zNzI2IDUuNzAzODIgMTguMzcyNiA2LjY2NDIxQzE4LjM3MjYgNy42MjQ2IDE5LjE1MTIgOC40MDMxNiAyMC4xMTE2IDguNDAzMTZaIiBmaWxsPSIjRkZDQzAwIj48L3BhdGg+PGcgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsiPjxwYXRoIGQ9Ik0yMS4xMjg0IDI1LjUxNThMMjguNDc3OSAyMC4xNzU4QzI5LjgzMzcgMTkuMTkxNiAyOS4xMzY4IDE3LjA0ODQgMjcuNDYyMSAxNy4wNDg0SDEyLjc2MjFDMTEuMDg2MyAxNy4wNDg0IDEwLjM5MDUgMTkuMTkxNiAxMS43NDUyIDIwLjE3NThMMTkuMDk1OCAyNS41MTU4QzE5LjM5MSAyNS43MzA4IDE5Ljc0NjggMjUuODQ2NyAyMC4xMTIxIDI1Ljg0NjdDMjAuNDc3MyAyNS44NDY3IDIwLjgzMzIgMjUuNzMwOCAyMS4xMjg0IDI1LjUxNThaIiBmaWxsPSIjRUQwOThGIj48L3BhdGg+PC9nPjxnIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7Ij48cGF0aCBkPSJNMTguNDY3NCAxMi45MDMyTDEzLjkyNTMgMjYuODgzMkMxMy40MDc0IDI4LjQ3NjggMTUuMjMwNSAyOS44MDExIDE2LjU4NTMgMjguODE2OEwxOS4wOTU4IDI2Ljk5MjZDMTkuMzkxMiAyNi43NzgxIDE5Ljc0NyAyNi42NjI1IDIwLjExMjEgMjYuNjYyNUMyMC40NzcyIDI2LjY2MjUgMjAuODMzIDI2Ljc3ODEgMjEuMTI4NCAyNi45OTI2TDIzLjYzNzkgMjguODE2OEMyNC45OTM3IDI5LjgwMTEgMjYuODE2OCAyOC40NzY4IDI2LjI5ODkgMjYuODgzMkwyMS43NTU4IDEyLjkwMzJDMjEuMjM4OSAxMS4zMDk1IDE4Ljk4NTMgMTEuMzA5NSAxOC40Njc0IDEyLjkwMzJaIiBmaWxsPSIjMjdCN0U2Ij48L3BhdGg+PC9nPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwXzE0MDdfMjE1MCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ3aGl0ZSI+PC9yZWN0PjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPgo=")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
]);

export const accountNameCollapsed = style([atoms({})]);

export const accountName = style([
  atoms({
    fontSize: 'lg',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
  }),
  {
    top: '50%',
    left: 0,
    zIndex: 1,
    transform: 'translateZ(5px) translateY(-50%)',
    // filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
  },
]);

export const networkCollapsed = style([
  atoms({
    fontFamily: 'codeFont',
    fontSize: 'xs',
  }),
]);

export const network = style([
  atoms({
    fontFamily: 'codeFont',
    fontSize: 'md',
    position: 'absolute',
  }),
  {
    bottom: '1rem',
    left: '1.25rem',
    zIndex: 1,
    alignItems: 'center',
    transform: 'translateZ(5px)',
    // filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
  },
]);

export const devices = style([
  {
    position: 'absolute',
    top: '1.5rem',
    right: '1.25rem',
    zIndex: 1,
    alignItems: 'center',
    transform: 'translateZ(5px)',
    // filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
  },
]);

export const phoneIcon = style([
  {
    height: '1.25rem',
    width: '1.5rem',
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0id2hpdGUiIGNsYXNzPSJiaSBiaS1waG9uZSIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBkPSJNMTEgMWExIDEgMCAwIDEgMSAxdjEyYTEgMSAwIDAgMS0xIDFINWExIDEgMCAwIDEtMS0xVjJhMSAxIDAgMCAxIDEtMXpNNSAwYTIgMiAwIDAgMC0yIDJ2MTJhMiAyIDAgMCAwIDIgMmg2YTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0yeiIgZmlsbD0id2hpdGUiPjwvcGF0aD4KICA8cGF0aCBkPSJNOCAxNGExIDEgMCAxIDAgMC0yIDEgMSAwIDAgMCAwIDIiIGZpbGw9IndoaXRlIj48L3BhdGg+Cjwvc3ZnPg==")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
]);

export const desktopIcon = style([
  {
    height: '1.25rem',
    width: '1.5rem',
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktbGFwdG9wIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxwYXRoIGQ9Ik0xMy41IDNhLjUuNSAwIDAgMSAuNS41VjExSDJWMy41YS41LjUgMCAwIDEgLjUtLjV6bS0xMS0xQTEuNSAxLjUgMCAwIDAgMSAzLjVWMTJoMTRWMy41QTEuNSAxLjUgMCAwIDAgMTMuNSAyek0wIDEyLjVoMTZhMS41IDEuNSAwIDAgMS0xLjUgMS41aC0xM0ExLjUgMS41IDAgMCAxIDAgMTIuNSIgZmlsbD0id2hpdGUiPjwvcGF0aD4KPC9zdmc+")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
]);

export const usbIcon = style([
  {
    height: '1.25rem',
    width: '1.5rem',
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktdXNiLWRyaXZlIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxwYXRoIGQ9Ik02IC41YS41LjUgMCAwIDEgLjUtLjVoNGEuNS41IDAgMCAxIC41LjV2NEg2ek03IDF2MWgxVjF6bTIgMHYxaDFWMXpNNiA1YTEgMSAwIDAgMC0xIDF2OC41QTEuNSAxLjUgMCAwIDAgNi41IDE2aDRhMS41IDEuNSAwIDAgMCAxLjUtMS41VjZhMSAxIDAgMCAwLTEtMXptMCAxaDV2OC41YS41LjUgMCAwIDEtLjUuNWgtNGEuNS41IDAgMCAxLS41LS41eiIgZmlsbD0id2hpdGUiPjwvcGF0aD4KPC9zdmc+")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
]);
