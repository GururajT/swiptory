import React from 'react';
import share from '../images/share.png'
class ClipboardCopyImage extends React.Component {
  copyToClipboard = () => {
    const imageUrl = this.props.imageUrl;
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl)
        .then(() => {
          console.log('Image URL copied to clipboard!');
          // You can add additional UI feedback here if needed
        })
        .catch(err => {
          console.error('Failed to copy image URL: ', err);
        });
    }
  }

  render() {
    return (
      <div>
        {/* Replace 'Your Image' with your actual image */}
        <img src={share} alt="Your Image" onClick={this.copyToClipboard} style={{cursor: 'pointer'}} />
      </div>
    );
  }
}

export default ClipboardCopyImage;
