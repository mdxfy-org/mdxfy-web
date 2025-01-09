import { cn } from "@/lib/utils";

interface MdxfyGraphicsProps {
  className?: string;
  style?: React.CSSProperties;
}

const Icon = ({ className, style }: MdxfyGraphicsProps) => {
  return (
    <svg
      width="256"
      height="110"
      viewBox="0 0 256 110"
      className={cn("text-neutral-800 dark:text-slate-50", className)}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="dark:fill-white fill-blue-400"
        d="M0 12.7536C0 5.70999 5.7668 0 12.8805 0H243.12C250.233 0 256 5.70999 256 12.7536V97.2464C256 104.29 250.233 110 243.12 110H12.8805C5.7668 110 0 104.29 0 97.2464V12.7536Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="fill-current"
        d="M203.013 55.5825L225.434 79.9182L216.076 88.5015L194.382 64.9541L172.678 88.5205L163.319 79.9388L185.749 55.584L162.865 30.7447L172.222 22.1614L194.38 46.2124L216.53 22.1622L225.889 30.7439L203.013 55.5825Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="fill-current"
        d="M105.206 59.683H126.481V20.8342H139.43V59.683H160.705L133.19 87.4133L105.206 59.683Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="fill-current"
        d="M94.1055 21.9704V88.4572H81.395V53.4826L62.3294 73.2884L43.2637 53.4826V88.4572H30.5533V21.9705L62.3294 54.9802L94.1055 21.9704Z"
      />
    </svg>
  );
};

const BorderedIcon = ({ className, style }: MdxfyGraphicsProps) => {
  return (
    <svg
      width="256"
      height="129"
      viewBox="0 0 256 129"
      className={cn("text-neutral-800 dark:text-slate-50", className)}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="fill-current"
        d="M27.0227 0H228.977C243.869 0 256 12.055 256 26.998V101.685C256 116.628 243.869 128.683 228.977 128.683H27.0227C12.1309 128.683 0 116.628 0 101.685V26.998C0 12.055 12.1309 0 27.0227 0ZM27.0227 15.7245C20.7829 15.7245 15.7245 20.7718 15.7245 26.998V101.685C15.7245 107.911 20.7829 112.958 27.0227 112.958H228.977C235.217 112.958 240.275 107.911 240.275 101.685V26.998C240.275 20.7718 235.217 15.7245 228.977 15.7245H27.0227Z"
      />
      <path
        className="dark:fill-white fill-blue-400"
        d="M15.7245 26.998C15.7245 20.7719 20.7829 15.7245 27.0227 15.7245H228.977C235.217 15.7245 240.276 20.7719 240.276 26.998V101.685C240.276 107.911 235.217 112.958 228.977 112.958H27.0227C20.7829 112.958 15.7245 107.911 15.7245 101.685V26.998Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="fill-current"
        d="M203.013 64.5825L225.434 88.9182L216.076 97.5015L194.382 73.9541L172.678 97.5205L163.319 88.9388L185.749 64.584L162.865 39.7447L172.222 31.1614L194.38 55.2125L216.53 31.1622L225.889 39.7439L203.013 64.5825Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="fill-current"
        d="M105.206 68.683H126.481V29.8342H139.43V68.683H160.705L133.19 96.4133L105.206 68.683Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className="fill-current"
        d="M94.1054 30.9705V97.4572H81.395V62.4826L62.3294 82.2884L43.2637 62.4826V97.4572H30.5533V30.9705L62.3294 63.9802L94.1054 30.9705Z"
      />
    </svg>
  );
};

