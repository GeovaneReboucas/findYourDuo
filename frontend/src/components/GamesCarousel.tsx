import { GamerBanner } from './GameBanner';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

type Game = {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    };
}

interface GamesCarouselProps {
    games: Game[];
}

export function GamesCarousel({ games }: GamesCarouselProps) {
    return (
        <>
            {/* <div className='grid grid-cols-6 gap-6 mt-14'>
                {games.map(game => (
                    <GamerBanner
                        key={game.id}
                        bannerUrl={game.bannerUrl}
                        title={game.title}
                        adsCount={game._count.ads}
                    />
                ))}
            </div> */}
            <Swiper
                modules={[Navigation, EffectFade, Scrollbar]}
                navigation
                effect='cards'
                speed={800}
                loop
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    350: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    465: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    780: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
                className='mt-14 w-full h-full'
            >
                {games.map(game => (
                    <SwiperSlide className='relative rounded-lg overflow-hidden h-full'>
                        <GamerBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads}
                        />
                    </SwiperSlide>
                ))}
                ...
            </Swiper>
        </>
    )
}