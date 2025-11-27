export interface GalleryProps {
  images: string[];
  onComplete: () => void;
}

export interface LockScreenProps {
  onUnlock: () => void;
}

export interface VideoRevealProps {
  videoUrl: string;
}
