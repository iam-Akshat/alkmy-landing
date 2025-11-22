import { ReactNode } from 'react';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode | JSX.Element;
  displayOverlayContent?: boolean;
}

export default function TiltedCard(props: TiltedCardProps): JSX.Element;
