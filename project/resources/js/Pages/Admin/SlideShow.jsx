import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { namedays, extNamedays } from 'vardadienas'; 


export default function Slideshow({ auth, categories }) {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSlideshowActive, setIsSlideshowActive] = useState(false);
    const [categoryPreviews, setCategoryPreviews] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [todayNamedays, setTodayNamedays] = useState('');
    const [extendedNamedays, setExtendedNamedays] = useState('');
    const imageContainerRef = useRef(null);


    useEffect(() => {
        const fetchCategoryPreviews = async () => {
            try {
                const previews = await Promise.all(
                    categories.map(async (category) => {
                        const response = await axios.get(`/categories/${category}/images`);
                        const firstImage = response.data[0]; 
                        return { category, previewImage: firstImage };
                    })
                );
                setCategoryPreviews(previews);
            } catch (error) {
                console.error('Error fetching category previews:', error);
            }
        };

        fetchCategoryPreviews();
    }, [categories]);

    const fetchCategoryImages = async (category) => {
        try {
            const response = await axios.get(`/categories/${category}/images`);
            setImages(response.data);
            setCurrentIndex(0);
            setIsSlideshowActive(true);
            setIsFullscreen(false); 
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };

    useEffect(() => {
        let timer;
        if (isSlideshowActive && images.length > 0) {
            timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000); 
        }
        return () => clearInterval(timer);
    }, [isSlideshowActive, images]);

    const enterFullscreen = () => {
        if (imageContainerRef.current) {
            if (imageContainerRef.current.requestFullscreen) {
                imageContainerRef.current.requestFullscreen();
            } else if (imageContainerRef.current.webkitRequestFullscreen) { 
                imageContainerRef.current.webkitRequestFullscreen();
            } else if (imageContainerRef.current.msRequestFullscreen) { 
                imageContainerRef.current.msRequestFullscreen();
            }
            setIsFullscreen(true);
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setIsFullscreen(false);
    };

    const goBackToCategories = (e) => {
        e.stopPropagation(); 
        setIsSlideshowActive(false); 
        setIsFullscreen(false); 
    };

    useEffect(() => {
        const onFullscreenChange = () => {
            if (!document.fullscreenElement && 
                !document.webkitFullscreenElement && 
                !document.msFullscreenElement) {
                setIsFullscreen(false); 
            }
        };

        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);
        document.addEventListener('msfullscreenchange', onFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
            document.removeEventListener('msfullscreenchange', onFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
        
            const day = now.toLocaleDateString('lv-LV', {
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric'
            });
        
            const formattedDate = day.replace(
                /\b\w/g, 
                (char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase()
            );
        
            setCurrentTime(`${hours}:${minutes}`);
            setCurrentDate(formattedDate);
        };
    
        updateTime();
        const timerId = setInterval(updateTime, 1000);
    
        return () => clearInterval(timerId); 
    }, []);
    

    useEffect(() => {
        const today = new Date();
        const formattedDate = String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

        const todayNamedays = namedays[formattedDate];
        const extendedNamedays = extNamedays[formattedDate];

        if (todayNamedays) {
            setTodayNamedays(todayNamedays.join(', '));
        } else {
            setTodayNamedays('Nav vārda dienu');
        }

        if (extendedNamedays) {
            setExtendedNamedays(extendedNamedays.join(', '));
        } else {
            setExtendedNamedays('Nav papildu vārda dienu');
        }
    }, []);

    

        return (
            <AdminLayout
                auth={auth}
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Slaidrāde</h2>}
        >
            <Head title="Slaidrāde" />

            {/* Cards  */}
            <div className="grid grid-cols-2 gap-4 px-4 my-4 md:grid-cols-3 lg:grid-cols-4">
                {categoryPreviews.map(({ category, previewImage }) => (
                    <div 
                        key={category}
                        onClick={() => fetchCategoryImages(category)}
                        className="overflow-hidden transition-all ease-in-out border rounded-lg shadow-md cursor-pointer group hover:shadow-lg"
                    >
                        <img 
                            src={previewImage} 
                            alt={`${category} priekšskats`} 
                            className="object-cover w-full h-32 sm:h-48 md:h-64"
                        />
                        <div className="p-2 text-center text-black bg-gradient-to-br from-violet-200 to-pink-100 dark:from-violet-700 dark:to-pink-900 dark:text-white">
                            <p className="font-bold">{category}</p>
                            <p className="text-sm italic">Noklikšķini šeit, lai skatītu slaidrādi.</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slideshow */}
            {isSlideshowActive && images.length > 0 && (
                <div 
                    ref={imageContainerRef} 
                    className="fixed inset-0 flex items-center justify-center bg-black cursor-pointer"
                    onClick={enterFullscreen}
                >
                    <img 
                        src={images[currentIndex]} 
                        alt="Slideshow" 
                        className="object-contain max-w-full max-h-full rounded"
                    />
                    <p className="absolute text-center text-white bottom-8">
                        Bilde {currentIndex + 1} no {images.length}
                    </p>

                    {/* Back to categories button */}
                    {!isFullscreen && (
                        <button 
                            className="absolute px-4 py-2 text-white bg-blue-500 rounded-md top-4 left-4"
                            onClick={goBackToCategories}
                        >
                            Atpakaļ uz kategorijām
                        </button>
                    )}

                    {/* Small popup with date and clock */}
                    {isFullscreen && (
                        <div className="absolute top-0 right-0 flex justify-around w-2/6 h-24 p-2 text-black rounded-md shadow-lg bg-gradient-to-br from-violet-200 to-pink-100">
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-2xl'>{currentDate}</p>
                                <p className='text-xl'><strong>Šodien vārda dienu svin:</strong> {todayNamedays}</p>
                            </div>
                            <div className='flex items-center justify-center h-full'>
                                <p className='text-4xl'>{currentTime}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
