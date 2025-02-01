import type { SVGAttributes } from "react";

export const SortIcon = (props: SVGAttributes<HTMLOrSVGElement>) => {
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
          d="M2475 3987 c-22 -8 -56 -22 -75 -31 -19 -10 -553 -536 -1187 -1170
-1293 -1291 -1208 -1197 -1208 -1346 1 -56 6 -88 24 -127 29 -66 110 -143 176
-169 49 -19 103 -19 2355 -19 2252 0 2306 0 2355 19 66 26 147 103 176 169 18
39 23 71 24 127 0 149 85 55 -1208 1347 -1037 1037 -1158 1155 -1211 1179 -69
31 -162 40 -221 21z"
        />
      </g>
    </svg>
  );
};
