import { AppProps } from 'next/app';
import { Providers } from '@/app/Provider';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
}

export default MyApp;
