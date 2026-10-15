import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, Smartphone, X } from "lucide-react";
import { Button } from "@/shared/ui";

type CameraCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
  onFallbackNativeCamera: () => void;
};

export default function CameraCaptureModal({
  isOpen,
  onClose,
  onCapture,
  onFallbackNativeCamera,
}: CameraCaptureModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [flash, setFlash] = useState(false);

  // Stop camera tracks cleanly
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopStream();
      return;
    }

    let active = true;
    setLoading(true);
    setCameraError(null);

    async function startCamera() {
      stopStream();

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("La caméra en direct n'est pas supportée sur ce navigateur.");
        setLoading(false);
        return;
      }

      try {
        // Check available video devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        if (active) {
          setHasMultipleCameras(videoDevices.length > 1);
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (active) setLoading(false);
          };
        }
      } catch (err: unknown) {
        console.warn("Camera access failed:", err);
        if (active) {
          setCameraError(
            "Impossible d'accéder à la caméra en direct. Vous pouvez utiliser l'appareil photo de votre téléphone ou importer un fichier.",
          );
          setLoading(false);
        }
      }
    }

    startCamera();

    return () => {
      active = false;
      stopStream();
    };
  }, [isOpen, facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Flash visual feedback
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: "image/jpeg" });
        stopStream();
        onCapture(file);
      },
      "image/jpeg",
      0.9,
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="relative flex h-[85vh] max-h-[680px] w-full max-w-[520px] flex-col overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-2xl">
        {/* Header */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide">
            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
            DIRECT CAMÉRA
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
            aria-label="Fermer la caméra"
          >
            <X size={18} />
          </button>
        </div>

        {/* Camera viewport */}
        <div className="relative flex-1 overflow-hidden bg-black grid place-items-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`size-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Flash animation */}
          {flash && <div className="absolute inset-0 z-30 bg-white opacity-80 animate-[fadeOut_0.2s_ease-out]" />}

          {/* Viewfinder crosshairs */}
          {!cameraError && !loading && (
            <div className="pointer-events-none absolute inset-8 border border-white/20 rounded-2xl">
              <div className="absolute top-2 left-2 size-4 border-t-2 border-l-2 border-white/60" />
              <div className="absolute top-2 right-2 size-4 border-t-2 border-r-2 border-white/60" />
              <div className="absolute bottom-2 left-2 size-4 border-b-2 border-l-2 border-white/60" />
              <div className="absolute bottom-2 right-2 size-4 border-b-2 border-r-2 border-white/60" />
            </div>
          )}

          {/* Loading state */}
          {loading && !cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
              <span className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-primary" />
              <p className="text-xs font-medium">Activation de la caméra…</p>
            </div>
          )}

          {/* Error fallback state */}
          {cameraError && (
            <div className="p-6 text-center max-w-sm flex flex-col items-center gap-3">
              <Camera size={36} className="text-white/40 mb-1" />
              <p className="text-xs text-white/80 leading-relaxed">{cameraError}</p>
              <Button
                variant="secondary"
                className="mt-2 min-h-10 text-xs bg-white text-ink hover:bg-white/90"
                onClick={() => {
                  stopStream();
                  onClose();
                  onFallbackNativeCamera();
                }}
              >
                <Smartphone size={16} /> Ouvrir l'appareil photo du système
              </Button>

            </div>
          )}
        </div>

        {/* Footer with Controls */}
        <div className="relative z-20 flex items-center justify-around bg-gradient-to-t from-black via-black/90 to-transparent p-6">
          {/* Flip camera */}
          <button
            type="button"
            disabled={!hasMultipleCameras || loading || Boolean(cameraError)}
            onClick={toggleCamera}
            className="grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Changer de caméra"
            aria-label="Changer de caméra"
          >
            <RefreshCw size={20} />
          </button>

          {/* Big Shutter button */}
          <button
            type="button"
            disabled={loading || Boolean(cameraError)}
            onClick={takeSnapshot}
            className="group relative grid size-18 place-items-center rounded-full border-4 border-white p-1 transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Prendre la photo"
          >
            <span className="size-full rounded-full bg-white transition-transform group-hover:scale-95 group-active:scale-90" />
          </button>

          {/* Alternative native camera */}
          <button
            type="button"
            onClick={() => {
              stopStream();
              onClose();
              onFallbackNativeCamera();
            }}
            className="grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
            title="Utiliser l'application Caméra"
            aria-label="Appareil photo système"
          >
            <Smartphone size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
