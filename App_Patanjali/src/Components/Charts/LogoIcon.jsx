import React from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import Image from 'next/image';

const LogoIcon = ({
    backgroundColor = '#ffffff',
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',
    imageUrl = '',
    imageAlt = 'Logo',
    localImage = null,
}) => {
    const { isDarkMode } = useTheme();

    const imageSrc = localImage || imageUrl;

    console.log('image', imageSrc);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: isDarkMode ? '#000000' : backgroundColor,
                border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            {imageSrc && (
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    layout="fill"
                />
            )}
        </div>
    );
};

export default LogoIcon;