"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ResultPage() {
  const router = useRouter();
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);

  const variations = [
    { id: "bold", name: "Bold", url: "https://picsum.photos/seed/bold/600/600" },
    { id: "minimalis", name: "Minimalis", url: "https://picsum.photos/seed/minimalis/600/600" },
    { id: "ramai", name: "Ramai", url: "https://picsum.photos/seed/ramai/600/600" },
  ];

  const handleDownload = (url: string, name: string) => {
    // Dalam aplikasi nyata, kita akan melakukan fetch blob dan trigger download.
    // Untuk prototipe, kita buka tab baru untuk mensimulasikan download.
    window.open(url, "_blank");
  };

  const handleDownloadAll = () => {
    variations.forEach(v => handleDownload(v.url, v.name));
  };

  const toggleAspect = (aspect: string) => {
    setSelectedAspects(prev => 
      prev.includes(aspect) ? prev.filter(a => a !== aspect) : [...prev, aspect]
    );
  };

  const handleLanjutEdit = () => {
    // Navigasi ke confirmation page (Edit State)
    // Di aplikasi nyata, kita mungkin akan menyimpan feedback ini ke global store
    router.push("/confirmation");
  };

  return (
    <div className="container max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Hasil Desain</h1>
          <p className="text-muted-foreground mt-1">Pilih desain yang paling sesuai dengan kebutuhan Anda.</p>
        </div>
        <Button variant="outline" onClick={handleDownloadAll}>
          Download Semua
        </Button>
      </div>

      {/* 3 Variasi Desain */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {variations.map((v) => (
          <div key={v.id} className="border rounded-lg overflow-hidden flex flex-col bg-card shadow-sm">
            <div className="aspect-square bg-muted relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={v.url} 
                alt={`Variasi ${v.name}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="font-semibold">{v.name}</span>
              <Button size="sm" onClick={() => handleDownload(v.url, v.name)}>
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Aksi Bawah */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t">
        <Button variant="outline" size="lg" onClick={() => router.push("/form")}>
          Buat Desain Baru
        </Button>
        <Button size="lg" onClick={() => setShowFeedback(true)}>
          Ulang (Iterasi)
        </Button>
      </div>

      {/* Pop-up Feedback Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full space-y-6 shadow-lg">
            <div>
              <h2 className="text-lg font-bold">Apa yang kurang pas?</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Pilih aspek yang ingin Anda ubah sebelum melakukan iterasi ulang.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Warna", "Teks", "Layout", "Lainnya"].map(aspect => (
                <Button
                  key={aspect}
                  variant={selectedAspects.includes(aspect) ? "default" : "outline"}
                  onClick={() => toggleAspect(aspect)}
                  className="rounded-full"
                >
                  {aspect}
                </Button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setShowFeedback(false)}>
                Batal
              </Button>
              <Button onClick={handleLanjutEdit} disabled={selectedAspects.length === 0}>
                Lanjut Edit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
