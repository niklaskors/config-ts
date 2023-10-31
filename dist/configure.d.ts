export declare function configure<T extends {
    [key: string]: {
        default?: any;
        env: (e: {
            [key: string]: string;
        }) => Y;
    } | {
        default: string;
        env?: (e: {
            [key: string]: string;
        }) => Y;
    };
}, Y>(configuration: T, options?: {
    envFilePath: string;
}): {
    [K in keyof T]: T[K]['env'] extends (e: {
        [key: string]: string;
    }) => infer Y ? Y : T[K]['default'];
};
