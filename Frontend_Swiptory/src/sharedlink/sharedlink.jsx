import React, { useState, useEffect } from 'react';
import styles from './YourStyles.module.css'; // Import your CSS styles

function YourComponent(props) {
    const [content, setContent] = useState('');

    useEffect(() => {
        function handlePaste(event) {
            const pastedText = (event.clipboardData || window.clipboardData).getData('text');
            const urlRegex = /(https?:\/\/[^\s]+)/g; // Regular expression to match URLs
            const match = pastedText.match(urlRegex);
            
            if (match && match.length > 0) {
                const url = match[0];
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        // Display the content of the pasted URL
                        setContent(html);
                    })
                    .catch(error => {
                        console.error('Error fetching URL content:', error);
                        setContent('Error fetching URL content.');
                    });
            }
        }

        document.addEventListener('paste', handlePaste);

        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, []); // Run only once on component mount

    return (
        <div className={styles.sharebtn}>
            {/* Display the fetched content */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            {/* Optionally, display an image or other content */}
        </div>
    );
}

export default YourComponent;