import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Camera, ImagePlus, Plus, Trash2, Upload, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { ReportPhoto } from "../types";
import CameraCaptureModal from "./CameraCaptureModal";

const MAX_PHOTOS = 3;

type PhotoFieldProps = {
  photos: ReportPhoto[];
  onChange: (photos: ReportPhoto[]) => void;
};

export default function PhotoField({ photos, onChange }: PhotoFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<ReportPhoto | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const remainingSlots = MAX_PHOTOS - photos.length;

  const handleFiles = (fileList: FileList | File[]) => {
    setPhotoError(null);
    const files = Array.from(fileList).filter((file) => file.type.startsWith("image/"));

    if (files.length === 0) {
      setPhotoError("Veuillez sélectionner un fichier image valide (JPG, PNG, WEBP).");
      return;
    }

    if (photos.length >= MAX_PHOTOS) {
      setPhotoError(`Limite maximale de ${MAX_PHOTOS} photos atteinte.`);
      return;
    }

    const filesToProcess = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      setPhotoError(`Maximum ${MAX_PHOTOS} photos autorisées : les ${remainingSlots} première(s) ont été ajoutées.`);
    }

    const newPhotos: ReportPhoto[] = filesToProcess.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      file,
      timestamp: Date.now(),
    }));

    onChange([...photos, ...newPhotos]);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFiles(event.target.files);
    }
    // Reset input so re-selecting the same file triggers change
    event.target.value = "";
  };

  const handleRemovePhoto = (id: string) => {
    const photoToRemove = photos.find((p) => p.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.url);
    }
    onChange(photos.filter((p) => p.id !== id));
    setPhotoError(null);
  };

  const handleCameraCapture = (file: File) => {
    setIsCameraModalOpen(false);
    handleFiles([file]);
  };

  const openNativeCamera = () => {
    nativeCameraInputRef.current?.click();
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="my-5">
      {/* Hidden inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Header with counter */}
      <div className="mb-2.5 flex items-center justify-between">
        <label className="text-[12px] font-bold text-ink">
          Photos sur le terrain <span className="font-normal text-muted">(facultatif)</span>
        </label>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors",
            photos.length === MAX_PHOTOS
              ? "bg-accent/20 text-[#855700]"
              : photos.length > 0
                ? "bg-primary-soft text-primary"
                : "bg-muted/15 text-muted",
          )}
        >
          {photos.length} / {MAX_PHOTOS} max
        </span>
      </div>

      {/* Empty State: 2 prominent action buttons */}
      {photos.length === 0 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col gap-3 rounded-2xl border-2 border-dashed p-4 transition-all duration-200",
            isDragging
              ? "border-primary bg-primary-soft/40 scale-[1.01]"
              : "border-border-strong bg-canvas/60 hover:border-primary/40",
          )}
        >
          <div className="grid grid-cols-2 gap-2.5 max-md:grid-cols-1">
            {/* Camera action */}
            <button
              type="button"
              className={cn(
                "group flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 text-left transition-all",
                "hover:border-primary hover:shadow-sm active:scale-[0.98]",
              )}
              onClick={() => setIsCameraModalOpen(true)}
            >
              <span className="grid size-11 flex-none place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Camera size={20} />
              </span>
              <div className="flex flex-col">
                <b className="text-[12px] text-ink group-hover:text-primary">Prendre une photo</b>
                <small className="mt-0.5 text-[10.5px] text-muted">Caméra de l'appareil</small>
              </div>
            </button>

            {/* Upload action */}
            <button
              type="button"
              className={cn(
                "group flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 text-left transition-all",
                "hover:border-primary hover:shadow-sm active:scale-[0.98]",
              )}
              onClick={openFilePicker}
            >
              <span className="grid size-11 flex-none place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <ImagePlus size={20} />
              </span>
              <div className="flex flex-col">
                <b className="text-[12px] text-ink group-hover:text-primary">Importer des fichiers</b>
                <small className="mt-0.5 text-[10.5px] text-muted">Galerie ou dossier (max 3)</small>
              </div>
            </button>
          </div>

          <p className="text-center text-[10.5px] text-muted">
            Glissez-déposez vos photos ici ou sélectionnez une option. Les visages et plaques seront floutés.
          </p>
        </div>
      )}

      {/* Grid of added photos */}
      {photos.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2.5">
            {photos.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-black/5 shadow-xs transition-all hover:shadow-md"
              >
                <img
                  src={item.url}
                  alt={`Photo ${index + 1}`}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => setActivePreview(item)}
                />

                {/* Index badge */}
                <span className="absolute top-1.5 left-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-xs">
                  #{index + 1}
                </span>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(item.id)}
                  className={cn(
                    "absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-lg bg-black/60 text-white backdrop-blur-xs",
                    "transition-all hover:bg-danger hover:scale-110",
                  )}
                  title="Supprimer la photo"
                  aria-label="Supprimer la photo"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}

            {/* Quick-add slot if remaining < 3 */}
            {photos.length < MAX_PHOTOS && (
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsCameraModalOpen(true)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-dashed border-border-strong bg-canvas/60 text-muted transition-all",
                    "hover:border-primary hover:bg-primary-soft/30 hover:text-primary",
                  )}
                  title="Prendre une photo"
                >
                  <Camera size={15} />
                  <span className="text-[10px] font-semibold">Caméra</span>
                </button>
                <button
                  type="button"
                  onClick={openFilePicker}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-dashed border-border-strong bg-canvas/60 text-muted transition-all",
                    "hover:border-primary hover:bg-primary-soft/30 hover:text-primary",
                  )}
                  title="Ajouter un fichier"
                >
                  <Plus size={15} />
                  <span className="text-[10px] font-semibold">Fichier</span>
                </button>
              </div>
            )}
          </div>

          {photos.length === MAX_PHOTOS && (
            <p className="text-[10.5px] text-muted italic">
              Limite de 3 photos atteinte. Supprimez-en une avec la corbeille pour en reprendre une autre.
            </p>
          )}
        </div>
      )}

      {/* Error message */}
      {photoError && (
        <p className="mt-2 text-[11px] font-semibold text-danger animate-[fadeIn_0.2s_ease-out]">
          {photoError}
        </p>
      )}

      {/* Live Camera Modal */}
      <CameraCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
        onFallbackNativeCamera={openNativeCamera}
      />

      {/* Lightbox Modal for zooming photo */}
      {activePreview && (
        <div
          className="fixed inset-0 z-500 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setActivePreview(null)}
        >
          <div className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl bg-black">
            <button
              type="button"
              className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/90"
              onClick={() => setActivePreview(null)}
              aria-label="Fermer l'aperçu"
            >
              <X size={18} />
            </button>
            <img
              src={activePreview.url}
              alt="Aperçu agrandi"
              className="max-h-[80vh] w-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
