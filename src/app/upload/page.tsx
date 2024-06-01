'use client';
import UploadForm from '@/app/(form)/form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-3">
      <div className="flex flex-col gap-3">
        <h3 className="text-3xl">Upload Files</h3>
        <UploadForm />
      </div>
    </main>
  )
}