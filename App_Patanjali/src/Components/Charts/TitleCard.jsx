import React from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';

const TitleCard = ({
    backgroundColor = '#ffffff',
    name = 'Chart Title',
    nameSize = 16,
    nameColor = '#333333',
    showBorder = false,
    borderSize = 1,
    borderColor = '#cccccc',
    showAnimation = false,
    titlePosition = 'center',
    nameBold = false,
    nameItalic = false,
    titleOrientation = 'horizontal',
}) => {
    const { isDarkMode } = useTheme();

    // Styles dynamically created from props
    const containerStyle = {
        backgroundColor: isDarkMode ? '#000000' : backgroundColor,
        border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
        display: 'flex',
        justifyContent: titlePosition,
        alignItems: 'center',
        padding: '8px',
        animation: showAnimation ? 'fadeIn 0.5s ease-in-out' : 'none',
        height: '100%',
        width: '100%',
    };

    const textStyle = {
        fontSize: `${nameSize}px`,
        color: isDarkMode ? '#ffffff' : nameColor,
        fontWeight: nameBold ? 'bold' : 'normal',
        fontStyle: nameItalic ? 'italic' : 'normal',
        transform: titleOrientation === 'verticalLeft' ? 'rotate(-90deg)' : titleOrientation === 'verticalRight' ? 'rotate(90deg)' : 'none',
        whiteSpace: 'nowrap',
        textAlign: titlePosition,
    };

    return (
        <div style={containerStyle}>
            <div style={textStyle}>{name}</div>
        </div>
    );
};

export default TitleCard;
