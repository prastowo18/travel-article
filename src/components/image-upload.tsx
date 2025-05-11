import { CloudUpload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';

import { Button } from './ui/button';

interface Props {
  onUpload: (file: File) => void;
}

export const ImageUploader = ({ onUpload }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  const handleUpload = () => {
    if (!image) return;

    onUpload(image);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center p-5 border rounded-lg"
      >
        <input {...getInputProps()} />
        <CloudUpload className="size-10" />
        <div className="mt-5">
          {isDragActive ? (
            <p className="text-sm font-medium">Drop the image here...</p>
          ) : (
            <p className="text-sm font-medium">
              Choose a file <span className="font-light">or drag it here</span>
            </p>
          )}
        </div>
      </div>

      {preview && (
        <div className="p-2 mt-5 border rounded-md w-36">
          <img src={preview} alt="Preview" />
        </div>
      )}

      {image && (
        <Button
          size="sm"
          variant="outline"
          type="button"
          className="w-full mt-5"
          onClick={handleUpload}
        >
          Upload Image
        </Button>
      )}
    </div>
  );
};
