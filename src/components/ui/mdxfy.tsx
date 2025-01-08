import { cn } from "@/lib/utils";

interface EstoqueTemplateGraphicsProps {
  className?: string;
  style?: React.CSSProperties;
}

const Icon = ({ className, style }: EstoqueTemplateGraphicsProps) => {
  return (
    <svg
      width="26"
      height="26"
      className={cn("fill-none", className)}
      style={style}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1289_272)">
        <rect x="1" y="1" width="24" height="24" rx="6" fill="white" />
        <path
          d="M14.5 13C14.5 13.8284 13.8284 14.5 13 14.5C12.1716 14.5 11.5 13.8284 11.5 13C11.5 12.1716 12.1716 11.5 13 11.5C13.8284 11.5 14.5 12.1716 14.5 13Z"
          stroke="#5A5A5A"
          stroke-width="0.5"
        />
        <circle cx="13" cy="13" r="3" stroke="#5A5A5A" stroke-width="0.5" />
        <rect
          x="3"
          y="3"
          width="20"
          height="20"
          rx="5"
          stroke="#5A5A5A"
          stroke-width="0.5"
        />
        <rect
          x="5"
          y="3"
          width="16"
          height="20"
          rx="4"
          stroke="#5A5A5A"
          stroke-width="0.5"
        />
        <rect
          x="4"
          y="3"
          width="18"
          height="20"
          rx="4"
          stroke="#5A5A5A"
          stroke-width="0.5"
        />
        <path d="M16 28V-2" stroke="#5A5A5A" stroke-width="0.5" />
        <path d="M28 10L-2 10" stroke="#5A5A5A" stroke-width="0.5" />
        <path d="M13 28V-2" stroke="#5A5A5A" stroke-width="0.5" />
        <path d="M28 6L-2 6" stroke="#5A5A5A" stroke-width="0.5" />
        <path d="M28 20L-2 20" stroke="#5A5A5A" stroke-width="0.5" />
        <path d="M28 13L-2 13" stroke="#5A5A5A" stroke-width="0.5" />
        <path d="M10 28V-2" stroke="#5A5A5A" stroke-width="0.5" />
        <path d="M28 16L-2 16" stroke="#5A5A5A" stroke-width="0.5" />
        <path
          d="M-2 -2L28 28M28 -2L-2 28"
          stroke="#5A5A5A"
          stroke-width="0.5"
        />
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="25"
        height="25"
        rx="6.5"
        stroke="black"
        stroke-opacity="0.04"
      />
      <defs>
        <clipPath id="clip0_1289_272">
          <rect x="1" y="1" width="24" height="24" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Logo = ({ style }: EstoqueTemplateGraphicsProps) => {
  // return (
  //   <svg
  //     width="273"
  //     height="69"
  //     viewBox="0 0 273 69"
  //     className={cn("fill-none", className)}
  //     style={style}
  //     xmlns="http://www.w3.org/2000/svg"
  //   >

  //   </svg>
  // );
  return (
    <p
      style={style}
      className={cn(
        "font-semibold font-serif text-5xl text-center text-gray-700 dark:text-gray-200 select-none",
      )}
    >
      Seu Negocio
    </p>
  );
};

const AppLogo = ({ className, style }: EstoqueTemplateGraphicsProps) => {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      className={cn("fill-none", className)}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2003_94)">
        <g filter="url(#filter0_i_2003_94)">
          <path
            d="M93.934 306.066C35.3553 247.487 35.3553 152.513 93.934 93.934C152.513 35.3553 247.487 35.3553 306.066 93.934C364.645 152.513 364.645 247.487 306.066 306.066C247.487 364.645 152.513 364.645 93.934 306.066Z"
            fill="white"
          />
          <path
            d="M93.934 306.066C35.3553 247.487 35.3553 152.513 93.934 93.934C152.513 35.3553 247.487 35.3553 306.066 93.934C364.645 152.513 364.645 247.487 306.066 306.066C247.487 364.645 152.513 364.645 93.934 306.066Z"
            stroke="white"
          />
        </g>
        <path
          d="M359.4 231.32C359.4 231.32 316.62 225.519 272.6 233.341C228.58 241.163 198.2 257.85 198.2 257.85"
          stroke="#05DB27"
          stroke-width="35"
        />
        <g filter="url(#filter1_d_2003_94)">
          <path
            d="M349 253.145C349 253.145 318.382 250.167 284.636 258.821C261.519 264.749 235.9 279.95 235.9 279.95"
            stroke="#00D322"
            stroke-width="25"
          />
        </g>
        <g filter="url(#filter2_d_2003_94)">
          <path
            d="M343 277.301C343 277.301 318.933 274.746 294.867 284.53C273.333 293.283 267 302 267 302"
            stroke="#07C825"
            stroke-width="29"
          />
        </g>
        <path
          d="M37 236.612C37 236.612 118.323 226.723 180.249 249.247C257.523 277.355 294.4 329.459 294.4 329.459"
          stroke="#00C21F"
          stroke-width="35"
        />
        <g filter="url(#filter3_d_2003_94)">
          <path
            d="M49.54 256.55C49.54 256.55 91.12 252.289 153.16 276.05C215.2 299.811 249.52 354.05 249.52 354.05"
            stroke="#00BC1E"
            stroke-width="35"
          />
        </g>
        <g filter="url(#filter4_d_2003_94)">
          <path
            d="M58.12 276.7C58.12 276.7 96.9462 276.7 136 302.05C191.44 338.036 195.4 362.5 195.4 362.5"
            stroke="#00B51D"
            stroke-width="28"
          />
        </g>
        <g filter="url(#filter5_d_2003_94)">
          <path
            d="M-2.93964 -2.93965C-115.02 109.141 -115.02 290.859 -2.93965 402.94C109.141 515.02 290.859 515.02 402.94 402.94C515.02 290.859 515.02 109.141 402.94 -2.93965C290.859 -115.02 109.141 -115.02 -2.93964 -2.93965Z"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="274"
            shape-rendering="crispEdges"
          />
          <path
            d="M-2.93964 -2.93965C-115.02 109.141 -115.02 290.859 -2.93965 402.94C109.141 515.02 290.859 515.02 402.94 402.94C515.02 290.859 515.02 109.141 402.94 -2.93965C290.859 -115.02 109.141 -115.02 -2.93964 -2.93965Z"
            stroke="#008315"
            stroke-width="274"
            shape-rendering="crispEdges"
          />
          <path
            d="M-2.93964 -2.93965C-115.02 109.141 -115.02 290.859 -2.93965 402.94C109.141 515.02 290.859 515.02 402.94 402.94C515.02 290.859 515.02 109.141 402.94 -2.93965C290.859 -115.02 109.141 -115.02 -2.93964 -2.93965Z"
            stroke="url(#paint0_linear_2003_94)"
            stroke-opacity="0.2"
            stroke-width="274"
            shape-rendering="crispEdges"
          />
        </g>
        <g filter="url(#filter6_d_2003_94)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M137 133.392C137 168.672 173.515 228 199.5 228C225.485 228 262 168.672 262 133.392C262 98.4163 234.053 70 199.5 70C164.947 70 137 98.4163 137 133.392ZM199.5 111.579C211.006 111.579 220.333 120.887 220.333 132.368C220.333 143.85 211.006 153.158 199.5 153.158C187.994 153.158 178.667 143.85 178.667 132.368C178.667 120.887 187.994 111.579 199.5 111.579Z"
            fill="#FF3C3C"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_i_2003_94"
          x="50"
          y="50"
          width="304"
          height="307.3"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="8" />
          <feGaussianBlur stdDeviation="3.65" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2003_94"
          />
        </filter>
        <filter
          id="filter1_d_2003_94"
          x="225.524"
          y="235.15"
          width="128.681"
          height="58.553"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_94"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_94"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_2003_94"
          x="251.279"
          y="257.5"
          width="97.2444"
          height="56.4524"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_94"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_94"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_2003_94"
          x="43.7679"
          y="233.753"
          width="224.534"
          height="132.687"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_94"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_94"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_2003_94"
          x="54.074"
          y="257.7"
          width="159.142"
          height="110.68"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_94"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_94"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_d_2003_94"
          x="-228"
          y="-224"
          width="856"
          height="856"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_94"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_94"
            result="shape"
          />
        </filter>
        <filter
          id="filter6_d_2003_94"
          x="136.5"
          y="70"
          width="134"
          height="170.5"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="8" />
          <feGaussianBlur stdDeviation="2.25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_94"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_94"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2003_94"
          x1="324.615"
          y1="-8.15385"
          x2="60.6154"
          y2="369.846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-opacity="0.74" />
          <stop offset="0.565" stop-color="#707070" stop-opacity="0.8648" />
          <stop offset="1" stop-color="#EAEAEA" />
        </linearGradient>
        <clipPath id="clip0_2003_94">
          <rect width="400" height="400" rx="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const EstoqueTemplate = { Logo, Icon, AppLogo };
export default EstoqueTemplate;
