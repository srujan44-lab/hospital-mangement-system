import type { SVGAttributes } from "react";

export const MenuIcon = (props: SVGAttributes<HTMLOrSVGElement>) => {
  const { fill = "currentcolor", ...restProps } = props;

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.000000 512.000000"
      {...restProps}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={fill}
      >
        <path
          d="M958 4086 c-48 -13 -61 -21 -112 -65 -103 -92 -98 -275 9 -370 82
-72 -65 -66 1705 -66 1770 0 1623 -6 1705 66 112 99 112 279 0 378 -82 72 62
66 -1685 68 -1248 1 -1585 -1 -1622 -11z"
        />
        <path
          d="M958 2806 c-48 -13 -61 -21 -112 -65 -103 -92 -98 -275 9 -370 80
-70 21 -66 936 -66 l825 0 60 30 c184 94 184 356 0 450 l-60 30 -805 2 c-628
2 -816 -1 -853 -11z"
        />
        <path
          d="M958 1526 c-48 -13 -61 -21 -112 -65 -103 -92 -98 -275 9 -370 82
-72 -65 -66 1705 -66 1770 0 1623 -6 1705 66 112 99 112 279 0 378 -82 72 62
66 -1685 68 -1248 1 -1585 -1 -1622 -11z"
        />
      </g>
    </svg>
  );
};
