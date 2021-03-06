import * as React from "react"

function Diamond(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" width="10" height="10"
            viewBox="0 0 511.999 511.999"
            {...props}
        >
            <path
                d="M134.047 194.408H15.118a15.117 15.117 0 01-10.763-25.734L124.795 46.56a15.116 15.116 0 0110.764-4.502h59.464a15.116 15.116 0 0113.525 21.872l-60.976 122.114a15.116 15.116 0 01-13.525 8.364z"
                fill="#a0ebff"
            />
            <path
                d="M496.881 194.408H377.952a15.118 15.118 0 01-13.526-8.364L303.45 63.93a15.12 15.12 0 0113.525-21.872h59.464a15.12 15.12 0 0110.764 4.502l120.441 122.114a15.12 15.12 0 013.184 16.449 15.116 15.116 0 01-13.947 9.285z"
                fill="#73c8f0"
            />
            <path
                d="M117.142 178.897l77.881-136.839h121.953l77.642 136.839H117.142z"
                fill="#d2f0ff"
            />
            <path
                d="M361.594 178.897L242.175 448.703a15.115 15.115 0 005.698 18.866 15.078 15.078 0 008.119 2.371c4.239 0 8.426-1.779 11.389-5.168L508.262 189.24a15.106 15.106 0 003.722-10.344h-150.39v.001z"
                fill="#0073aa"
            />
            <path
                d="M150.405 178.897H.014a15.108 15.108 0 003.722 10.344l240.881 275.532a15.106 15.106 0 0011.389 5.168c2.796 0 5.615-.774 8.119-2.371a15.118 15.118 0 005.698-18.866L150.405 178.897z"
                fill="#41b4e6"
            />
            <path
                d="M117.142 178.897l125.034 282.044a15.116 15.116 0 0027.648 0l124.795-282.044H117.142z"
                fill="#a0ebff"
            />
            <path fill="#41b4e6" d="M255.88 178.897h138.738L316.975 42.058H255.88z" />
            <path
                d="M256 469.94a15.116 15.116 0 0013.824-8.999l124.794-282.044H256V469.94z"
                fill="#73c8f0"
            />
        </svg>
    )
}

export default Diamond