const Logo = ({ style, className }: MdxfyGraphicsProps) => {
  return (
    <svg
      width="256"
      height="84"
      viewBox="0 0 256 84"
      className={cn(
        "text-neutral-800 dark:text-slate-50 transition-colors duration-100 ease-linear",
        className
      )}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M197.443 13.5514C196.07 13.5783 195.253 13.9192 194.741 14.3239L194.732 14.3307L194.729 14.3335C194.706 14.3573 194.594 14.4905 194.472 14.8743C194.311 15.3841 194.185 16.1855 194.185 17.3654V18.6055H200.958C202.569 18.6055 204.106 19.1534 205.31 20.3582C206.515 21.5629 207.063 23.0997 207.063 24.7107C207.063 26.4005 206.427 27.9486 205.158 29.1198C204.008 30.241 202.548 30.8159 200.958 30.8159H194.185V58.3847C194.185 60.1571 193.508 61.7324 192.291 62.9732C191.035 64.3242 189.383 64.9669 187.603 64.9669C185.801 64.9669 184.159 64.3135 182.869 63.0234L182.817 62.9721L182.768 62.9183C181.616 61.6513 181.021 60.0904 181.021 58.3847V30.8159H179.399C177.788 30.8159 176.251 30.2681 175.046 29.0633C173.841 27.8585 173.294 26.3218 173.294 24.7107C173.294 23.0997 173.841 21.5629 175.046 20.3582L175.103 20.3014L175.163 20.2477C176.338 19.1902 177.79 18.6055 179.399 18.6055H181.021V17.0792C181.021 11.9803 182.474 7.61491 185.786 4.46818L185.799 4.4564C188.512 1.90729 191.888 0.671509 195.711 0.671509C198.572 0.671509 201.306 1.27727 203.879 2.48836L203.941 2.51737L204.001 2.54911C205.725 3.45622 207.445 5.08636 207.445 7.63525C207.445 9.24994 206.938 10.8 205.802 12.0622C204.674 13.3158 203.161 14.0266 201.435 14.0266H201.245L197.443 13.5514Z"
      />
      <path
        fill="currentColor"
        d="M214.027 80.7105C213.264 78.421 212.188 75.0296 214.027 72.3158C216.257 69.0243 222.03 72.7356 223.948 70.0264C227.051 65.6408 229.29 57.0528 229.29 57.0528L212.521 28.2152L212.504 28.171C212.154 27.2368 212.023 26.2522 212.023 25.2867C212.023 23.594 212.752 22.1606 213.771 21.0393L213.82 20.9855L213.872 20.9342C215.023 19.7827 216.527 18.9907 218.319 18.9907C219.612 18.9907 220.925 19.2684 222.101 19.9993C223.293 20.7398 224.122 21.8092 224.648 23.0202L224.665 23.0586L235.395 40.2635L243.34 23.1991L243.348 23.1803C243.821 22.0035 244.563 20.8784 245.702 20.0741C246.857 19.2589 248.174 18.948 249.481 18.991C251.237 19.0061 252.864 19.6492 254.106 20.9836C255.177 22.0731 256 23.5208 256 25.2867C256 26.1695 255.909 27.2595 255.45 28.2475L237.684 71.5527C237.223 72.7352 235.04 79.6057 231.579 81.4736C228.896 82.9218 227.057 83.6498 223.948 83.7631C219.897 83.9106 214.79 82.9999 214.027 80.7105Z"
      />
      <path
        fill="currentColor"
        d="M123.076 64.7761C120.341 64.7761 119.769 63.6796 121.359 61.4866L136.861 39.5413L123.219 20.7504C121.629 18.5573 122.202 17.4608 124.936 17.4608H133.951C135.382 17.4608 136.463 18.0616 137.194 19.2633L144.492 30.8893L151.98 19.2633C152.712 18.0616 153.793 17.4608 155.224 17.4608H164.238C167.005 17.4608 167.577 18.5573 165.956 20.7504L152.124 39.5413L167.816 61.4866C169.437 63.6796 168.865 64.7761 166.099 64.7761H157.084C155.685 64.7761 154.604 64.1753 153.841 62.9736L144.492 48.9142L135.334 62.9736C134.571 64.1753 133.49 64.7761 132.091 64.7761H123.076Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M83.6603 41.2561C83.6678 45.1105 84.7033 47.8133 86.4608 49.716C87.982 51.3177 90.1407 52.237 93.3404 52.1845L93.3654 52.1841H93.3904C96.8098 52.1841 99.8987 50.935 102.739 48.1805V34.2324C99.8992 31.4304 96.8254 30.1974 93.4317 30.2433L93.411 30.2436H93.3904C90.8477 30.2436 89.0127 30.8022 87.6811 31.7008C86.3665 32.5878 85.2853 33.9788 84.5388 36.1155L84.5318 36.1354C84.0276 37.5473 83.7199 39.2411 83.6603 41.2561ZM77.3331 58.8548L77.3044 58.8261C72.7159 54.2376 70.4711 48.2812 70.4007 41.2444L70.4005 41.2291V41.2138C70.4005 34.2607 72.6655 28.3359 77.3044 23.6969C81.4934 19.5079 86.5983 17.3914 92.4559 17.4608C96.1743 17.464 99.6108 18.3978 102.739 20.1959V7.25367C102.739 5.54245 103.302 3.90041 104.587 2.61493C105.877 1.32488 107.52 0.671509 109.321 0.671509C111.078 0.671509 112.711 1.29783 113.961 2.61364C115.277 3.86372 115.903 5.49648 115.903 7.25367V53.4242C115.344 60.388 114.272 61.4367 113.055 62.6774C111.799 64.0286 109.575 64.5853 107.795 64.5853C105.994 64.5853 105.187 64.7306 103.897 63.4406C103.628 63.144 105.423 62.6774 106.95 59.6248C103.897 62.6774 101.239 64.5853 92.4499 64.5853C83.6603 64.5853 81.6026 62.9034 77.3625 58.8827L77.3331 58.8548Z"
      />
      <path
        fill="currentColor"
        d="M6.58217 19.1779C8.37862 19.1779 9.7092 20.5134 11.9986 20.5134C14.2881 20.5134 16.8826 19.0351 21.1564 18.9871C24.6001 18.9871 28.4733 19.8269 31.3244 21.8296C32.405 22.5863 33.3572 23.4675 34.1831 24.4628C34.8974 23.7227 35.6431 23.0868 36.4247 22.5774C39.8736 20.0541 42.7546 18.9871 47.1035 18.9871C52.215 18.9871 59.0389 20.8341 62.0559 24.8727C64.6188 28.2208 65.8217 32.2685 65.8217 36.8257V59.3387C65.8217 61.111 65.1451 62.6862 63.9283 63.9269C62.672 65.2781 61.0196 65.9208 59.2395 65.9208C57.443 65.9208 55.8491 65.2257 54.6007 63.9774C53.3524 62.7291 52.6573 61.1351 52.6573 59.3387V38.2567C52.6573 35.2168 52.0828 33.5686 51.4671 32.7584L51.4261 32.7045L51.3876 32.6489C51.0424 32.1502 49.5121 31.1975 47.1035 31.1975C44.0782 31.1975 41.9956 32.9599 39.493 36.8353V59.3387C39.493 61.111 38.8165 62.6862 37.5996 63.9269C36.3434 65.2781 34.691 65.9208 32.9108 65.9208C31.1144 65.9208 29.5204 65.2257 28.2721 63.9774C27.0238 62.7291 26.3287 61.1351 26.3287 59.3387V38.2567C26.3287 35.2168 25.7541 33.5686 25.1384 32.7584L25.0975 32.7045L25.059 32.6489C24.7137 32.1502 23.565 31.1975 21.1564 31.1975C18.1311 31.1975 15.6669 32.9599 13.1643 36.8353V59.3387C13.1643 61.1351 12.4692 62.7291 11.2209 63.9774C9.97259 65.2257 8.37862 65.9208 6.58217 65.9208C4.78571 65.9208 3.19174 65.2257 1.94342 63.9774C0.695096 62.7291 0 61.1351 0 59.3387V25.8555C0 24.1497 0.595944 22.5889 1.7478 21.3218L1.7563 21.3125C3.02258 19.9311 4.69215 19.1779 6.58217 19.1779Z"
      />
    </svg>
  );
};

const AppLogo = ({ className, style }: MdxfyGraphicsProps) => {
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
            fillRule="evenodd"
            clipRule="evenodd"
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

const Mdxfy = { Logo, Icon, BorderedIcon, AppLogo };
export default Mdxfy;
