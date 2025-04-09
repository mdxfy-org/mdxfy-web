import { cn } from "@/lib/utils";

interface AgrofastGraphicsProps {
  className?: string;
  style?: React.CSSProperties;
}

const Icon = ({ className, style }: AgrofastGraphicsProps) => {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      className={cn("fill-none", className)}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M93.934 306.066C35.3553 247.487 35.3553 152.513 93.934 93.934C152.513 35.3553 247.487 35.3553 306.066 93.934C364.645 152.513 364.645 247.487 306.066 306.066C247.487 364.645 152.513 364.645 93.934 306.066Z"
        fill="white"
      />
      <path
        d="M359.4 231.32C359.4 231.32 316.62 225.519 272.6 233.341C228.58 241.163 198.2 257.85 198.2 257.85"
        stroke="#05DB27"
        stroke-width="35"
      />
      <path
        d="M349 253.145C349 253.145 318.382 250.167 284.636 258.821C261.519 264.749 235.9 279.95 235.9 279.95"
        stroke="#00D322"
        stroke-width="25"
      />
      <path
        d="M343 277.301C343 277.301 318.933 274.746 294.867 284.53C273.333 293.283 267 302 267 302"
        stroke="#07C825"
        stroke-width="29"
      />
      <path
        d="M37 236.612C37 236.612 118.323 226.723 180.249 249.247C257.523 277.355 294.4 329.459 294.4 329.459"
        stroke="#00C21F"
        stroke-width="35"
      />
      <path
        d="M49.54 256.55C49.54 256.55 91.12 252.289 153.16 276.05C215.2 299.811 249.52 354.05 249.52 354.05"
        stroke="#00BC1E"
        stroke-width="35"
      />
      <path
        d="M58.12 276.7C58.12 276.7 96.9462 276.7 136 302.05C191.44 338.036 195.4 362.5 195.4 362.5"
        stroke="#00B51D"
        stroke-width="28"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M137 133.392C137 168.672 173.515 228 199.5 228C225.485 228 262 168.672 262 133.392C262 98.4163 234.053 70 199.5 70C164.947 70 137 98.4163 137 133.392ZM199.5 111.579C211.006 111.579 220.333 120.887 220.333 132.368C220.333 143.85 211.006 153.158 199.5 153.158C187.994 153.158 178.667 143.85 178.667 132.368C178.667 120.887 187.994 111.579 199.5 111.579Z"
        fill="#FF3C3C"
      />
      <path
        d="M81.5596 81.5596C16.1468 146.972 16.1468 253.028 81.5596 318.44C146.972 383.853 253.028 383.853 318.44 318.44C383.853 253.028 383.853 146.972 318.44 81.5596C253.028 16.1468 146.972 16.1468 81.5596 81.5596Z"
        stroke="#008315"
        stroke-width="35"
      />
      <path
        d="M81.5596 81.5596C16.1468 146.972 16.1468 253.028 81.5596 318.44C146.972 383.853 253.028 383.853 318.44 318.44C383.853 253.028 383.853 146.972 318.44 81.5596C253.028 16.1468 146.972 16.1468 81.5596 81.5596Z"
        stroke="url(#paint0_linear_2026_89)"
        stroke-opacity="0.2"
        stroke-width="35"
      />
      <defs>
        <linearGradient
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
      </defs>
    </svg>
  );
};

