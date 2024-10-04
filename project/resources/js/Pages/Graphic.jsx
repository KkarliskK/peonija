import { Link, Head } from '@inertiajs/react';

export default function Graphic({ auth }) {
    return (
        <>
            <main id='about' className='relative h-[50dvh] overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-full z-0'>
                    <div className='absolute top-0 right-0 w-full h-1/5 -z-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#fc61b6" fill-opacity="1" d="M0,0L120,26.7C240,53,480,107,720,117.3C960,128,1200,96,1320,80L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
                        </svg>
                    </div>
                    <div className='w-28 absolute top-10 left-5 hidden md:block'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transform rotate-12"
                            style={{ width: '100px', height: '100px' }}
                        >
                            <path
                                d="M9.5 21.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5V21.5"
                                stroke="#1C274C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path d="M21 22H9M3 22H5.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M19 22V15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M5 22V15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                            <path
                                d="M11.9999 2H7.47214C6.26932 2 5.66791 2 5.18461 2.2987C4.7013 2.5974 4.43234 3.13531 3.89443 4.21114L2.49081 7.75929C2.16652 8.57905 1.88279 9.54525 2.42867 10.2375C2.79489 10.7019 3.36257 11 3.99991 11C5.10448 11 5.99991 10.1046 5.99991 9C5.99991 10.1046 6.89534 11 7.99991 11C9.10448 11 9.99991 10.1046 9.99991 9C9.99991 10.1046 10.8953 11 11.9999 11C13.1045 11 13.9999 10.1046 13.9999 9C13.9999 10.1046 14.8953 11 15.9999 11C17.1045 11 17.9999 10.1046 17.9999 9C17.9999 10.1046 18.8953 11 19.9999 11C20.6373 11 21.205 10.7019 21.5712 10.2375C22.1171 9.54525 21.8334 8.57905 21.5091 7.75929L20.1055 4.21114C19.5676 3.13531 19.2986 2.5974 18.8153 2.2987C18.332 2 17.7306 2 16.5278 2H16"
                                stroke="#1C274C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className='absolute bottom-10 right-10 hidden md:block'>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transform rotate-45"
                            style={{ width: '150px', height: '150px' }}
                        >
                            <path
                                d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className='absolute hidden md:block' style={{ bottom: '20%', left: '30%', transform: 'rotate(120deg)' }}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: '100px', height: '100px' }}
                        >
                            <path
                                d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className='absolute hidden md:block' style={{ bottom: '5%', left: '15%', transform: 'rotate(200deg)' }}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: '100px', height: '100px' }}
                        >
                            <path
                                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className='absolute hidden md:block' style={{ top: '50%', right: '20%', transform: 'rotate(140deg)' }}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: '100px', height: '100px' }}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM9.375 10.5C9.99632 10.5 10.5 9.99632 10.5 9.375C10.5 8.75368 9.99632 8.25 9.375 8.25C8.75368 8.25 8.25 8.75368 8.25 9.375C8.25 9.99632 8.75368 10.5 9.375 10.5ZM15.75 9.375C15.75 9.99632 15.2463 10.5 14.625 10.5C14.0037 10.5 13.5 9.99632 13.5 9.375C13.5 8.75368 14.0037 8.25 14.625 8.25C15.2463 8.25 15.75 8.75368 15.75 9.375ZM12 15C10.1783 15 9 13.8451 9 12.75H7.5C7.5 14.9686 9.67954 16.5 12 16.5C14.3205 16.5 16.5 14.9686 16.5 12.75H15C15 13.8451 13.8217 15 12 15Z"
                                fill="#080341"
                            />
                        </svg>
                    </div>
                </div>

                <div className='relative z-10 flex w-full justify-center items-center'>
                    <h1 className='font-semibold text-6xl uppercase text-center'>Mēs esam atvērti!</h1>
                </div>
                <div className='relative z-10 flex w-full justify-center items-center h-3/5'>
                    <div className='flex w-full flex-col justify-center items-center'>
                        <p className='text-5xl font-semibold m-1 text-center mt-24'>Pirmdiena - Sestdiena</p>
                        <p className='text-4xl font-semibold mb-12'>08:00 - 18:00</p>
                        <p className='text-5xl font-semibold m-1'>Svētdiena</p>
                        <p className='text-4xl font-semibold'>08:00 - 16:00</p>
                    </div>
                </div>
            </main>
        </>
    );
}
