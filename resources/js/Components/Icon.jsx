import React from "react";

export default ({ name, className }) => {
    if (name === "apple") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
            >
                <g fillRule="nonzero">
                    <path d="M46.173 19.967C49.927-1.838 19.797-.233 14.538.21c-.429.035-.648.4-.483.8 2.004 4.825 14.168 31.66 32.118 18.957zm13.18 1.636c1.269-.891 1.35-1.614.047-2.453l-2.657-1.71c-.94-.607-1.685-.606-2.532.129-5.094 4.42-7.336 9.18-8.211 15.24 1.597.682 3.55.79 5.265.328 1.298-4.283 3.64-8.412 8.088-11.534z" />
                    <path d="M88.588 67.75c9.65-27.532-13.697-45.537-35.453-32.322-1.84 1.118-4.601 1.118-6.441 0-21.757-13.215-45.105 4.79-35.454 32.321 5.302 15.123 17.06 39.95 37.295 29.995.772-.38 1.986-.38 2.758 0 20.235 9.955 31.991-14.872 37.295-29.995z" />
                </g>
            </svg>
        );
    }

    if (name === "book") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z" />
            </svg>
        );
    }

    if (name === "cheveron-down") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
        );
    }

    if (name === "cheveron-right") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <polygon points="12.95 10.707 13.657 10 8 4.343 6.586 5.757 10.828 10 6.586 14.243 8 15.657 12.95 10.707" />
            </svg>
        );
    }

    if (name === "dashboard") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-5.6-4.29a9.95 9.95 0 0 1 11.2 0 8 8 0 1 0-11.2 0zm6.12-7.64l3.02-3.02 1.41 1.41-3.02 3.02a2 2 0 1 1-1.41-1.41z" />
            </svg>
        );
    }

    if (name === "location") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
        );
    }

    if (name === "office") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
            >
                <path
                    fillRule="evenodd"
                    d="M7 0h86v100H57.108V88.418H42.892V100H7V0zm9 64h11v15H16V64zm57 0h11v15H73V64zm-19 0h11v15H54V64zm-19 0h11v15H35V64zM16 37h11v15H16V37zm57 0h11v15H73V37zm-19 0h11v15H54V37zm-19 0h11v15H35V37zM16 11h11v15H16V11zm57 0h11v15H73V11zm-19 0h11v15H54V11zm-19 0h11v15H35V11z"
                />
            </svg>
        );
    }

    if (name == "printer") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M4 16H0V6h20v10h-4v4H4v-4zm2-4v6h8v-6H6zM4 0h12v5H4V0zM2 8v2h2V8H2zm4 0v2h2V8H6z" />
            </svg>
        );
    }

    if (name === "shopping-cart") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M4 2h16l-3 9H4a1 1 0 1 0 0 2h13v2H4a3 3 0 0 1 0-6h.33L3 5 2 2H0V0h3a1 1 0 0 1 1 1v1zm1 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
        );
    }

    if (name === "store-front") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M18 9.87V20H2V9.87a4.25 4.25 0 0 0 3-.38V14h10V9.5a4.26 4.26 0 0 0 3 .37zM3 0h4l-.67 6.03A3.43 3.43 0 0 1 3 9C1.34 9 .42 7.73.95 6.15L3 0zm5 0h4l.7 6.3c.17 1.5-.91 2.7-2.42 2.7h-.56A2.38 2.38 0 0 1 7.3 6.3L8 0zm5 0h4l2.05 6.15C19.58 7.73 18.65 9 17 9a3.42 3.42 0 0 1-3.33-2.97L13 0z" />
            </svg>
        );
    }

    if (name === "trash") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" />
            </svg>
        );
    }

    if (name === "users") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
        );
    }

    if (name === "user") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
            >
                <path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z" />
                <circle cx="12" cy="6" r="6" />
            </svg>
        );
    }

    if (name === "home") {
        return (
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
            >
                <path d="M12,14a3,3,0,0,0-3,3v7.026h6V17A3,3,0,0,0,12,14Z" />
                <path d="M13.338.833a2,2,0,0,0-2.676,0L0,10.429v10.4a3.2,3.2,0,0,0,3.2,3.2H7V17a5,5,0,0,1,10,0v7.026h3.8a3.2,3.2,0,0,0,3.2-3.2v-10.4Z" />
            </svg>
        );
    }

    if (name === "agregar") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
                <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm5 13h-4v4h-2v-4h-4v-2h4v-4h2v4h4z" />
            </svg>
        );
    }
    if (name === "eliminar") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
               <path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"/>
            </svg>
        );
    }
    if (name === "atras") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
             <g id="_01_align_center" data-name="01 align center"><path d="M3.121,11.293,13.013,1.4,11.6-.013,1.707,9.879a3,3,0,0,0,0,4.242l9.885,9.885,1.414-1.414L3.122,12.707A1,1,0,0,1,3.121,11.293Z"/><path d="M23,1.417,21.583,0l-11.29,11.29a1,1,0,0,0,0,1.414L21.584,24,23,22.584,12.414,12Z"/></g></svg>
        );
    }
    if (name === "service") {
        return (
            <svg
            className={className}
            id="Layer_1"
            height="512"
            viewBox="0 0 50 50"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            >
               <path d="M 32.21875 2.0625 L 27.84375 3.78125 L 28.625 7.5625 C 28.320313 7.867188 27.996094 8.21875 27.65625 8.59375 L 23.90625 7.75 L 22.0625 12.0625 L 25.25 14.1875 C 25.214844 14.714844 25.214844 15.253906 25.25 15.78125 L 21.96875 17.78125 L 23.6875 22.15625 L 27.375 21.40625 C 27.707031 21.804688 28.070313 22.167969 28.46875 22.5 L 27.625 26.1875 L 31.96875 28.03125 L 34.09375 24.84375 C 34.625 24.878906 35.125 24.878906 35.65625 24.84375 L 37.6875 28.125 L 42.0625 26.40625 L 41.21875 22.40625 C 41.613281 22.078125 41.953125 21.703125 42.28125 21.3125 L 46.09375 22.28125 L 47.96875 17.90625 L 44.65625 15.875 C 44.6875 15.355469 44.6875 14.863281 44.65625 14.34375 L 47.9375 12.3125 L 46.21875 7.9375 L 42.40625 8.78125 C 42.078125 8.386719 41.707031 8.015625 41.3125 7.6875 L 42.15625 4 L 37.8125 2.15625 L 35.78125 5.34375 C 35.257813 5.292969 34.730469 5.265625 34.21875 5.3125 Z M 35 11 C 37.210938 11 39 12.789063 39 15 C 39 17.210938 37.210938 19 35 19 C 32.789063 19 31 17.210938 31 15 C 31 12.789063 32.789063 11 35 11 Z M 13.53125 20 L 12.90625 24 C 12.355469 24.175781 11.796875 24.425781 11.25 24.71875 L 7.90625 22.28125 L 4.40625 25.78125 L 6.71875 29.15625 C 6.441406 29.703125 6.222656 30.253906 6.03125 30.8125 L 2 31.5625 L 2 36.4375 L 6 37.15625 C 6.175781 37.710938 6.421875 38.292969 6.71875 38.84375 L 4.28125 42.09375 L 7.78125 45.59375 L 11.15625 43.28125 C 11.699219 43.558594 12.257813 43.777344 12.8125 43.96875 L 13.4375 48 L 18.34375 48 L 19.0625 44 C 19.621094 43.824219 20.199219 43.578125 20.75 43.28125 L 24.09375 45.71875 L 27.59375 42.21875 L 25.1875 38.84375 C 25.460938 38.300781 25.652344 37.742188 25.84375 37.1875 L 30 36.4375 L 30 31.53125 L 25.90625 30.90625 C 25.730469 30.355469 25.480469 29.792969 25.1875 29.25 L 27.59375 25.90625 L 24.125 22.28125 L 20.71875 24.71875 C 20.183594 24.445313 19.644531 24.222656 19.09375 24.03125 L 18.46875 20 Z M 16 30 C 18.199219 30 20 31.800781 20 34 C 20 36.199219 18.199219 38 16 38 C 13.800781 38 12 36.199219 12 34 C 12 31.800781 13.800781 30 16 30 Z"/>
            </svg>
        );
    }
    if (name === "flecha_atras") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
              <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13h-5v3.361c0,.695-.852,1.044-1.35,.552l-4.418-4.361c-.309-.305-.309-.799,0-1.104l4.418-4.361c.498-.492,1.35-.143,1.35,.552v3.361h5c.552,0,1,.448,1,1s-.448,1-1,1Z"/></svg>
        );
    }
    if (name === "edit") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
        >
             <path d="M21,15H18a3,3,0,0,0-3,3v3H4.5A1.5,1.5,0,0,1,3,19.5V4.5A1.5,1.5,0,0,1,4.5,3h10A1.5,1.5,0,0,0,16,1.5h0A1.5,1.5,0,0,0,14.5,0H4.5A4.5,4.5,0,0,0,0,4.5v15A4.5,4.5,0,0,0,4.5,24H16.485a4.5,4.5,0,0,0,3.181-1.318l3.016-3.016A4.5,4.5,0,0,0,24,16.485V11.506a1.5,1.5,0,0,0-1.5-1.5h0a1.5,1.5,0,0,0-1.5,1.5Z"/><path d="M20.963,1a2.956,2.956,0,0,0-2.113.98l-8.136,9.093a4.982,4.982,0,0,1,4.008,3.356l8.4-8.4a2.947,2.947,0,0,0,0-4.163A2.985,2.985,0,0,0,20.963,1Z"/><path d="M9.288,13.067c-2.317.446-3.465,3.026-3.963,4.634A1,1,0,0,0,6.281,19H10a3,3,0,0,0,2.988-3.274A3.107,3.107,0,0,0,9.288,13.067Z"/></svg>

        );
    }
    if (name === "chulo") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
        <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/>
             </svg>

        );
    }
     if (name === "comprobado") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
   <path d="M11,16.4l-4.7-4.7l1.4-1.4l3.3,3.3l8.4-8.4C17.5,3.3,14.9,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 c0-1.9-0.5-3.6-1.4-5.1L11,16.4z"/></svg>

        );
    }
    if (name === "refresh") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
