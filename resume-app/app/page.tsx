import UploadForm from "./components/UploadForm";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Resume Metadata Extractor</h1>
      <UploadForm />
    </div>
  );
}
