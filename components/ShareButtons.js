'use client'

import {
  FacebookShareButton,
  XShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  XIcon
} from 'react-share';

const ShareButtons = ({activityId, title}) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/activities/${activityId}`

    return (
        <div>
            <h3>Share Activity</h3>
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <XShareButton 
                url={shareUrl} 
                title={title}
            >
                <XIcon size={32} round />
            </XShareButton>

            <WhatsappShareButton 
                url={shareUrl} 
                title={title}
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <EmailShareButton 
                url={shareUrl} 
                subject={title}
            >
                <EmailIcon size={32} round />
            </EmailShareButton>
        </div>
    )
}

export default ShareButtons;
