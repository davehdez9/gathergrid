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
} from 'react-share'

const ShareButtons = ({ activityId, title }) => {
    const shareUrl =
        `${process.env.NEXT_PUBLIC_DOMAIN}/activities/${activityId}`

    const buttonClass =
        "rounded-full transition duration-200 hover:-translate-y-0.5 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"

    return (
        <div className="flex flex-wrap items-center gap-3">
            <FacebookShareButton
                url={shareUrl}
                className={buttonClass}
                aria-label="Share on Facebook"
            >
                <FacebookIcon
                    size={38}
                    round
                />
            </FacebookShareButton>

            <XShareButton
                url={shareUrl}
                title={title}
                className={buttonClass}
                aria-label="Share on X"
            >
                <XIcon
                    size={38}
                    round
                />
            </XShareButton>

            <WhatsappShareButton
                url={shareUrl}
                title={title}
                className={buttonClass}
                aria-label="Share on WhatsApp"
            >
                <WhatsappIcon
                    size={38}
                    round
                />
            </WhatsappShareButton>

            <EmailShareButton
                url={shareUrl}
                subject={title}
                className={buttonClass}
                aria-label="Share by email"
            >
                <EmailIcon
                    size={38}
                    round
                />
            </EmailShareButton>
        </div>
    )
}

export default ShareButtons