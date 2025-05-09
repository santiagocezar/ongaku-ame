/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

import 'react';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}


import { DurationFormat as _DurationFormat  } from '@formatjs/intl-durationformat';

declare global {
    namespace Intl {
        class DurationFormat extends _DurationFormat {}
    }
}