<path d="M12,2.99a9.03,9.03,0,0,1,6.36,2.65L15.986,8.014h5.83a1.146,1.146,0,0,0,1.146-1.146V1.038L20.471,3.529A11.98,11.98,0,0,0,0,12H2.99A9.02,9.02,0,0,1,12,2.99Z"/><path d="M21.01,12A8.994,8.994,0,0,1,5.64,18.36l2.374-2.374H1.993a.956.956,0,0,0-.955.955v6.021l2.491-2.491A11.98,11.98,0,0,0,24,12Z"/></svg>

        );
    }
    if (name === "notificacion") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
<path d="M9,18H0V9a9,9,0,1,1,9,9ZM20,9.08h0A11.008,11.008,0,0,1,9.08,20h0A8,8,0,0,0,16,24h8V16A8,8,0,0,0,20,9.08Z"/></svg>

        );
    }

    if (name === "excel") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
       <path d="M14,7V.46c.91,.35,1.75,.88,2.46,1.59l3.48,3.49c.71,.71,1.24,1.55,1.59,2.46h-6.54c-.55,0-1-.45-1-1Zm8,3.49v8.51c0,2.76-2.24,5-5,5H7c-2.76,0-5-2.24-5-5V5C2,2.24,4.24,0,7,0h4.51c.16,0,.32,.01,.49,.02V7c0,1.65,1.35,3,3,3h6.98c.01,.16,.02,.32,.02,.49Zm-8.7,6.51l1.97-2.36c.35-.42,.3-1.05-.13-1.41-.43-.35-1.05-.3-1.41,.13l-1.73,2.08-1.73-2.08c-.35-.42-.98-.48-1.41-.13-.42,.35-.48,.98-.13,1.41l1.97,2.36-1.97,2.36c-.35,.42-.3,1.05,.13,1.41,.19,.16,.41,.23,.64,.23,.29,0,.57-.12,.77-.36l1.73-2.08,1.73,2.08c.2,.24,.48,.36,.77,.36,.23,0,.45-.08,.64-.23,.42-.35,.48-.98,.13-1.41l-1.97-2.36Z"/></svg>

        );
    }
    if (name === "archivo") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
       <path d="m18,12c-3.314,0-6,2.686-6,6s2.686,6,6,6,6-2.686,6-6-2.686-6-6-6Zm.535,8.518c-.308.309-.727.482-1.173.482s-.864-.174-1.179-.489l-1.845-1.788,1.393-1.436,1.63,1.58,3.228-3.175,1.402,1.426-3.456,3.399Zm-8.535-2.518c0-2.39,1.048-4.534,2.709-6H4v-2h10v1.071c1.177-.681,2.543-1.071,4-1.071V3c0-1.654-1.346-3-3-3H3C1.346,0,0,1.346,0,3v21h12.709c-1.661-1.466-2.709-3.61-2.709-6ZM4,5h10v2H4v-2Zm4,12h-4v-2h4v2Z"/></svg>

        );
    }

    if (name === "observaciones") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
      <path d="M.1,6C.57,3.72,2.59,2,5,2h14c2.41,0,4.43,1.72,4.9,4H.1Zm23.9,2v9c0,2.76-2.24,5-5,5H5c-2.76,0-5-2.24-5-5V8H24Zm-14,4c0-.55-.45-1-1-1H5c-.55,0-1,.45-1,1s.45,1,1,1h1v4c0,.55,.45,1,1,1s1-.45,1-1v-4h1c.55,0,1-.45,1-1Zm10,4c0-.55-.45-1-1-1h-6c-.55,0-1,.45-1,1s.45,1,1,1h6c.55,0,1-.45,1-1Zm0-4c0-.55-.45-1-1-1h-6c-.55,0-1,.45-1,1s.45,1,1,1h6c.55,0,1-.45,1-1Z"/></svg>

        );
    }

    if (name === "calendario") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
            <g id="_01_align_center" data-name="01 align center"><path d="M21,2H18V0H16V2H8V0H6V2H3A3,3,0,0,0,0,5V24H24V5A3,3,0,0,0,21,2ZM2,5A1,1,0,0,1,3,4H21a1,1,0,0,1,1,1V8H2ZM2,22V10H22V22Z"/><rect x="15" y="13" width="2" height="2"/><rect x="11" y="13" width="2" height="2"/><rect x="7" y="13" width="2" height="2"/><rect x="15" y="17" width="2" height="2"/><rect x="11" y="17" width="2" height="2"/><rect x="7" y="17" width="2" height="2"/></g>
            </svg>

        );
    }

    if (name === "dni") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
          <path d="m19 4h-4v-1a3 3 0 0 0 -6 0v1h-4a5.006 5.006 0 0 0 -5 5v10a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5v-10a5.006 5.006 0 0 0 -5-5zm-8-1a1 1 0 0 1 2 0v2a1 1 0 0 1 -2 0zm11 16a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3-3v-10a3 3 0 0 1 3-3h4.184a2.982 2.982 0 0 0 5.632 0h4.184a3 3 0 0 1 3 3zm-12-9h-5a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-8a1 1 0 0 0 -1-1zm-1 8h-3v-6h3zm11-3a1 1 0 0 1 -1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1zm0-4a1 1 0 0 1 -1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1zm-2 8a1 1 0 0 1 -1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1z"/></svg>

        );
    }

    if (name === "cargo") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
        <path d="m14,23c0,.552-.448,1-1,1H1c-.552,0-1-.448-1-1,0-3.866,3.134-7,7-7s7,3.134,7,7ZM7,6c-2.209,0-4,1.791-4,4s1.791,4,4,4,4-1.791,4-4-1.791-4-4-4Zm17-1v8c0,2.761-2.239,5-5,5h-4.526c-.945-1.406-2.275-2.533-3.839-3.227,1.437-1.096,2.365-2.826,2.365-4.773,0-3.314-2.686-6-6-6-1.084,0-2.102.288-2.979.791.112-2.658,2.294-4.791,4.979-4.791h10c2.761,0,5,2.239,5,5Zm-4,10c0-.553-.448-1-1-1h-3.5c-.552,0-1,.447-1,1s.448,1,1,1h3.5c.552,0,1-.447,1-1Z"/></svg>

        );
    }

    if (name === "certificados") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
         <path d="M8.094,1.329a1.5,1.5,0,0,0-2.684,0L.16,11.829A1.5,1.5,0,0,0,1.5,14h0a1.5,1.5,0,0,0,1.342-.829L3.429,12h6.646l.585,1.171A1.5,1.5,0,0,0,12,14h0a1.5,1.5,0,0,0,1.342-2.171ZM4.929,9,6.752,5.354,8.575,9Z"/><path d="M13,23.5a1.5,1.5,0,0,1-1.061-.439l-5-5a1.5,1.5,0,0,1,2.122-2.122L13,19.879l8.439-8.44a1.5,1.5,0,0,1,2.122,2.122l-9.5,9.5A1.5,1.5,0,0,1,13,23.5Z"/></svg>

        );
    }

    if (name === "campana") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
      <path d="M21,19h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3Zm-4.57-3.82c1.73-1.28,3.97-1.5,5.89-.69l-1.39-7.2c-.34-1.91-2-3.3-3.94-3.3h-.17c.11-.31,.18-.65,.18-1,0-1.65-1.35-3-3-3h-4c-1.65,0-3,1.35-3,3,0,.35,.07,.69,.18,1h-.17c-1.94,0-3.6,1.39-3.94,3.3L.81,19H14.1c.25-1.47,1.04-2.86,2.33-3.82ZM9,3c0-.55,.45-1,1-1h4c.55,0,1,.45,1,1s-.45,1-1,1h-4c-.55,0-1-.45-1-1Zm3,21c1.08,0,2.04-.44,2.75-1.13-.33-.59-.54-1.23-.65-1.87h-5.96c.45,1.72,2,3,3.86,3Z"/></svg>

        );
    }

    if (name === "descarga") {
        return (
            <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
            >
  <g id="_01_align_center" data-name="01 align center"><path d="M12.032,19a2.991,2.991,0,0,0,2.122-.878L18.073,14.2,16.659,12.79l-3.633,3.634L13,0,11,0l.026,16.408-3.62-3.62L5.992,14.2l3.919,3.919A2.992,2.992,0,0,0,12.032,19Z"/><path d="M22,16v5a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V16H0v5a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V16Z"/></g></svg>

        );
    }

    return null;
};
