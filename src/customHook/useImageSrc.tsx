import { useState, useEffect } from 'react';

const useImageSrc = (uploadFileRef) => {
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const getImageSrc = () => {
            const file = uploadFileRef.current?.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            }
        };

        if (uploadFileRef.current) {
            uploadFileRef.current.addEventListener('change', getImageSrc); // Listen for file changes
        }

        return () => {
            if (uploadFileRef.current) {
                uploadFileRef.current.removeEventListener('change', getImageSrc);
            }
        };
    }, [uploadFileRef]);

    return imagePreview;
};

export default useImageSrc;