const Logo = ({ className, style }: AgrofastGraphicsProps) => {
  return (
    <svg
      width="273"
      height="69"
      viewBox="0 0 273 69"
      className={cn("fill-none", className)}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="text-zinc-800 dark:text-stone-100">
        <path
          d="M27.9556 38.2853H11.4553L8.725 46.4096H0L14.8978 3.71094H24.5724L39.4702 46.4096H30.6859L27.9556 38.2853ZM25.7002 31.4437L19.7054 13.6068L13.7107 31.4437H25.7002Z"
          fill="currentColor"
        />
        <path
          d="M57.9186 12.0186C60.3718 12.0186 62.5284 12.5276 64.3881 13.5457C66.2479 14.5231 67.7119 15.8058 68.7803 17.3941V12.5683H77.1492V46.654C77.1492 49.7897 76.5358 52.5793 75.3092 55.0227C74.0826 57.5068 72.2426 59.4615 69.7893 60.8869C67.336 62.3529 64.3683 63.0859 60.8862 63.0859C56.2171 63.0859 52.3789 61.966 49.3716 59.7262C46.4039 57.4864 44.7222 54.4322 44.3266 50.5634H52.5767C53.012 52.1109 53.9419 53.3326 55.3664 54.2286C56.8304 55.1652 58.5912 55.6335 60.6488 55.6335C63.0625 55.6335 65.0212 54.8801 66.5249 53.3734C68.0285 51.9073 68.7803 49.6675 68.7803 46.654V41.4006C67.7119 42.9888 66.2281 44.3124 64.3288 45.3712C62.469 46.43 60.3323 46.9594 57.9186 46.9594C55.1487 46.9594 52.6163 46.2264 50.3213 44.7603C48.0263 43.2943 46.2061 41.2377 44.8607 38.5907C43.555 35.9029 42.9021 32.8283 42.9021 29.3668C42.9021 25.946 43.555 22.9121 44.8607 20.2651C46.2061 17.618 48.0065 15.5819 50.2619 14.1565C52.5569 12.7312 55.1091 12.0186 57.9186 12.0186ZM68.7803 29.489C68.7803 27.4121 68.3846 25.6406 67.5932 24.1745C66.8018 22.6678 65.7335 21.5275 64.3881 20.7538C63.0428 19.9393 61.5985 19.5321 60.0553 19.5321C58.5121 19.5321 57.0876 19.9189 55.7818 20.6927C54.476 21.4664 53.4077 22.6067 52.5767 24.1135C51.7853 25.5795 51.3897 27.3306 51.3897 29.3668C51.3897 31.403 51.7853 33.1948 52.5767 34.7423C53.4077 36.2491 54.476 37.4097 55.7818 38.2242C57.1272 39.0387 58.5517 39.4459 60.0553 39.4459C61.5985 39.4459 63.0428 39.059 64.3881 38.2853C65.7335 37.4708 66.8018 36.3305 67.5932 34.8645C68.3846 33.3577 68.7803 31.5659 68.7803 29.489Z"
          className="fill-current"
        />
        <path
          d="M93.5744 17.8217C94.6427 16.0298 96.0277 14.6249 97.7291 13.6068C99.4702 12.5887 101.449 12.0796 103.665 12.0796V21.0592H101.468C98.8569 21.0592 96.8784 21.6904 95.5331 22.9528C94.2273 24.2153 93.5744 26.4143 93.5744 29.5501V46.4096H85.2649V12.5683H93.5744V17.8217Z"
          className="fill-current"
        />
        <path
          d="M123.862 46.9594C120.697 46.9594 117.848 46.2467 115.315 44.8214C112.783 43.3554 110.785 41.2988 109.321 38.6518C107.896 36.0047 107.184 32.9505 107.184 29.489C107.184 26.0275 107.916 22.9732 109.38 20.3262C110.884 17.6791 112.922 15.643 115.494 14.2176C118.066 12.7516 120.934 12.0186 124.1 12.0186C127.265 12.0186 130.134 12.7516 132.706 14.2176C135.278 15.643 137.296 17.6791 138.76 20.3262C140.264 22.9732 141.016 26.0275 141.016 29.489C141.016 32.9505 140.244 36.0047 138.701 38.6518C137.197 41.2988 135.14 43.3554 132.528 44.8214C129.956 46.2467 127.067 46.9594 123.862 46.9594ZM123.862 39.507C125.366 39.507 126.771 39.1405 128.077 38.4074C129.422 37.6337 130.49 36.4934 131.282 34.9867C132.073 33.4799 132.469 31.6473 132.469 29.489C132.469 26.2718 131.638 23.808 129.976 22.0976C128.354 20.3465 126.355 19.471 123.981 19.471C121.607 19.471 119.609 20.3465 117.986 22.0976C116.404 23.808 115.612 26.2718 115.612 29.489C115.612 32.7061 116.384 35.1903 117.927 36.9414C119.51 38.6518 121.488 39.507 123.862 39.507Z"
          className="fill-current"
        />
        <path
          d="M267.188 42.0573H272.136V47.0052H267.188V42.0573Z"
          className="fill-current"
        />
      </g>
      <g className="text-stone-600 dark:text-zinc-400">
        <path
          d="M176.404 5.62073V10.0145H158.413V23.9676H173.019V28.3614H158.413V47.0051H153.01V5.62073H176.404Z"
          fill="currentColor"
        />
        <path
          d="M180.91 30.6176C180.91 27.2926 181.583 24.3832 182.929 21.8895C184.275 19.3561 186.116 17.3968 188.451 16.0114C190.826 14.6259 193.458 13.9332 196.348 13.9332C199.198 13.9332 201.672 14.5468 203.77 15.7739C205.868 17.0009 207.431 18.5447 208.46 20.4051V14.4676H213.923V47.0051H208.46V40.9489C207.392 42.8489 205.789 44.4322 203.651 45.6989C201.553 46.9259 199.099 47.5395 196.289 47.5395C193.399 47.5395 190.786 46.827 188.451 45.402C186.116 43.977 184.275 41.978 182.929 39.4051C181.583 36.8322 180.91 33.903 180.91 30.6176ZM208.46 30.677C208.46 28.2228 207.966 26.0853 206.976 24.2645C205.986 22.4436 204.641 21.0582 202.939 20.1082C201.276 19.1186 199.435 18.6239 197.417 18.6239C195.398 18.6239 193.557 19.0989 191.895 20.0489C190.232 20.9989 188.906 22.3843 187.917 24.2051C186.927 26.0259 186.432 28.1634 186.432 30.6176C186.432 33.1114 186.927 35.2884 187.917 37.1489C188.906 38.9697 190.232 40.3749 191.895 41.3645C193.557 42.3145 195.398 42.7895 197.417 42.7895C199.435 42.7895 201.276 42.3145 202.939 41.3645C204.641 40.3749 205.986 38.9697 206.976 37.1489C207.966 35.2884 208.46 33.1311 208.46 30.677Z"
          fill="currentColor"
        />
        <path
          d="M234.572 47.5395C232.079 47.5395 229.842 47.1239 227.863 46.2926C225.884 45.4218 224.32 44.2343 223.172 42.7301C222.025 41.1864 221.391 39.4249 221.272 37.4457H226.854C227.012 39.0686 227.764 40.3947 229.11 41.4239C230.495 42.453 232.296 42.9676 234.513 42.9676C236.571 42.9676 238.194 42.5124 239.382 41.602C240.569 40.6916 241.163 39.5436 241.163 38.1582C241.163 36.7332 240.53 35.6843 239.263 35.0114C237.996 34.2989 236.037 33.6061 233.385 32.9332C230.97 32.2999 228.991 31.6666 227.447 31.0332C225.943 30.3603 224.637 29.3905 223.529 28.1239C222.46 26.8176 221.926 25.1155 221.926 23.0176C221.926 21.3551 222.42 19.8311 223.41 18.4457C224.4 17.0603 225.805 15.9718 227.626 15.1801C229.446 14.3489 231.525 13.9332 233.86 13.9332C237.462 13.9332 240.371 14.8436 242.588 16.6645C244.805 18.4853 245.992 20.9791 246.151 24.1457H240.747C240.629 22.4436 239.936 21.078 238.669 20.0489C237.442 19.0197 235.78 18.5051 233.682 18.5051C231.742 18.5051 230.199 18.9207 229.051 19.752C227.903 20.5832 227.329 21.6718 227.329 23.0176C227.329 24.0864 227.665 24.977 228.338 25.6895C229.051 26.3624 229.921 26.9166 230.951 27.352C232.019 27.7478 233.484 28.203 235.344 28.7176C237.68 29.3509 239.58 29.9843 241.044 30.6176C242.509 31.2114 243.756 32.1218 244.785 33.3489C245.854 34.5759 246.408 36.1791 246.447 38.1582C246.447 39.9395 245.953 41.5426 244.963 42.9676C243.974 44.3926 242.568 45.5207 240.747 46.352C238.966 47.1436 236.908 47.5395 234.572 47.5395Z"
          fill="currentColor"
        />
        <path
          d="M260.665 18.9207V38.0989C260.665 39.6822 260.981 40.7509 261.654 41.4239C262.327 42.0572 263.515 42.0573 265.178 42.0573L264.714 42.0567V47.0045L264.287 47.0051C261.279 47.0051 259.023 46.3124 257.519 44.927C256.014 43.5416 255.262 41.2655 255.262 38.0989V18.9207H251.047V14.4676H255.262V6.27385H260.665V14.4676H269.156V18.9207H260.665Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

const AppLogo = ({ className, style }: AgrofastGraphicsProps) => {
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

const Agrofast = { Logo, Icon, AppLogo };
export default Agrofast;
